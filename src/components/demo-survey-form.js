import { sharedStyles } from '../styles/shared-styles.js';

class DemoSurveyForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        :host { display: block; width: 100%; max-width: 760px; margin: 0 auto; }
        .survey-heading { padding: 30px 32px; background: #fff; border: 1px solid #e3e7e6; border-top: 5px solid var(--green, #03c75a); border-radius: 12px; }
        .heading-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 22px; }
        .section-label { display: inline-flex; align-items: center; gap: 8px; color: #058b47; font-size: 13px; font-weight: 700; letter-spacing: .025em; }
        .section-label img { display: block; width: 25px; height: 25px; }
        .account { display: inline-flex; align-items: center; gap: 6px; padding: 6px 9px; background: #f2f8f4; border-radius: 5px; color: #33734c; font-size: 11px; }
        .account img { display: block; width: 16px; height: 16px; }
        h1 { margin: 0; color: #202924; font-size: 25px; letter-spacing: -1px; line-height: 1.5; }
        .description { margin: 12px 0 25px; color: #737c77; font-size: 13px; line-height: 1.8; }
        .progress-label { display: flex; align-items: center; justify-content: space-between; color: #5c6861; font-size: 12px; }
        .progress-label strong { color: #008c40; font-size: 13px; }
        progress { display: block; width: 100%; height: 5px; margin-top: 10px; border: 0; border-radius: 9px; overflow: hidden; appearance: none; background: #edf0ee; }
        progress::-webkit-progress-bar { background: #edf0ee; }
        progress::-webkit-progress-value { background: var(--green, #03c75a); border-radius: 9px; }
        progress::-moz-progress-bar { background: var(--green, #03c75a); border-radius: 9px; }
        .required-note { margin: 23px 5px 12px; color: #7c847f; font-size: 12px; }
        .asterisk { color: #00a94c; }
        fieldset { min-width: 0; margin: 0 0 14px; padding: 25px 30px 26px; border: 1px solid #e3e7e6; border-radius: 10px; background: #fff; }
        fieldset[aria-invalid="true"] { border-color: #d44f4f; }
        legend { float: left; width: 100%; margin: 0 0 21px; padding: 0; color: #28362d; font-size: 16px; font-weight: 700; line-height: 1.6; letter-spacing: -.4px; }
        .number { display: inline-block; margin-right: 7px; color: #00a64c; }
        .options { clear: both; display: grid; gap: 9px; }
        label { display: flex; align-items: center; gap: 11px; min-height: 42px; padding: 9px 12px; border: 1px solid #e9edea; border-radius: 6px; cursor: pointer; color: #5b655f; font-size: 13px; line-height: 1.5; transition: background .15s, border-color .15s; }
        label:hover { border-color: #a9d8bd; background: #fbfefc; }
        label:has(input:checked) { color: #087941; border-color: #87d6aa; background: #f0fbf4; }
        input { flex: 0 0 auto; width: 17px; height: 17px; margin: 0; accent-color: #00b650; cursor: pointer; }
        .hint { clear: both; margin: -10px 0 17px; color: #919a94; font-size: 12px; }
        .error { margin: 13px 0 0; color: #c23e3e; font-size: 12px; line-height: 1.5; }
        [hidden] { display: none !important; }
        .actions { display: flex; justify-content: center; gap: 10px; margin: 28px 0 16px; }
        .actions .button { min-width: 132px; min-height: 48px; font-size: 14px; }
        .local-note { display: flex; align-items: center; justify-content: center; gap: 5px; margin: 0 0 8px; color: #909a93; font-size: 11px; line-height: 1.6; text-align: center; }
        .local-note svg { flex-shrink: 0; width: 13px; height: 13px; }
        @media (max-width: 520px) {
          .survey-heading { padding: 24px 20px; }
          .heading-top { align-items: flex-start; }
          h1 { font-size: 22px; }
          fieldset { padding: 22px 19px; }
          legend { font-size: 15px; }
          .account { font-size: 10px; }
        }
        @media (prefers-reduced-motion: reduce) { label { transition: none; } }
      </style>
      <form novalidate autocomplete="off">
        <section class="survey-heading" aria-labelledby="survey-title">
          <div class="heading-top">
            <span class="section-label"><img src="./assets/naver-form-icon.svg" alt="네이버 폼" width="32" height="32">설문 참여</span>
            <span class="account">
              <img src="./assets/naver-symbol.png" alt="NAVER" width="96" height="96">
              가상 계정으로 참여 중
            </span>
          </div>
          <h1 id="survey-title" tabindex="-1">더 나은 디지털 일상을 위한 설문</h1>
          <p class="description">여러분의 작은 경험이 더 편리하고 안전한 일상을 만듭니다.<br>QR코드를 이용하며 느꼈던 생각을 들려주세요.</p>
          <div class="progress-label"><span>응답 진행률</span><strong id="progress-text" aria-live="polite">0 / 3</strong></div>
          <progress max="3" value="0" aria-label="응답한 문항 수"></progress>
        </section>
        <p class="required-note"><span class="asterisk" aria-hidden="true">*</span> 표시는 필수 문항입니다.</p>

        <fieldset data-question="frequency" aria-describedby="frequency-error">
          <legend><span class="number">1.</span> QR코드를 얼마나 자주 이용하시나요? <span class="asterisk" aria-label="필수">*</span></legend>
          <div class="options">
            <label><input type="radio" name="frequency" value="daily" required aria-describedby="frequency-error">거의 매일 이용해요</label>
            <label><input type="radio" name="frequency" value="weekly" required aria-describedby="frequency-error">일주일에 몇 번 이용해요</label>
            <label><input type="radio" name="frequency" value="sometimes" required aria-describedby="frequency-error">가끔 필요할 때 이용해요</label>
            <label><input type="radio" name="frequency" value="rarely" required aria-describedby="frequency-error">거의 이용하지 않아요</label>
          </div>
          <p class="error" id="frequency-error" hidden>이용 빈도를 하나 선택해 주세요.</p>
        </fieldset>

        <fieldset data-question="concern" aria-describedby="concern-error">
          <legend><span class="number">2.</span> QR 이용 시 가장 걱정되는 점은 무엇인가요? <span class="asterisk" aria-label="필수">*</span></legend>
          <div class="options">
            <label><input type="radio" name="concern" value="destination" required aria-describedby="concern-error">어떤 사이트로 연결되는지 알 수 없어요</label>
            <label><input type="radio" name="concern" value="data" required aria-describedby="concern-error">개인정보가 유출될까 걱정돼요</label>
            <label><input type="radio" name="concern" value="fake" required aria-describedby="concern-error">가짜 로그인·결제 화면을 구분하기 어려워요</label>
            <label><input type="radio" name="concern" value="none" required aria-describedby="concern-error">특별히 걱정되는 점은 없어요</label>
          </div>
          <p class="error" id="concern-error" hidden>가장 걱정되는 점을 하나 선택해 주세요.</p>
        </fieldset>

        <fieldset data-question="features" aria-describedby="features-hint features-error">
          <legend><span class="number">3.</span> 가장 도움이 될 기능을 선택해 주세요. <span class="asterisk" aria-label="필수">*</span></legend>
          <p class="hint" id="features-hint">하나 이상 선택해 주세요. 중복 선택이 가능합니다.</p>
          <div class="options">
            <label><input type="checkbox" name="features" value="address" aria-describedby="features-hint features-error">접속 전에 실제 사이트 주소 확인하기</label>
            <label><input type="checkbox" name="features" value="preview" aria-describedby="features-hint features-error">사이트를 열지 않고 화면 미리보기</label>
            <label><input type="checkbox" name="features" value="reasons" aria-describedby="features-hint features-error">의심되는 이유를 쉬운 말로 안내받기</label>
          </div>
          <p class="error" id="features-error" hidden>도움이 될 기능을 하나 이상 선택해 주세요.</p>
        </fieldset>

        <p id="form-status" class="sr-only" role="status"></p>
        <div class="actions">
          <button class="button secondary" type="button" id="cancel">처음으로</button>
          <button class="button primary" type="submit">설문 제출하기</button>
        </div>
        <p class="local-note">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="5" y="9" width="10" height="8" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" stroke-width="1.5"/></svg>
          모의 설문입니다. 응답은 저장되거나 전송되지 않습니다.
        </p>
      </form>
    `;
  }

  connectedCallback() {
    this.controller?.abort();
    this.controller = new AbortController();
    const options = { signal: this.controller.signal };
    const form = this.shadowRoot.querySelector('form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const questions = [...this.shadowRoot.querySelectorAll('fieldset')];
      let firstInvalid = null;
      questions.forEach((question) => {
        if (!this.validateQuestion(question)) firstInvalid ??= question;
      });
      if (firstInvalid) {
        this.shadowRoot.querySelector('#form-status').textContent = '응답하지 않은 필수 문항을 확인해 주세요.';
        firstInvalid.querySelector('input').focus();
        return;
      }
      this.dispatchEvent(new CustomEvent('demo-survey-submit', { bubbles: true, composed: true }));
    }, options);

    form.addEventListener('change', (event) => {
      const question = event.target.closest('fieldset');
      if (!question) return;
      if (question.getAttribute('aria-invalid') === 'true') this.validateQuestion(question);
      const answered = [...this.shadowRoot.querySelectorAll('fieldset')]
        .filter((item) => item.querySelector('input:checked')).length;
      this.shadowRoot.querySelector('progress').value = answered;
      this.shadowRoot.querySelector('#progress-text').textContent = `${answered} / 3`;
      this.shadowRoot.querySelector('#form-status').textContent = '';
    }, options);

    this.shadowRoot.querySelector('#cancel').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('demo-survey-cancel', { bubbles: true, composed: true }));
    }, options);
  }

  disconnectedCallback() {
    this.controller?.abort();
  }

  validateQuestion(question) {
    const valid = Boolean(question.querySelector('input:checked'));
    question.setAttribute('aria-invalid', String(!valid));
    question.querySelector('.error').hidden = valid;
    question.querySelectorAll('input').forEach((input) => input.setAttribute('aria-invalid', String(!valid)));
    return valid;
  }

  focusHeading() {
    this.shadowRoot.querySelector('h1').focus({ preventScroll: true });
  }
}

customElements.define('demo-survey-form', DemoSurveyForm);
