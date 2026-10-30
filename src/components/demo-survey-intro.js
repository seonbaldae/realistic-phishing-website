import { sharedStyles } from '../styles/shared-styles.js';
import { survey } from '../data/survey.js';

export class DemoSurveyIntro extends HTMLElement {
  #controller;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${sharedStyles}
        .sheet { border: 1px solid #e1e7e2; border-radius: var(--radius); overflow: hidden; background: white; box-shadow: 0 4px 22px #1f513905; }
        .cover { position: relative; height: 240px; display: flex; align-items: center; padding: 36px 44px; overflow: hidden; background: #e6f5e9; }
        .cover::before { content: ''; position: absolute; width: 350px; height: 350px; border: 1px solid #b6dec5; border-radius: 50%; right: -76px; bottom: -185px; }
        .cover::after { content: ''; position: absolute; width: 430px; height: 430px; border: 1px solid #c9e6d2; border-radius: 50%; right: -117px; bottom: -225px; }
        .cover-copy { z-index: 1; } .edition { display: flex; align-items: center; gap: 7px; font-size: 10px; letter-spacing: .14em; font-weight: 700; color: #4d8062; margin-bottom: 17px; }
        .edition::before { content: ''; display: block; width: 15px; height: 1px; background: #63896d; }
        .cover h2 { font-size: 34px; line-height: 1.4; letter-spacing: -1.3px; font-weight: 750; color: #1b5938; }
        .cover-copy > p { font-size: 12px; margin-top: 14px; color: #61836c; }
        .illustration { position: absolute; right: 37px; width: 265px; height: 218px; z-index: 1; bottom: 0; }
        .body { padding: 34px 42px 30px; }
        .status { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; font-size: 11px; font-weight: 700; line-height: 1.6; color: #008c3c; background: #edf9f0; border-radius: 4px; margin-bottom: 12px; }
        .status::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: currentColor; }
        h1 { font-size: 27px; font-weight: 750; line-height: 1.45; letter-spacing: -1px; }
        .description { margin-top: 17px; font-size: 14px; line-height: 1.9; color: #6d756f; white-space: pre-line; word-break: keep-all; }
        .metadata { margin: 27px 0 0; padding: 23px 0 0; border-top: 1px solid var(--line); display: grid; grid-template-columns: 1.65fr 1fr 1fr; gap: 16px; }
        .meta-label { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #929993; }
        .metadata dd { font-size: 12px; margin: 6px 0 0; font-weight: 500; color: #505b53; }
        .participate { border-top: 1px solid var(--line); padding: 25px 42px; display: flex; align-items: center; justify-content: space-between; gap: 22px; background: #fdfefd; }
        .participate h3 { font-size: 13px; font-weight: 600; } .participate p { font-size: 11px; color: #889089; margin-top: 4px; }
        .primary { min-width: 225px; min-height: 51px; justify-content: space-between; padding-left: 24px; padding-right: 21px; font-size: 14px; }
        .guide { display: flex; align-items: center; justify-content: center; gap: 29px; margin: 27px 0 25px; color: #7d877f; }
        .step { display: flex; align-items: center; gap: 8px; font-size: 11px; }
        .number { display: inline-flex; align-items: center; justify-content: center; border: 1px solid #dbe3dd; border-radius: 50%; width: 20px; height: 20px; font-size: 10px; color: #829286; }
        .chevron { color: #c6cec8; font-size: 13px; }
        .privacy { display: flex; align-items: flex-start; gap: 11px; padding: 19px 22px; background: #edf1ee; border-radius: 10px; color: #7b877e; }
        .privacy svg { margin-top: 3px; } .privacy p { font-size: 11px; line-height: 1.8; } .privacy strong { font-weight: 600; color: #647269; }
        @media(max-width: 680px) {
          .cover { height: 200px; padding: 28px; } .cover h2 { font-size: 28px; } .cover-copy > p { font-size: 11px; }
          .illustration { width: 210px; right: 4px; bottom: -15px; } .cover-copy { max-width: 65%; }
          .body { padding: 28px; } h1 { font-size: 23px; } .description { font-size: 13px; }
          .participate { padding: 23px 28px; } .primary { min-width: 195px; }
          .metadata { grid-template-columns: 1fr 1fr; } .metadata > div:first-child { grid-column: 1 / -1; }
        }
        @media(max-width: 460px) {
          .cover { height: 185px; padding: 25px; } .cover h2 { font-size: 25px; } .edition { font-size: 8px; letter-spacing: .08em; }
          .illustration { width: 174px; right: -14px; bottom: -32px; } .cover-copy > p { max-width: 145px; font-size: 10px; }
          .body { padding: 25px 23px; } h1 { font-size: 22px; } .participate { padding: 22px 23px; flex-direction: column; align-items: stretch; gap: 17px; }
          .primary { width: 100%; } .guide { gap: 10px; margin: 23px 0; } .step { gap: 5px; font-size: 10px; } .number { width: 18px; height: 18px; }
          .privacy { padding: 16px; } .privacy p { font-size: 10px; }
        }
      </style>
      <article class="sheet" aria-labelledby="survey-title">
        <div class="cover">
          <div class="cover-copy"><div class="edition">YOUR EVERYDAY, A LITTLE BETTER</div><h2>당신의 일상을<br>듣고 싶어요.</h2><p>작은 의견이 만드는 더 나은 내일</p></div>
          <svg class="illustration" viewBox="0 0 280 230" fill="none" aria-hidden="true">
            <ellipse cx="157" cy="221" rx="100" ry="9" fill="#d4e9d9"/>
            <path d="M234 69v14m-7-7h14M42 113v10m-5-5h10" stroke="#86b698" stroke-width="2" stroke-linecap="round"/>
            <circle cx="204" cy="34" r="4" fill="#b3d9bf"/><circle cx="38" cy="171" r="3" fill="#9fcaaa"/>
            <rect x="69" y="40" width="133" height="171" rx="12" fill="#a2d4b3" transform="rotate(-11 69 40)"/>
            <rect x="83" y="32" width="133" height="171" rx="10" fill="white" transform="rotate(8 83 32)"/>
            <g transform="rotate(8 83 32)"><rect x="99" y="54" width="48" height="7" rx="3" fill="#3ca667"/><rect x="99" y="69" width="80" height="4" rx="2" fill="#e8eeea"/>
            <rect x="99" y="94" width="15" height="15" rx="4" fill="#e8f5ec"/><path d="m103 101 3 3 5-6" stroke="#49a96e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="124" y="99" width="61" height="4" rx="2" fill="#ccdcd1"/>
            <rect x="99" y="123" width="15" height="15" rx="4" fill="#e8f5ec"/><path d="m103 130 3 3 5-6" stroke="#49a96e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="124" y="128" width="48" height="4" rx="2" fill="#ccdcd1"/>
            <rect x="99" y="152" width="15" height="15" rx="4" fill="#f3f6f4"/><rect x="124" y="157" width="57" height="4" rx="2" fill="#e4ece7"/></g>
            <g transform="rotate(27 204 153)"><rect x="199" y="107" width="13" height="91" rx="3" fill="#258653"/><path d="m199 195 6.5 18 6.5-18" fill="#f3d6a6"/><path d="m203 206 2.5 7 2.5-7" fill="#34634a"/><rect x="199" y="107" width="13" height="12" rx="3" fill="#80b996"/></g>
            <circle cx="220" cy="50" r="21" fill="#2b9b5b"/><path d="m210 50 7 7 13-14" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="body">
          <span class="status">참여 가능 · 모의 설문</span>
          <h1 id="survey-title" tabindex="-1"></h1>
          <p class="description"></p>
          <dl class="metadata">
            <div><dt class="meta-label"><svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor"/><path d="M5 1v4m6-4v4M2 7h12" stroke="currentColor"/></svg>참여 기간</dt><dd class="period"></dd></div>
            <div><dt class="meta-label"><svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor"/><path d="M8 4v4l3 2" stroke="currentColor"/></svg>예상 소요 시간</dt><dd class="duration"></dd></div>
            <div><dt class="meta-label"><svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor"/><path d="M6 6h4M6 9h4" stroke="currentColor"/></svg>설문 문항</dt><dd class="count"></dd></div>
          </dl>
        </div>
        <div class="participate"><div><h3>여러분의 이야기를 들려주세요.</h3><p>설문 참여 전 로그인이 필요합니다.</p></div><button class="button primary" type="button">설문 참여하기<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
      </article>
      <div class="guide" aria-label="설문 참여 순서"><span class="step"><span class="number">1</span>모의 로그인</span><span class="chevron" aria-hidden="true">›</span><span class="step"><span class="number">2</span>설문 작성</span><span class="chevron" aria-hidden="true">›</span><span class="step"><span class="number">3</span>참여 완료</span></div>
      <aside class="privacy"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true"><path d="M8 1 14 3.5v5c0 4-6 7.5-6 7.5S2 12.5 2 8.5v-5L8 1Z" stroke="currentColor" stroke-width="1.2"/><path d="m5 8.5 2 2 4-4" stroke="currentColor" stroke-width="1.2"/></svg><p><strong>안심하고 체험하는 모의 설문</strong><br>실제 계정 인증 없이 가상 계정으로 진행하며, 응답은 저장되거나 전송되지 않습니다.</p></aside>`;
    this.shadowRoot.querySelector('h1').textContent = survey.title;
    this.shadowRoot.querySelector('.description').textContent = survey.description;
    this.shadowRoot.querySelector('.period').textContent = survey.period;
    this.shadowRoot.querySelector('.duration').textContent = survey.duration;
    this.shadowRoot.querySelector('.count').textContent = survey.questionCount;
  }
  connectedCallback() {
    this.#controller?.abort();
    this.#controller = new AbortController();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('demo-participate', { bubbles: true, composed: true }));
    }, { signal: this.#controller.signal });
  }
  disconnectedCallback() { this.#controller?.abort(); }
  focusHeading() { this.shadowRoot.querySelector('h1').focus(); }
}
customElements.define('demo-survey-intro', DemoSurveyIntro);
