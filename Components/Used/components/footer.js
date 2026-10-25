class ThaiFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        :host {
          display: block;
          background: #0b1020;
          color: #a9b2c7;
          font-family: 'DM Sans', sans-serif;
        }

        * { box-sizing: border-box; }

        footer {
          padding: 30px 8%;
          border-top: 1px solid rgba(255,255,255,.07);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          font-size: 12px;
        }

        p { margin: 0; }

        .gold { color: #edc77a; }

        @media (max-width: 600px) {
          footer {
            flex-direction: column;
            align-items: flex-start;
            padding: 25px 6%;
          }
        }
      </style>

      <footer>
        <p>Made with <span class="gold">♥</span> for Thai language learners.</p>
        <p>© 2026 ThaiBloom · Learn a little, grow a lot.</p>
      </footer>
    `;
  }
}

if (!customElements.get("thai-footer")) {
  customElements.define("thai-footer", ThaiFooter);
}
