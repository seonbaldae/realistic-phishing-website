import { sharedStyles } from '../styles/shared-styles.js';

export class DemoHeader extends HTMLElement {
  #controller;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${sharedStyles}
        :host { background: white; border-bottom: 1px solid var(--line); }
        header { max-width: 1120px; height: 76px; margin: auto; padding: 0 36px; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: inline-flex; align-items: center; gap: 7px; border: 0; padding: 3px 0; background: none; color: #03c75a; }
        .naver { display: block; width: 98px; height: auto; }
        .form-icon { display: block; width: 28px; height: 28px; margin-right: 2px; }
        .form { font-size: 24px; font-weight: 800; line-height: 1; }
        .context { display: flex; gap: 24px; align-items: center; font-size: 12px; color: #858d88; }
        .tag { border: 1px solid #dfe7e1; border-radius: 20px; padding: 4px 12px; color: #64786c; font-size: 11px; }
        @media(max-width: 600px) { header { height: 64px; padding: 0 22px; } .context > span:first-child { display: none; } .naver { width: 91px; } .form { font-size: 23px; } }
      </style>
      <header>
        <button class="brand" type="button" aria-label="네이버 폼 모의 설문 처음으로"><img class="form-icon" src="./assets/naver-form-icon.svg" alt="네이버 폼" width="32" height="32"><img class="naver" src="./assets/naver-logo.svg" alt="NAVER" width="2315" height="444"><span class="form">폼</span></button>
        <div class="context"><span>마음을 모으는 가장 쉬운 방법</span><span class="tag">모의 설문</span></div>
      </header>`;
  }
  connectedCallback() {
    this.#controller?.abort();
    this.#controller = new AbortController();
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('demo-restart', { bubbles: true, composed: true }));
    }, { signal: this.#controller.signal });
  }
  disconnectedCallback() { this.#controller?.abort(); }
}
customElements.define('demo-header', DemoHeader);
