<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import type { LearningClientState } from '../types.js';
import LearningGrading from './LearningGrading.vue';
import LearningWriteBox from './LearningWriteBox.vue';
import ReadingParagraph from './ReadingParagraph.vue';
import { useLearningUnitSession } from './learning-session.js';
import LearningCompanionControl from './LearningCompanionControl.vue';
import { useLearningTextSelection } from './reading-selection.js';
import type { LearningSelection } from '../../../domains/learning/notes.js';
import { LEARNING_FLOW_COPY as flow } from './learning-copy.js';

type Unit = NonNullable<LearningClientState['unit']>;
const props = defineProps<{ state: LearningClientState; unit: Unit; disabled: boolean; pending: boolean }>();
const emit = defineEmits<{ action: [name: string, input?: Record<string, unknown>]; confirm: [name: string, input: Record<string, unknown>, text: string]; ask: [exerciseId: string | undefined, selection: LearningSelection]; record: [id: string] }>();
const root = ref<HTMLElement | null>(null);
const session = useLearningUnitSession(() => props.unit.id);
useLearningTextSelection(root, () => props.unit.materials, value => { session.value.selection = value; });
const stage = computed(() => props.unit.stage.stage);
const currentView = computed(() => {
    if (stage.value === 'writing') { return 'reading'; }
    const selected = session.value.reading.view;
    if (selected === 'model' && !['reviewing', 'model', 'complete'].includes(stage.value)) { return 'feedback'; }
    return selected ?? (stage.value === 'complete' ? 'model' : stage.value === 'grading' ? 'reading' : 'feedback');
});
const views = ['reading', 'feedback', 'model'] as const;
async function show(value: typeof views[number]) {
    const scroller = root.value?.closest<HTMLElement>('.learning-scroll');
    if (scroller) { session.value.reading.scrolls[currentView.value] = scroller.scrollTop; }
    session.value.reading.view = value;
    await nextTick();
    if (scroller) { scroller.scrollTop = session.value.reading.scrolls[value] ?? 0; }
}
const steps = [['writing', '阅读与写作'], ['grading', '统一批改'], ['revising', '修改'], ['model', '范文'], ['complete', '完成']] as const;
const stepIndex = computed(() => ({ writing: 0, grading: 1, revising: 2, reviewing: 3, model: 3, complete: 4 } as Record<string, number>)[stage.value] ?? 0);
const essay = computed(() => props.unit.exercises.find(entry => !entry.paragraphId));
const missing = computed(() => props.unit.stage.exercises.filter(row => row.status === 'writing').map(row => row.exerciseId));
const copy = {
    goal: '本篇目标', progress: '学习进度', essay: '主题写作', essayLabel: '你的作文', essayPlaceholder: '写下你的看法和理由',
    authored: '语伴原创', adapted: '改写自', original: '原文', written: '已写', next: '继续写作',
};
const numbered = computed(() => { let number = 0; return props.unit.materials.map(material => ({ material, paragraphs: material.paragraphs.map(paragraph => ({ paragraph, number: ++number })) })); });

const action = (name: string, input?: Record<string, unknown>) => emit('action', name, input);
function locate(exerciseId: string) {
    const target = root.value?.querySelector<HTMLElement>(`[data-exercise-id="${CSS.escape(exerciseId)}"]`);
    target?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    target?.querySelector<HTMLElement>('textarea, button')?.focus({ preventScroll: true });
}

</script>

<template>
    <article ref="root" class="learning-reading">
        <nav v-if="stage !== 'writing'" class="learning-reading-nav" :aria-label="flow.navigation">
            <button
                v-for="value in views" :key="value" type="button" :aria-current="currentView === value ? 'page' : undefined"
                :disabled="value === 'model' && !['reviewing', 'model', 'complete'].includes(stage)" @click="show(value)"
            >
                {{ flow[value] }}
            </button>
        </nav>
        <template v-if="currentView === 'reading'">
            <header class="learning-reading-head">
                <details class="learning-reading-goal" :open="session.expanded.goal" @toggle="session.expanded.goal = ($event.target as HTMLDetailsElement).open">
                    <summary>{{ copy.goal }}</summary>
                    <strong>{{ unit.title }}</strong><p v-if="unit.goal">{{ unit.goal }}</p>
                </details>
                <LearningCompanionControl :name="state.teacher?.name" />
            </header>
            <section v-for="(entry, index) in numbered" :key="entry.material.id" class="learning-reading-material">
                <component :is="index === 0 ? 'h1' : 'h2'" tabindex="-1">{{ entry.material.title }}</component>
                <p class="learning-source">
                    <template v-if="entry.material.provenance.kind === 'authored'">{{ copy.authored }}</template>
                    <template v-else>{{ entry.material.provenance.kind === 'adapted' ? copy.adapted : copy.original }} <a :href="entry.material.provenance.url" target="_blank" rel="noopener noreferrer">{{ entry.material.provenance.title }}</a></template>
                </p>
                <ReadingParagraph
                    v-for="item in entry.paragraphs" :key="item.paragraph.id" :state="state" :unit="unit" :material-id="entry.material.id" :paragraph="item.paragraph" :number="item.number"
                    :disabled="disabled" @action="action" @ask="(id, selection) => emit('ask', id, selection)"
                />
            </section>
            <section v-if="essay" class="learning-essay">
                <h2>{{ copy.essay }}</h2>
                <p class="learning-essay-prompt">{{ essay.prompt }}</p>
                <LearningWriteBox :state="state" :unit="unit" :exercise="essay" :disabled="disabled" :label="copy.essayLabel" :placeholder="copy.essayPlaceholder" tone="essay" @action="action" />
            </section>
            <ol class="learning-steps" :aria-label="copy.progress">
                <li v-for="([id, label], index) in steps" :key="id" :class="{ 'is-done': index < stepIndex, 'is-current': index === stepIndex }" :aria-current="index === stepIndex ? 'step' : undefined">{{ label }}</li>
            </ol>
            <div v-if="stage === 'writing'" class="learning-stage-bar is-writing">
                <span>{{ copy.written }} {{ unit.stage.exercises.length - missing.length }} / {{ unit.stage.exercises.length }}</span>
                <button type="button" @click="locate(missing[0])">{{ copy.next }}</button>
            </div>
            <div v-else-if="stage === 'grading'" class="learning-stage-bar">
                <template v-if="state.pending?.purpose === 'grade'"><span class="learning-working-dot" aria-hidden="true" /><span>{{ flow.grading }}</span><button type="button" :disabled="pending" @click="emit('action', 'cancel')">{{ flow.stop }}</button></template>
                <template v-else><span>{{ flow.gradeReady }}</span><button type="button" class="learning-primary" :disabled="disabled" @click="emit('action', 'grade', { unitId: unit.id })">{{ flow.grade }}</button></template>
            </div>
            <button v-else type="button" class="learning-primary" @click="show('feedback')">{{ flow.feedback }}</button>
        </template>
        <LearningGrading v-else :view="currentView" :state="state" :unit="unit" :disabled="disabled" :pending="pending" @action="action" @confirm="(name, input, text) => emit('confirm', name, input, text)" @record="id => emit('record', id)" />
        <button v-if="currentView === 'feedback' && stage === 'complete'" type="button" class="learning-primary" @click="show('model')">{{ flow.viewModel }}</button>
    </article>
</template>
