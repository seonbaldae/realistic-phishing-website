import { sharedStyles } from '../styles/shared-styles.js';

export class DemoTrainingNotice extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${sharedStyles}
        :host { background: #fdf9ed; border-bottom: 1px solid #efe8ce; }
        .notice { max-width: 1120px; margin: auto; min-height: 37px; display: flex; align-items: center; justify-content: center; gap: 9px; padding: 8px 20px; color: #776532; font-size: 11px; line-height: 1.5; }
        strong { font-weight: 700; } .divider { opacity: .35; }
        @media(max-width: 480px) { .notice { flex-wrap: wrap; gap: 2px 7px; padding: 7px 14px; } .detail { font-size: 10px; } .divider { display: none; } }
      </style>
      <div class="notice" role="note">
        <svg width="13" height="15" viewBox="0 0 16 18" fill="none" aria-hidden="true"><path d="M8 1 14 3.5v5c0 4-6 7.5-6 7.5S2 12.5 2 8.5v-5L8 1Z" stroke="currentColor" stroke-width="1.4"/><path d="m5 8.5 2 2 4-4" stroke="currentColor" stroke-width="1.4"/></svg>
        <strong>해커톤 보안 훈련용 모의 페이지</strong><span class="divider">|</span><span class="detail">실제 개인정보를 입력하지 마세요.</span>
      </div>`;
  }
}
customElements.define('demo-training-notice', DemoTrainingNotice);
