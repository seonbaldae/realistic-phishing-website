import { sharedStyles } from '../styles/shared-styles.js';

class DemoCompletion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        :host { display: block; width: 100%; max-width: 760px; margin: 0 auto; }
        .card { padding: 55px 30px 43px; text-align: center; border: 1px solid #e2e8e4; border-top: 5px solid var(--green, #03c75a); border-radius: 12px; background: #fff; }
        .check { display: grid; width: 76px; height: 76px; margin: 0 auto 25px; place-items: center; border-radius: 50%; background: #edf9f1; color: #00ad4d; }
        .check svg { width: 37px; height: 37px; }
        .eyebrow { margin: 0 0 11px; color: #008c40; font-size: 12px; font-weight: 700; }
        h1 { margin: 0; color: #223329; font-size: 27px; letter-spacing: -1px; line-height: 1.5; }
        .message { margin: 17px 0 27px; color: #7b847e; font-size: 14px; line-height: 1.9; }
        .summary { display: grid; gap: 12px; max-width: 390px; margin: 0 auto 29px; padding: 19px 23px; border-radius: 8px; background: #f6f8f6; text-align: left; }
        .summary div { display: flex; justify-content: space-between; gap: 15px; font-size: 12px; line-height: 1.6; }
        dt { color: #849087; }
        dd { margin: 0; color: #3d5144; font-weight: 600; }
        .status { color: #009342; }
        .button { min-width: 216px; min-height: 48px; font-size: 14px; }
        .note { margin: 23px 0 0; color: #99a19b; font-size: 11px; line-height: 1.7; }
        @media (max-width: 520px) {
          .card { padding: 38px 20px 32px; }
          h1 { font-size: 23px; }
          .message { font-size: 13px; }
          .summary { padding: 17px; }
          .summary div { font-size: 11px; }
        }
      </style>
      <section class="card" aria-labelledby="completion-title">
        <div class="check" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="m10 20 7 7 14-15" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p class="eyebrow">의견을 들려주셔서 감사합니다</p>
        <h1 id="completion-title" tabindex="-1">설문 참여가 완료되었어요</h1>
        <p class="message">모의 설문이 완료되었습니다.<br>응답은 저장되거나 전송되지 않았습니다.</p>
        <dl class="summary">
          <div><dt>참여 설문</dt><dd>더 나은 디지털 일상을 위한 설문</dd></div>
          <div><dt>진행 상태</dt><dd class="status">모의 참여 완료</dd></div>
          <div><dt>응답 보관</dt><dd>보관하지 않음</dd></div>
        </dl>
        <button class="button primary" type="button">처음으로 돌아가기</button>
        <p class="note">해커톤 보안 훈련용 시나리오를 모두 체험했어요.<br>처음으로 돌아가면 다시 참여할 수 있습니다.</p>
      </section>
    `;
  }

  connectedCallback() {
    this.controller?.abort();
    this.controller = new AbortController();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('demo-restart', { bubbles: true, composed: true }));
    }, { signal: this.controller.signal });
  }

  disconnectedCallback() {
    this.controller?.abort();
  }

  focusHeading() {
    this.shadowRoot.querySelector('h1').focus({ preventScroll: true });
  }
}

customElements.define('demo-completion', DemoCompletion);
