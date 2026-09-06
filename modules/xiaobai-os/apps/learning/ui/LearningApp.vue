<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import LearningLesson from './LearningLesson.vue';
import LearningProfile from './LearningProfile.vue';
import LearningRecords from './LearningRecords.vue';
import LearningDesk from './LearningDesk.vue';
import LearningIcon from './LearningIcon.vue';
import { useLearningState } from './use-learning-state.js';
import './learning.css';

const props = defineProps<XiaobaiOsAppProps>();
const { state, pending, writable, localMessage, request } = useLearningState(props);
type Page = 'desk' | 'lesson' | 'records' | 'harvest' | 'settings' | 'profile';
const page = ref<Page>(state.value.profile && state.value.teacher ? 'desk' : 'profile');
const scroller = ref<HTMLElement | null>(null);
const scrolls: Partial<Record<Page, number>> = {};
const confirm = ref<{ action: string; input: Record<string, unknown>; text: string } | null>(null);
const confirmButton = ref<HTMLButtonElement | null>(null);
let confirmationOrigin: HTMLElement | null = null;
const voice = ref(state.value.profile?.voice?.voiceId ?? state.value.voices.defaultVoice);
const voiceLanguage = ref(state.value.profile?.voice?.language ?? state.value.language);
const speed = ref(state.value.profile?.voice?.speed ?? 1);
const harvestPage = ref(0);
const harvest = computed(() => state.value.completions.slice(harvestPage.value * 20, (harvestPage.value + 1) * 20));
watch([() => state.value.language, () => state.value.profile?.voice], ([language, value]) => {
    voice.value = value?.voiceId ?? state.value.voices.defaultVoice;
    voiceLanguage.value = value?.language ?? language;
    speed.value = value?.speed ?? 1;
});
watch(() => state.value.unit?.id, (id, old) => { if (id && id !== old) { void go('lesson'); } });
watch(() => !!state.value.profile, (exists, old) => { if (exists && !old) { void go('desk'); } });
watch(() => state.value.language, () => { harvestPage.value = 0; });
async function go(next: Page) {
    if (scroller.value) { scrolls[page.value] = scroller.value.scrollTop; }
    if (page.value === 'lesson' && next !== 'lesson') { void request('stop'); }
    page.value = next;
    await nextTick();
    if (scroller.value) {
        scroller.value.scrollTop = scrolls[next] ?? 0;
        const heading = [...scroller.value.querySelectorAll<HTMLElement>('h1')].find(element => element.offsetParent !== null);
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }
}
async function askConfirm(action: string, input: Record<string, unknown>, text: string) {
    confirmationOrigin = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    confirm.value = { action, input, text }; await nextTick(); confirmButton.value?.focus();
}
watch(confirm, async value => { if (!value) { await nextTick(); confirmationOrigin?.focus({ preventScroll: true }); } });
function trapConfirmation(event: KeyboardEvent) {
    const buttons = (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('button');
    if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons[buttons.length - 1]?.focus(); }
    else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) { event.preventDefault(); buttons[0]?.focus(); }
}
function prepare(message = '', short = false) {
    const input = { replaceCurrent: !!state.value.unit || state.value.blockedUnit,
        message: message.trim() || (short ? '今天想轻松做一次短练。请按我的目标和实际水平安排，也可以复习合适的知识点。' : '请按我的目标和实际水平准备下一课，选择有帮助的真实材料或练习，也照顾值得复习的知识点。') };
    if (input.replaceCurrent) { void askConfirm('prepare', input, '准备新课会替换当前课件和本课笔记。已保留的学习证据及奖励资格不受影响；需要完整留存本课，可以先导出学习数据。'); }
    else { void request('prepare', input); }
}
async function exportData() {
    const result = await request('export');
    if (!result?.document) { return; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(result.document, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'LittleWhiteBox_Learning.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function clock(value: number) { return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`; }
</script>

<template>
    <section class="learning-app" aria-label="语伴语言学习">
        <header class="learning-toolbar" :inert="!!confirm">
            <button v-if="page === 'settings' || page === 'profile'" type="button" class="learning-toolbar-back" aria-label="返回学习首页" @click="go('desk')"><LearningIcon name="back" /></button>
            <button type="button" class="learning-wordmark" @click="go('desk')"><span class="learning-brand-mark" aria-hidden="true">a<span>あ</span></span>语伴</button>
            <button type="button" class="learning-toolbar-more" aria-label="语伴设置" @click="go('settings')"><LearningIcon name="more" /></button>
        </header>
        <div v-if="state.busy || state.message || localMessage || state.storage !== 'ready'" class="learning-notice" :class="{ 'is-working': state.busy }" role="status" aria-live="polite" :inert="!!confirm">
            <template v-if="state.busy"><span class="learning-working-dot" />{{ state.message || '正在处理学习操作…' }}<button type="button" :disabled="pending" @click="request('cancel')">停止</button></template>
            <template v-else>{{ localMessage || state.message || (state.storage === 'unconfirmed' ? '上次保存尚未确认，请先核实。' : state.storage === 'conflict' ? '学习文件出现另一版本，请先核实。' : '暂时无法读取学习文件。') }}</template>
            <div v-if="!state.busy" class="learning-row">
                <button v-if="state.storage === 'unconfirmed' || state.storage === 'conflict'" type="button" :disabled="pending" @click="request('verify')">核实保存</button>
                <button v-if="state.storage === 'unconfirmed'" type="button" :disabled="pending" @click="request('retry-save')">重试原保存</button>
                <button v-if="state.storage === 'conflict'" type="button" :disabled="pending" @click="askConfirm('adopt-server', {}, '采用服务器上的学习文件？未确认的本次修改将不再作为候选保留。')">采用服务器版本</button>
                <button v-if="state.storage === 'unloaded' || localMessage" type="button" :disabled="pending" @click="request('read')">重试读取</button>
            </div>
        </div>
        <div ref="scroller" class="learning-scroll" :inert="!!confirm">
            <LearningDesk v-show="page === 'desk'" :state="state" :disabled="!writable" @navigate="go" @prepare="prepare" @action="request" />
            <LearningProfile v-show="page === 'profile'" :state="state" :disabled="!writable" @action="request" />
            <LearningLesson v-if="state.unit" v-show="page === 'lesson'" :key="`${state.chatIdentity}:${state.language}:${state.unit.id}`" :state="state" :disabled="!writable" @action="request" />
            <section v-if="page === 'lesson' && !state.unit" class="learning-empty-page"><LearningIcon name="book" /><h1>还没有课程</h1><button class="learning-primary" type="button" @click="go('desk')">去备课<LearningIcon name="arrow" /></button></section>
            <LearningRecords v-if="page === 'records'" :state="state" :disabled="!writable" @action="request" @remove="askConfirm" />
            <section v-if="page === 'harvest'" class="learning-harvest-page">
                <div class="learning-page-heading"><h1>我的收获</h1></div>
                <p v-if="!state.completions.length" class="learning-empty-note">还没有完成的课程</p>
                <article v-for="completion in harvest" :key="completion.unitId" class="learning-harvest-entry">
                    <small>{{ new Date(completion.completedAt).toLocaleDateString() }}</small>
                    <h2>+{{ completion.amount }}<span>小白币</span></h2><p>{{ completion.summary }}</p>
                    <p class="learning-muted">{{ completion.paid ? '已到账' : !completion.originHere ? '请回到开课的原聊天领取' : '学习已完成，等待到账' }}</p>
                    <button v-if="!completion.paid && completion.originHere" type="button" :disabled="!writable" @click="request('reward', { unitId: completion.unitId, openWallet: !state.walletOpen })">{{ state.walletOpen ? '核实并补领' : '开通钱包并领取' }}</button>
                </article>
                <button v-if="state.chatStorage === 'unconfirmed' || state.chatStorage === 'conflict' || state.chatStorage === 'failed'" type="button" :disabled="pending || state.busy" @click="request('verify-wallet')">核实账本保存</button>
                <button v-if="state.chatStorage === 'conflict'" type="button" :disabled="pending || state.busy" @click="askConfirm('adopt-wallet', {}, '采用服务器上的聊天账本？本次未确认的候选将被放下，之后可凭已保存的学习完成记录核实并补领。')">采用服务器账本</button>
                <div v-if="state.completions.length > 20" class="learning-row"><button type="button" :disabled="harvestPage === 0" @click="harvestPage--">上一页</button><button type="button" :disabled="(harvestPage + 1) * 20 >= state.completions.length" @click="harvestPage++">下一页</button></div>
            </section>
            <section v-if="page === 'settings'" class="learning-settings-page">
                <h1>学习设置</h1>
                <label>当前语言<select :value="state.language" :disabled="!writable" @change="request('language', { language: ($event.target as HTMLSelectElement).value })"><option v-for="code in [...new Set([state.language, ...state.languages])]" :key="code" :value="code">{{ new Intl.DisplayNames(['zh-CN'], { type: 'language' }).of(code) }}</option></select></label>
                <button type="button" @click="go('profile')">语言、老师与目标 →</button>
                <section>
                    <h2>老师的声音</h2><p v-if="!state.voices.enabled" class="learning-muted">使用语音前，请先开启 TTS 模块。文字学习不受影响。</p>
                    <form v-else @submit.prevent="request('voice', { voice: { voiceId: voice, language: voiceLanguage, speed: Number(speed) } })">
                        <label>音色<select v-model="voice"><option v-for="item in state.voices.voices" :key="item.id" :value="item.id" :disabled="!item.available">{{ item.name }}{{ item.available ? '' : '（暂不可用）' }}</option></select></label>
                        <label>发音语言<input v-model="voiceLanguage" type="text" maxlength="80" placeholder="en / ja"></label>
                        <label>合成语速<select v-model="speed"><option :value="0.75">0.75×</option><option :value="1">1×</option><option :value="1.25">1.25×</option></select></label>
                        <button type="submit" :disabled="!writable || !state.profile">保存声音偏好</button>
                        <button type="button" @click="request('tts-settings')">打开 TTS 设置</button>
                    </form><small>已听过的题保留原声音，新偏好用于之后的题目。</small>
                </section>
                <section>
                    <h2>学习数据</h2>
                    <button type="button" :disabled="!writable" @click="exportData">导出学习数据</button><button type="button" :disabled="pending || state.busy" @click="request('read')">重新读取保存内容</button>
                    <button v-if="state.unit || state.blockedUnit" type="button" :disabled="!writable" @click="askConfirm('abandon', {}, '放下当前这一课？本课课件、原答和笔记会移除；已被学习项保留的证据和完成奖励资格仍保留。')">放下当前课件</button>
                    <button type="button" class="learning-danger" :disabled="!writable || !state.profile" @click="askConfirm('delete-language', {}, '删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。')">删除当前语言</button>
                    <button type="button" class="learning-danger" :disabled="!writable" @click="askConfirm('clear', {}, '清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。')">清空全部学习数据</button>
                </section>
            </section>
        </div>
        <section v-if="state.media.status !== 'idle'" class="learning-player" aria-label="课堂朗读" :inert="!!confirm">
            <p v-if="state.media.message" role="status">{{ state.media.message }}</p>
            <div class="learning-row">
                <LearningIcon name="sound" /><span>{{ state.media.status === 'loading' ? '正在生成声音…' : `${clock(state.media.position)} / ${clock(state.media.duration)}` }}</span>
                <button v-if="state.media.status === 'playing'" type="button" aria-label="暂停" @click="request('pause')"><LearningIcon name="pause" /></button>
                <button v-else-if="['paused', 'ended', 'blocked'].includes(state.media.status)" type="button" :aria-label="state.media.status === 'ended' ? '再听一遍' : '继续播放'" :disabled="state.busy" @click="request('resume')"><LearningIcon name="play" /></button>
                <button type="button" aria-label="停止" @click="request('stop')"><LearningIcon name="stop" /></button>
                <button v-if="state.media.duration" type="button" @click="request('rate', { value: state.media.rate === 1 ? 0.75 : 1 })">{{ state.media.rate }}×</button>
            </div>
            <input v-if="state.media.duration" type="range" min="0" :max="state.media.duration" step="0.1" :value="state.media.position" aria-label="当前声音片段播放位置" @change="request('seek', { value: Number(($event.target as HTMLInputElement).value) })">
        </section>
        <nav class="learning-bottom-nav" aria-label="语伴页面" :inert="!!confirm"><button v-for="[id, label, icon] in ([['desk', '学习', 'home'], ['lesson', '课堂', 'book'], ['records', '记录', 'records'], ['harvest', '收获', 'reward']] as const)" :key="id" type="button" :aria-current="page === id ? 'page' : undefined" @click="go(id)"><LearningIcon :name="icon" /><span>{{ label }}</span></button></nav>
        <div v-if="confirm" class="learning-confirm-shade" @keydown.esc.stop.prevent="confirm = null" @keydown.tab="trapConfirmation">
            <section role="alertdialog" aria-modal="true" aria-labelledby="learning-confirm-title" class="learning-confirm">
                <h2 id="learning-confirm-title">确认这次操作</h2><p>{{ confirm.text }}</p>
                <div class="learning-row"><button ref="confirmButton" type="button" @click="confirm = null">先不改</button><button type="button" class="learning-primary" @click="request(confirm.action, confirm.input); confirm = null">确认</button></div>
            </section>
        </div>
    </section>
</template>
