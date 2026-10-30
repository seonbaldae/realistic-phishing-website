import { sharedStyles } from '../styles/shared-styles.js';

export class DemoLoginForm extends HTMLElement {
  #controller;
  #timer;
  #loading = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${sharedStyles}
        :host { display: block; width: min(100%, 460px); margin: 0 auto; }
        .back { display: inline-flex; align-items: center; gap: 7px; border: 0; background: transparent;
          padding: 0 0 22px; color: #67746c; font-size: 13px; cursor: pointer; }
        .back:hover { color: #172d22; }
        .card { overflow: hidden; border: 1px solid #e0e6e1; border-radius: 14px; background: #fff;
          box-shadow: 0 6px 24px #183b2205; }
        .brand { display: flex; justify-content: center; margin: 39px 0 31px; }
        .brand img { display: block; width: 155px; height: auto; }
        .tab { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 0 30px;
          padding: 16px 0; border: 1px solid #dce4df; border-bottom: 2px solid #03c75a;
          border-radius: 8px 8px 0 0; color: #193b27; font-size: 14px; font-weight: 700; }
        .content { padding: 29px 30px 30px; }
        h1 { margin: 0 0 10px; font-size: 22px; letter-spacing: -1px; line-height: 1.45; }
        .description { margin: 0 0 23px; color: #758078; font-size: 13px; line-height: 1.8; word-break: keep-all; }
        .demo-note { padding: 13px 14px; margin: 0 0 20px; border: 1px solid #d9eee0;
          border-radius: 7px; background: #f2faf5; color: #3b7650; font-size: 12px; line-height: 1.7; }
        .demo-note strong { display: block; margin-bottom: 2px; font-weight: 700; }
        .fields { border: 1px solid #dce1dd; border-radius: 7px; overflow: hidden; }
        .field { display: flex; align-items: center; gap: 11px; min-height: 57px; padding: 0 15px; }
        .field + .field { border-top: 1px solid #e5e9e6; }
        .field:focus-within { box-shadow: inset 0 0 0 2px #03b753; }
        .field > svg { flex: 0 0 auto; color: #9aa69e; }
        input { width: 100%; min-width: 0; border: 0; outline: none; padding: 14px 0; background: transparent;
          color: #46574c; font: inherit; font-size: 15px; }
        .show { display: grid; place-items: center; flex: 0 0 auto; width: 30px; height: 32px;
          border: 0; border-radius: 4px; background: transparent; color: #8b978f; cursor: pointer; }
        .show:hover { color: #294b35; background: #f5f8f6; }
        .account-caption { margin: 10px 0 25px; color: #919a94; font-size: 11px; }
        .submit { width: 100%; min-height: 51px; border-radius: 7px; font-size: 15px; }
        .status { min-height: 18px; margin: 12px 0 0; color: #5d7766; font-size: 12px; text-align: center; }
        .bottom { display: flex; align-items: center; justify-content: center; gap: 7px;
          border-top: 1px solid #edf0ed; padding: 17px 14px; color: #87928a; font-size: 11px; }
        .page-note { padding: 20px 10px 0; margin: 0; color: #8d978f; font-size: 11px;
          line-height: 1.8; text-align: center; word-break: keep-all; }
        @media (max-width: 460px) { .content { padding: 25px 22px 22px; } .tab { margin: 0 22px; }
          .brand { margin-top: 33px; } .brand img { width: 145px; } h1 { font-size: 21px; } }
      </style>
      <button class="back" type="button"><span aria-hidden="true">←</span> 설문으로 돌아가기</button>
      <section class="card" aria-labelledby="login-title">
        <div class="brand"><img src="./assets/naver-logo.svg" alt="NAVER" width="2315" height="444"></div>
        <div class="tab">
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="10" r="2.5"/><path d="M7 18c0-5 10-5 10 0"/></svg>
          ID 로그인
        </div>
        <div class="content">
          <h1 id="login-title" tabindex="-1">로그인 세션이 만료되었어요</h1>
          <p class="description">설문에 계속 참여하려면 다시 로그인해 주세요.<br>작성 중인 화면으로 돌아갈 수 있습니다.</p>
          <p class="demo-note"><strong>해커톤 보안 훈련용 모의 로그인</strong>실제 계정 정보를 입력하지 마세요.<br>아래 가상 계정으로 로그인 과정을 체험합니다.</p>
          <form autocomplete="off">
            <div class="fields">
              <div class="field">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg>
                <label class="sr-only" for="demo-account">가상 계정 아이디 (변경 불가)</label>
                <input id="demo-account" name="demo-account" type="text" value="demo_user" readonly autocomplete="off" spellcheck="false" autocapitalize="none" aria-describedby="account-caption">
              </div>
              <div class="field">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/><path d="M12 14v3"/></svg>
                <label class="sr-only" for="demo-password">가상 계정 비밀번호 (변경 불가)</label>
                <input id="demo-password" name="demo-password" type="password" value="demo-only" readonly autocomplete="new-password" aria-describedby="account-caption">
                <button class="show" type="button" aria-label="가상 비밀번호 표시" aria-pressed="false">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>
                </button>
              </div>
            </div>
            <p class="account-caption" id="account-caption">시연용으로 준비된 가상 계정입니다. 입력하거나 수정할 필요가 없습니다.</p>
            <button class="button primary submit" type="submit">모의 계정으로 로그인</button>
            <p class="status" role="status" aria-live="polite"></p>
          </form>
        </div>
        <div class="bottom"><svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Z"/><path d="m8 11 3 3 5-5"/></svg> 실제 인증 · 정보 저장 · 외부 전송 없음</div>
      </section>
      <p class="page-note">이 화면은 네이버가 운영하는 로그인 페이지가 아닙니다.<br>QR 피싱 예방 서비스의 시연을 위해 제작되었습니다.</p>
    `;
  }

  connectedCallback() {
    this.#controller?.abort();
    this.#controller = new AbortController();
    const { signal } = this.#controller;
    this.shadowRoot.querySelector('form').addEventListener('submit', (event) => this.#submit(event), { signal });
    this.shadowRoot.querySelector('.back').addEventListener('click', () => {
      clearTimeout(this.#timer);
      this.#resetLoading();
      this.dispatchEvent(new CustomEvent('demo-login-cancel', { bubbles: true, composed: true }));
    }, { signal });
    this.shadowRoot.querySelector('.show').addEventListener('click', (event) => {
      const button = event.currentTarget;
      const isVisible = button.getAttribute('aria-pressed') === 'true';
      this.shadowRoot.querySelector('#demo-password').type = isVisible ? 'password' : 'text';
      button.setAttribute('aria-pressed', String(!isVisible));
      button.setAttribute('aria-label', isVisible ? '가상 비밀번호 표시' : '가상 비밀번호 숨기기');
    }, { signal });
  }

  disconnectedCallback() {
    this.#controller?.abort();
    clearTimeout(this.#timer);
    this.#resetLoading();
  }

  focusHeading() {
    this.shadowRoot.querySelector('h1').focus();
  }

  #submit(event) {
    event.preventDefault();
    if (this.#loading) return;
    this.#loading = true;
    const button = this.shadowRoot.querySelector('.submit');
    button.disabled = true;
    button.textContent = '모의 로그인 중…';
    this.shadowRoot.querySelector('form').setAttribute('aria-busy', 'true');
    this.shadowRoot.querySelector('.status').textContent = '가상 계정으로 시연을 계속합니다.';
    // No credentials are read: this delay only demonstrates the local UI state.
    this.#timer = setTimeout(() => {
      this.#resetLoading();
      if (this.isConnected) this.dispatchEvent(new CustomEvent('demo-login', { bubbles: true, composed: true }));
    }, 500);
  }

  #resetLoading() {
    this.#loading = false;
    const button = this.shadowRoot.querySelector('.submit');
    button.disabled = false;
    button.textContent = '모의 계정으로 로그인';
    this.shadowRoot.querySelector('form').removeAttribute('aria-busy');
    this.shadowRoot.querySelector('.status').textContent = '';
  }
}

customElements.define('demo-login-form', DemoLoginForm);
