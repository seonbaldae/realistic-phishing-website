export const sharedStyles = `
  :host { display: block; font-family: var(--font, sans-serif); color: var(--ink, #202724); line-height: 1.6; }
  :host([hidden]), [hidden] { display: none !important; }
  *, *::before, *::after { box-sizing: border-box; }
  h1, h2, h3, p { margin: 0; }
  h1, h2, h3 { word-break: keep-all; overflow-wrap: break-word; }
  button, input, textarea, select { font: inherit; }
  button { -webkit-tap-highlight-color: transparent; }
  button:not(:disabled), label { cursor: pointer; }
  button:disabled { cursor: wait; opacity: .65; }
  button, input, a { outline-offset: 4px; }
  :focus-visible { outline: 3px solid #167a44; outline-offset: 4px; }
  [tabindex="-1"]:focus { outline: none; }
  .button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 50px; padding: 12px 24px; border: 1px solid transparent; border-radius: 8px; font-size: 15px; font-weight: 700; line-height: 1.5; text-decoration: none; transition: background .15s ease, border-color .15s ease; }
  .primary { color: #fff; background: var(--green, #03a94d); }
  .primary:hover:not(:disabled) { background: var(--green-dark, #008f40); }
  .secondary { color: #4b5550; border-color: #dce2de; background: #fff; }
  .secondary:hover:not(:disabled) { background: #f4f7f5; }
  .ghost { color: #657169; background: transparent; }
  .ghost:hover:not(:disabled) { background: #eef3ef; }
  .eyebrow { font-size: 12px; font-weight: 700; color: var(--green-dark, #008f40); letter-spacing: .06em; }
  .field-error { color: #c03838; font-size: 13px; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
  svg { flex-shrink: 0; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
`;
