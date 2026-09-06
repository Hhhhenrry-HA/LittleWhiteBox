<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import LearningLesson from './LearningLesson.vue';
import LearningProfile from './LearningProfile.vue';
import LearningRecords from './LearningRecords.vue';
import { useLearningState } from './use-learning-state.js';
import './learning.css';

const props = defineProps<XiaobaiOsAppProps>();
const { state, pending, writable, localMessage, request } = useLearningState(props);
type Page = 'desk' | 'lesson' | 'records' | 'harvest' | 'settings' | 'profile';
const page = ref<Page>(state.value.profile && state.value.teacher ? 'desk' : 'profile');
const scroller = ref<HTMLElement | null>(null);
const scrolls: Partial<Record<Page, number>> = {};
const lessonRequest = ref('');
const confirm = ref<{ action: string; input: Record<string, unknown>; text: string } | null>(null);
const confirmButton = ref<HTMLButtonElement | null>(null);
let confirmationOrigin: HTMLElement | null = null;
const voice = ref(state.value.profile?.voice?.voiceId ?? state.value.voices.defaultVoice);
const voiceLanguage = ref(state.value.profile?.voice?.language ?? state.value.language);
const speed = ref(state.value.profile?.voice?.speed ?? 1);
const harvestPage = ref(0);
const harvest = computed(() => state.value.completions.slice(harvestPage.value * 20, (harvestPage.value + 1) * 20));
const languageName = computed(() => new Intl.DisplayNames(['zh-CN'], { type: 'language' }).of(state.value.language) ?? state.value.language);
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
function prepare(short = false) {
    const input = { replaceCurrent: !!state.value.unit || state.value.blockedUnit,
        message: lessonRequest.value.trim() || (short ? '今天想轻松做一次短练。请按我的目标和实际水平安排，也可以复习合适的知识点。' : '请按我的目标和实际水平准备下一课，选择有帮助的真实材料或练习，也照顾值得复习的知识点。') };
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
            <button type="button" class="learning-wordmark" @click="go('desk')">语伴<span>一起，把语言用起来</span></button>
            <button type="button" aria-label="语伴设置" @click="go('settings')">···</button>
        </header>
        <div v-if="state.busy || state.message || localMessage || state.storage !== 'ready'" class="learning-notice" role="status" aria-live="polite">
            <template v-if="state.busy"><span class="learning-working-dot" />正在处理，请稍等。<button type="button" :disabled="pending" @click="request('cancel')">停止</button></template>
            <template v-else>{{ localMessage || state.message || (state.storage === 'unconfirmed' ? '上次保存尚未确认，请先核实。' : state.storage === 'conflict' ? '学习文件出现另一版本，请先核实。' : '暂时无法读取学习文件。') }}</template>
            <div v-if="!state.busy" class="learning-row">
                <button v-if="state.storage === 'unconfirmed' || state.storage === 'conflict'" type="button" :disabled="pending" @click="request('verify')">核实保存</button>
                <button v-if="state.storage === 'unconfirmed'" type="button" :disabled="pending" @click="request('retry-save')">重试原保存</button>
                <button v-if="state.storage === 'conflict'" type="button" :disabled="pending" @click="askConfirm('adopt-server', {}, '采用服务器上的学习文件？未确认的本次修改将不再作为候选保留。')">采用服务器版本</button>
                <button v-if="state.storage === 'unloaded' || localMessage" type="button" :disabled="pending" @click="request('read')">重试读取</button>
            </div>
        </div>
        <div ref="scroller" class="learning-scroll" :inert="!!confirm">
            <div v-show="page === 'desk'" class="learning-desk">
                <div class="learning-desk-heading"><p class="learning-eyebrow">你的语言书桌 · {{ languageName }}</p><h1 tabindex="-1">今天，<br>多会一点点。</h1><span class="learning-desk-seal" aria-hidden="true">语<br>伴</span></div>
                <div class="learning-teacher-line"><span class="learning-person-initial">{{ [...(state.teacher?.name ?? '？')][0] }}</span><div><strong>{{ state.teacher?.name ?? '选择一位老师' }}</strong><p>{{ state.teacher ? '熟悉你，也认真对待你的目标。' : '让你熟悉的人物，陪你把语言学好。' }}</p></div><button type="button" @click="go('profile')">调整</button></div>
                <section v-if="!state.profile || !state.teacher" class="learning-desk-start"><h2>先认识你，再开始。</h2><p>选老师，聊聊你的真实水平和想去的方向。无需测试分数，也不需要完美开场。</p><button type="button" class="learning-primary" @click="go('profile')">告诉老师我的目标 →</button></section>
                <template v-else>
                    <section class="learning-goal"><p class="learning-eyebrow">正在走向</p><p>{{ state.profile.goal.description }}</p></section>
                    <button v-if="state.unit" type="button" class="learning-resume" @click="go('lesson')"><span><small>书签还在这里</small><strong>{{ state.unit.title }}</strong><small>{{ state.unit.attempts.length ? '带着已经练过的，接着往下走。' : '课件已准备好，随时开始。' }}</small></span><span aria-hidden="true">↗</span></button>
                    <p v-if="state.blockedUnit" class="learning-margin-note">上一课的素材属于其他故事。回到原聊天可以继续；也可以明确换一课，原有学习证据会保留。</p>
                    <section class="learning-next-lesson">
                        <h2>{{ state.unit || state.blockedUnit ? '下一课，想练什么？' : '把第一课交给老师。' }}</h2><p class="learning-muted">新闻、考试训练，或一个总卡住的用法。老师会按你的目标选材。</p>
                        <div v-if="state.reply?.action === 'prepare'" class="learning-teacher-reply" aria-live="polite">
                            <p class="learning-eyebrow">{{ state.teacher?.name }} · 备课留言</p>
                            <p>{{ state.reply.text }}</p>
                            <button v-if="[...state.reply.text].length <= 1000" type="button" :disabled="!writable" @click="request('say-reply')">听老师说</button>
                        </div>
                        <textarea v-model="lessonRequest" rows="2" maxlength="2000" aria-label="这次的学习想法" placeholder="有特别想练的，可以告诉老师；不填也没关系。" />
                        <div class="learning-row"><button type="button" class="learning-primary" :disabled="!writable" @click="prepare()">准备{{ state.unit ? '新' : '这一' }}课 →</button><button type="button" :disabled="!writable" @click="prepare(true)">今天轻松一点</button></div>
                        <small>出题会使用模型；老师需要时会联网选材。</small>
                    </section>
                    <p class="learning-desk-footer">短练 20 · 常规 40 · 深练 60 小白币<br><span>完成就有收获，做错也不会扣奖励。</span></p>
                </template>
            </div>
            <LearningProfile v-if="page === 'profile'" :state="state" :disabled="!writable" @action="request" />
            <LearningLesson v-if="state.unit" v-show="page === 'lesson'" :key="`${state.chatIdentity}:${state.language}:${state.unit.id}`" :state="state" :disabled="!writable" @action="request" />
            <section v-if="page === 'lesson' && !state.unit" class="learning-empty-page"><h1>书页还空着</h1><p>先让老师准备一课，打开和阅读本身不会请求模型。</p><button class="learning-primary" type="button" @click="go('desk')">回到书桌</button></section>
            <LearningRecords v-if="page === 'records'" :state="state" :disabled="!writable" @action="request" @remove="askConfirm" />
            <section v-if="page === 'harvest'" class="learning-harvest-page">
                <p class="learning-eyebrow">每一次认真，都算数</p><h1>我的收获</h1>
                <p v-if="!state.completions.length" class="learning-empty-note">跟老师练完一个小目标，成果就会留在这里。没有连签，也没有欠下的功课。</p>
                <article v-for="completion in harvest" :key="completion.unitId" class="learning-harvest-entry">
                    <small>{{ new Date(completion.completedAt).toLocaleDateString() }}</small>
                    <h2>+{{ completion.amount }}<span>小白币</span></h2><p>{{ completion.summary }}</p>
                    <p class="learning-muted">{{ completion.paid ? '已到账' : !completion.originHere ? '请回到开课的原聊天领取' : '学习已完成，等待到账' }}</p>
                    <button v-if="!completion.paid && completion.originHere" type="button" :disabled="!writable" @click="request('reward', { unitId: completion.unitId, openWallet: !state.walletOpen })">{{ state.walletOpen ? '核实并补领' : '开通钱包并领取' }}</button>
                </article>
                <button v-if="state.chatStorage === 'unconfirmed' || state.chatStorage === 'conflict' || state.chatStorage === 'failed'" type="button" :disabled="pending || state.busy" @click="request('verify-wallet')">核实账本保存</button>
                <button v-if="state.chatStorage === 'conflict'" type="button" :disabled="pending || state.busy" @click="askConfirm('adopt-wallet', {}, '采用服务器上的聊天账本？本次未确认的候选将被放下，之后可凭已保存的学习完成记录核实并补领。')">采用服务器账本</button>
                <div v-if="state.completions.length > 20" class="learning-row"><button type="button" :disabled="harvestPage === 0" @click="harvestPage--">上一页</button><button type="button" :disabled="(harvestPage + 1) * 20 >= state.completions.length" @click="harvestPage++">下一页</button></div>
                <small class="learning-muted">钱包开户赠礼是另一笔流水，不计入学习奖励。</small>
            </section>
            <section v-if="page === 'settings'" class="learning-settings-page">
                <p class="learning-eyebrow">让这里，更适合你</p><h1>书桌设置</h1>
                <label>当前语言<select :value="state.language" :disabled="!writable" @change="request('language', { language: ($event.target as HTMLSelectElement).value })"><option v-for="code in [...new Set([state.language, ...state.languages])]" :key="code" :value="code">{{ new Intl.DisplayNames(['zh-CN'], { type: 'language' }).of(code) }}</option></select></label>
                <button type="button" @click="go('profile')">学习新语言 / 调整老师与目标 →</button>
                <section>
                    <h2>老师的声音</h2><p v-if="!state.voices.enabled" class="learning-muted">使用语音前，请先开启 TTS 模块。文字学习不受影响。</p>
                    <form v-else @submit.prevent="request('voice', { voice: { voiceId: voice, language: voiceLanguage, speed: Number(speed) } })">
                        <label>音色<select v-model="voice"><option v-for="item in state.voices.voices" :key="item.id" :value="item.id" :disabled="!item.available">{{ item.name }}{{ item.available ? '' : '（暂不可用）' }}</option></select></label>
                        <label>发音语言<input v-model="voiceLanguage" type="text" maxlength="80" placeholder="en / ja"></label>
                        <label>合成语速<select v-model="speed"><option :value="0.75">0.75×</option><option :value="1">1×</option><option :value="1.25">1.25×</option></select></label>
                        <button type="submit" :disabled="!writable || !state.profile">保存声音偏好</button>
                        <button type="button" @click="request('tts-settings')">打开 TTS 设置</button>
                    </form><small>新偏好用于之后的听力题。开始听过的题保留原音色与语言；慢放和重听如实记录。首版不录音。</small>
                </section>
                <section>
                    <h2>自己的学习资产</h2><p class="learning-muted">导出包含所有语言的目标、练习和记录。数据只随明确操作删除。</p>
                    <button type="button" :disabled="!writable" @click="exportData">导出学习数据</button><button type="button" :disabled="pending || state.busy" @click="request('read')">重新读取保存内容</button>
                    <button v-if="state.unit || state.blockedUnit" type="button" :disabled="!writable" @click="askConfirm('abandon', {}, '放下当前这一课？本课课件、原答和笔记会移除；已被学习项保留的证据和完成奖励资格仍保留。')">放下当前课件</button>
                    <button type="button" class="learning-danger" :disabled="!writable || !state.profile" @click="askConfirm('delete-language', {}, '删除当前语言的全部学习数据？未领取奖励也将放弃，已到账流水保留。')">删除当前语言</button>
                    <button type="button" class="learning-danger" :disabled="!writable" @click="askConfirm('clear', {}, '清空所有语言的目标、课程和记录？未领取奖励也将放弃。已到账流水不撤销。')">清空全部学习数据</button>
                </section>
            </section>
        </div>
        <section v-if="state.media.status !== 'idle'" class="learning-player" aria-label="课堂朗读">
            <p v-if="state.media.message" role="status">{{ state.media.message }}</p>
            <div class="learning-row">
                <span>{{ state.media.status === 'loading' ? '正在生成声音…' : `${clock(state.media.position)} / ${clock(state.media.duration)}` }}</span>
                <button v-if="state.media.status === 'playing'" type="button" @click="request('pause')">暂停</button>
                <button v-else-if="['paused', 'ended', 'blocked'].includes(state.media.status)" type="button" :disabled="state.busy" @click="request('resume')">{{ state.media.status === 'ended' ? '再听一遍' : '继续播放' }}</button>
                <button type="button" @click="request('stop')">停止</button>
                <button v-if="state.media.duration" type="button" @click="request('rate', { value: state.media.rate === 1 ? 0.75 : 1 })">{{ state.media.rate }}×</button>
            </div>
            <input v-if="state.media.duration" type="range" min="0" :max="state.media.duration" step="0.1" :value="state.media.position" aria-label="当前声音片段播放位置" @change="request('seek', { value: Number(($event.target as HTMLInputElement).value) })">
        </section>
        <nav class="learning-bottom-nav" aria-label="语伴页面"><button v-for="[id, label] in ([['desk', '书桌'], ['lesson', '课堂'], ['records', '记录'], ['harvest', '收获']] as const)" :key="id" type="button" :aria-current="page === id ? 'page' : undefined" @click="go(id)">{{ label }}</button></nav>
        <div v-if="confirm" class="learning-confirm-shade" @keydown.esc.stop.prevent="confirm = null" @keydown.tab="trapConfirmation">
            <section role="alertdialog" aria-modal="true" aria-labelledby="learning-confirm-title" class="learning-confirm">
                <h2 id="learning-confirm-title">确认这次操作</h2><p>{{ confirm.text }}</p>
                <div class="learning-row"><button ref="confirmButton" type="button" @click="confirm = null">先不改</button><button type="button" class="learning-primary" @click="request(confirm.action, confirm.input); confirm = null">确认</button></div>
            </section>
        </div>
    </section>
</template>
