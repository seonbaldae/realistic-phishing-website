import { sharedStyles } from '../styles/shared-styles.js';

const views = Object.freeze({ intro: 'demo-survey-intro', login: 'demo-login-form', survey: 'demo-survey-form', complete: 'demo-completion' });

export class DemoApp extends HTMLElement {
  #controller;
  #view = 'intro';
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${sharedStyles}
        :host { min-height: 100vh; display: flex; flex-direction: column; }
        .skip { position: absolute; left: 16px; top: -80px; z-index: 5; padding: 10px 18px; background: white; color: var(--green-dark); border: 1px solid var(--green); border-radius: 6px; }
        .skip:focus { top: 12px; }
        main { flex: 1; width: min(100% - 48px, 780px); margin: 33px auto 0; }
        .breadcrumb { display: flex; align-items: center; gap: 10px; margin: 0 0 17px 2px; font-size: 11px; color: #8b948e; }
        .breadcrumb svg { color: #9ba49d; } .breadcrumb span:last-child { color: #58655c; }
        .footer { width: min(100% - 40px, 780px); margin: 28px auto 30px; text-align: center; color: #a1a8a2; font-size: 10px; }
        .footer p { margin-bottom: 13px; line-height: 1.8; } .footer strong { font-family: Arial, sans-serif; font-size: 13px; font-weight: 900; letter-spacing: -.6px; color: #8f9c93; } .footer .form { font-size: 13px; font-weight: 700; margin-left: 3px; }
        @media(max-width: 600px) { main { width: calc(100% - 32px); margin-top: 23px; } .breadcrumb { margin-bottom: 14px; } .footer { margin-top: 25px; } }
      </style>
      <button type="button" class="skip">본문으로 건너뛰기</button>
      <demo-training-notice></demo-training-notice>
      <demo-header></demo-header>
      <main id="main" tabindex="-1"><nav class="breadcrumb" aria-label="현재 위치"><span>네이버 폼</span><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="m3.5 2 3 3-3 3" stroke="currentColor"/></svg><span id="location">설문 참여</span></nav><div id="view"></div></main>
      <footer class="footer"><p>본 페이지는 해커톤 시연을 위한 가상 설문이며, 네이버에서 운영하는 서비스가 아닙니다.</p><strong>NAVER</strong><span class="form">폼</span><span> · 보안 훈련 데모</span></footer>
      <demo-session-notice></demo-session-notice>`;
  }
  connectedCallback() {
    this.#controller?.abort();
    this.#controller = new AbortController();
    const options = { signal: this.#controller.signal };
    this.addEventListener('demo-participate', () => { if (this.#view === 'intro') this.shadowRoot.querySelector('demo-session-notice').open(); }, options);
    this.addEventListener('demo-session-login', () => this.#navigate('login'), options);
    this.addEventListener('demo-login', () => { if (this.#view === 'login') this.#navigate('survey'); }, options);
    this.addEventListener('demo-login-cancel', () => this.#navigate('intro'), options);
    this.addEventListener('demo-survey-cancel', () => this.#navigate('intro'), options);
    this.addEventListener('demo-survey-submit', () => { if (this.#view === 'survey') this.#navigate('complete'); }, options);
    this.addEventListener('demo-restart', () => this.#navigate('intro'), options);
    this.shadowRoot.querySelector('.skip').addEventListener('click', () => this.shadowRoot.querySelector('#main').focus(), options);
    this.#navigate('intro', false);
  }
  disconnectedCallback() { this.#controller?.abort(); }
  #navigate(view, focus = true) {
    this.#view = view;
    const component = document.createElement(views[view]);
    this.shadowRoot.querySelector('#view').replaceChildren(component);
    this.shadowRoot.querySelector('#location').textContent = { intro: '설문 참여', login: '모의 로그인', survey: '설문 작성', complete: '참여 완료' }[view];
    document.title = { intro: '디지털 일상 설문 : 모의 네이버 폼', login: '모의 로그인 : 보안 훈련', survey: '설문 작성 : 모의 네이버 폼', complete: '참여 완료 : 모의 네이버 폼' }[view];
    if (focus) { window.scrollTo({ top: 0, behavior: 'instant' }); component.focusHeading(); }
  }
}
customElements.define('demo-app', DemoApp);
