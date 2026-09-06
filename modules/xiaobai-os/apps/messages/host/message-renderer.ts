import { projectionMarker, type ChatMessage } from '../application/projection.js';
import { parseImageAttachment } from '../../../domains/messages/image-attachment.js';

/** Display only: never reconstruct the sidecar from rendered markup. */
export function renderPrivateMessages(messages: readonly ChatMessage[], root: ParentNode = document): void {
    messages.forEach((message, index) => {
        if (!projectionMarker(message) || !message.mes) {return;}
        const target = root.querySelector<HTMLElement>(`.mes[mesid="${index}"] .mes_text`);
        if (!target || target.closest('.mes')?.querySelector('.edit_textarea')) {return;}
        const xml = new DOMParser().parseFromString(message.mes, 'application/xml');
        if (xml.querySelector('parsererror') || xml.documentElement.tagName !== '私人信息') {return;}
        const section = document.createElement('section');
        section.className = 'xb-private-messages';
        section.setAttribute('aria-label', '私人信息');
        for (const node of Array.from(xml.documentElement.children)) {
            if (node.tagName === '补录说明') {
                const note = document.createElement('p'); note.textContent = node.textContent; section.append(note); continue;
            }
            if (node.tagName !== '消息') {return;}
            const bubble = document.createElement('article');
            bubble.className = node.getAttribute('方向') === '发出' ? 'xb-private-outgoing' : 'xb-private-incoming';
            const label = document.createElement('small');
            label.textContent = `${node.getAttribute('发送者') ?? ''} → ${node.getAttribute('接收者') ?? ''}`;
            const content = document.createElement('div');
            const type = node.getAttribute('类型');
            content.textContent = (type === 'image' ? '［图片］' : type === 'voice' ? '［语音］' : '') + (node.textContent ?? '');
            if (type === 'image' && node.hasAttribute('附件')) {
                try {
                    const attachment = parseImageAttachment({ path: node.getAttribute('附件'), name: '图片' });
                    const image = document.createElement('img'); image.src = attachment.path; image.alt = '发送的图片'; image.loading = 'lazy';
                    content.prepend(image);
                } catch { /* Edited or untrusted paths remain readable text, never remote media. */ }
            }
            bubble.append(label, content); section.append(bubble);
        }
        target.replaceChildren(section);
    });
}
