// These styles own only the gap between native generations. Native busy flags
// must become idle; keeping them true would prevent actual host cleanup.
const BUSY_ATTRIBUTE = 'data-lwb-recall-recovery';
const BUSY_CSS = `
body[${BUSY_ATTRIBUTE}] #mes_stop { display: flex !important; }
body[${BUSY_ATTRIBUTE}] :is(#send_but, #mes_continue, #mes_impersonate,
    #chat .last_mes .mes_buttons, #chat .last_mes .mes_reasoning_actions,
    #chat .swipe_left, #chat .swipe_right) { display: none !important; }
`;

export function acquireRecallRecoveryUi({ document, window, getContext, isGenerating, onStop }) {
    const style = document.createElement('style');
    style.textContent = BUSY_CSS;
    document.head.append(style);
    document.body.setAttribute(BUSY_ATTRIBUTE, '');
    // Window capture precedes Ena's document capture: even in the idle gap a
    // new click/Enter cannot start another planning request.
    const click = event => {
        if (event.target.closest?.('#mes_stop')) { onStop(); return; }
        if (!event.target.closest?.('#send_but, #option_regenerate, #option_continue, #mes_continue, #mes_impersonate')) return;
        event.preventDefault();
        event.stopImmediatePropagation();
    };
    const keydown = event => {
        if (event.target.id !== 'send_textarea' || event.key !== 'Enter'
            || event.isComposing || event.altKey || (event.shiftKey && !event.ctrlKey)) return;
        event.preventDefault();
        event.stopImmediatePropagation();
    };
    window.addEventListener('click', click, true);
    window.addEventListener('keydown', keydown, true);
    return success => {
        // Native stop visibility may have been cleared during the previous
        // cleanup. Restore it before dropping the override on successful recall.
        if (success) getContext().deactivateSendButtons();
        document.body.removeAttribute(BUSY_ATTRIBUTE);
        style.remove();
        window.removeEventListener('click', click, true);
        window.removeEventListener('keydown', keydown, true);
        if (!success && !isGenerating()) getContext().activateSendButtons();
    };
}

// Only the host's short input-reading preamble owns this lease. Planning has
// already completed and its result is already in chat. Never restore an old
// chat's draft into the newly selected chat.
export function protectGenerationDraft(document, getContext) {
    const textarea = document.getElementById('send_textarea');
    const chat = getContext().chat;
    const chatId = getContext().chatId;
    const saved = {
        value: textarea.value, disabled: textarea.disabled,
        start: textarea.selectionStart, end: textarea.selectionEnd,
        direction: textarea.selectionDirection, scrollTop: textarea.scrollTop,
        focused: document.activeElement === textarea,
    };
    textarea.disabled = true;
    textarea.value = '';
    let released = false;
    return () => {
        if (released) return;
        released = true;
        textarea.disabled = saved.disabled;
        if (getContext().chatId !== chatId || getContext().chat !== chat
            || document.getElementById('send_textarea') !== textarea) return;
        textarea.value = saved.value;
        if (saved.focused && document.activeElement === document.body) textarea.focus({ preventScroll: true });
        textarea.setSelectionRange(saved.start, saved.end, saved.direction);
        textarea.scrollTop = saved.scrollTop;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    };
}
