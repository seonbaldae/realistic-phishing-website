import { sharedStyles } from '../styles/shared-styles.js';

export class DemoSessionNotice extends HTMLElement {
  #controller;
  #dialog;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        :host { display: contents; }
        dialog {
          width: min(440px, calc(100% - 40px)); padding: 36px 32px 28px;
          border: 1px solid #e3e8e5; border-radius: 20px; color: var(--text, #202823);
          background: #fff; box-shadow: 0 24px 100px #102d2638; text-align: center;
        }
        dialog::backdrop { background: #152b24a6; backdrop-filter: blur(4px); }
        .close { position: absolute; top: 15px; right: 15px; width: 32px; height: 32px;
          display: grid; place-items: center; padding: 0; border: 0; border-radius: 50%;
          background: transparent; color: #77827b; cursor: pointer; }
        .close:hover { background: #f1f5f3; }
        .lock { display: grid; place-items: center; width: 68px; height: 68px;
          margin: 4px auto 23px; border-radius: 50%; color: #03a94e; background: #eaf9ef; }
        .lock svg { width: 30px; height: 30px; }
        h2 { margin: 0 0 13px; font-size: 24px; letter-spacing: -1px; line-height: 1.4; }
        .description { margin: 0; color: #657168; font-size: 14px; line-height: 1.8; word-break: keep-all; }
        .training { margin: 23px 0 26px; padding: 13px 12px; border-radius: 8px;
          background: #f6f8f7; color: #69756c; font-size: 12px; line-height: 1.7; }
        .actions { display: grid; grid-template-columns: 1fr 1.5fr; gap: 9px; }
        .actions .button { min-height: 49px; border-radius: 8px; }
        @media (max-width: 420px) { dialog { padding: 32px 22px 22px; } h2 { font-size: 22px; } }
      </style>
      <dialog aria-labelledby="session-title" aria-describedby="session-description">
        <button class="close" type="button" aria-label="안내 닫기">
          <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
        <div class="lock" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="14" width="18" height="14" rx="4"/><path d="M11 14V9a5 5 0 0 1 10 0v5"/><path d="M16 20v3" stroke-linecap="round"/></svg>
        </div>
        <h2 id="session-title">로그인이 필요합니다</h2>
        <p class="description" id="session-description">로그인 세션이 만료되었습니다.<br>설문에 참여하려면 다시 로그인해 주세요.</p>
        <p class="training">해커톤 보안 훈련용 모의 안내입니다.<br>다음 화면에서는 가상 계정으로만 진행합니다.</p>
        <div class="actions">
          <button class="button secondary" type="button" data-action="cancel">취소</button>
          <button class="button primary" type="button" data-action="login" autofocus>로그인하기 <span aria-hidden="true">→</span></button>
        </div>
      </dialog>
    `;
    this.#dialog = this.shadowRoot.querySelector('dialog');
  }

  connectedCallback() {
    this.#controller?.abort();
    this.#controller = new AbortController();
    const { signal } = this.#controller;
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.close(), { signal });
    this.shadowRoot.querySelector('[data-action="cancel"]').addEventListener('click', () => this.close(), { signal });
    this.shadowRoot.querySelector('[data-action="login"]').addEventListener('click', () => this.#dialog.close('login'), { signal });
    this.#dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      this.close();
    }, { signal });
    this.#dialog.addEventListener('close', () => {
      const action = this.#dialog.returnValue === 'login' ? 'login' : 'cancel';
      this.dispatchEvent(new CustomEvent(`demo-session-${action}`, { bubbles: true, composed: true }));
    }, { signal });
  }

  disconnectedCallback() {
    this.#controller?.abort();
    if (this.#dialog.open) this.#dialog.close('cancel');
  }

  open() {
    if (!this.isConnected || this.#dialog.open) return;
    this.#dialog.returnValue = '';
    this.#dialog.showModal();
  }

  close() {
    if (this.#dialog.open) this.#dialog.close('cancel');
  }
}

customElements.define('demo-session-notice', DemoSessionNotice);
