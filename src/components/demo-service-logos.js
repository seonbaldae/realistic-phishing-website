import { sharedStyles } from '../styles/shared-styles.js';
import { serviceLogos } from '../data/brand-assets.js';

export class DemoServiceLogos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${sharedStyles}
        :host { margin-top: 25px; }
        h2 { color: #78867c; font-size: 11px; font-weight: 600; margin-bottom: 13px; }
        ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; }
        li { display: flex; flex-direction: column; align-items: center; gap: 9px; padding: 15px 5px 12px; border: 1px solid #eaf0ec; border-radius: 8px; background: #fbfdfb; }
        img { display: block; width: 38px; height: 38px; object-fit: contain; }
        span { color: #617468; font-size: 11px; line-height: 1.4; text-align: center; word-break: keep-all; }
        :host([compact]) { margin-top: 24px; }
        :host([compact]) h2 { text-align: center; font-size: 10px; color: #8d9890; }
        :host([compact]) ul { max-width: 340px; margin: auto; }
        :host([compact]) li { padding: 8px 3px; border: 0; background: transparent; gap: 7px; }
        :host([compact]) img { width: 31px; height: 31px; }
        :host([compact]) span { font-size: 10px; }
        @media(max-width: 400px) { ul { gap: 6px; } img { width: 32px; height: 32px; } span { font-size: 10px; } li { padding: 12px 3px; } }
      </style>
      <section aria-label="네이버 서비스 로고">
        <h2>일상에서 만나는 네이버 서비스</h2>
        <ul></ul>
      </section>`;
    const list = this.shadowRoot.querySelector('ul');
    for (const service of serviceLogos) {
      const item = document.createElement('li');
      const image = document.createElement('img');
      image.src = service.src;
      image.alt = service.name;
      image.width = 64;
      image.height = 64;
      const label = document.createElement('span');
      label.textContent = service.name;
      label.setAttribute('aria-hidden', 'true');
      item.append(image, label);
      list.append(item);
    }
  }
}
customElements.define('demo-service-logos', DemoServiceLogos);
