class ThaiIntro extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

        :host {
          display: block;
          background: #0b1020;
          color: #f8f7f4;
          font-family: 'DM Sans', sans-serif;
        }

        * { box-sizing: border-box; }

        section {
          padding: 90px 20px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.015);
        }

        .label {
          color: #edc77a;
          font-size: 11px;
          letter-spacing: 3px;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px,4vw,48px);
          line-height: 1.4;
          margin: 20px 0;
        }

        .gradient {
          background: linear-gradient(110deg,#fff2ce,#e7b75d,#d6a8ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        p {
          color: #a9b2c7;
          max-width: 580px;
          margin: auto;
          line-height: 1.9;
        }

        @media (max-width: 600px) {
          section { padding: 70px 7%; }
        }
      </style>

      <section id="about">
        <span class="label">A NEW BEGINNING</span>

        <h2>
          More than a language.<br>
          <span class="gradient">A beautiful experience.</span>
        </h2>

        <p>
          From your first Thai greeting to everyday conversations,
          this is your space to learn, explore, and grow with confidence.
        </p>
      </section>
    `;
  }
}

if (!customElements.get("thai-intro")) {
  customElements.define("thai-intro", ThaiIntro);
}
