import "./lesson1.js";

class ThaiLessons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.shadowRoot.children.length) return;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

        :host {
          display: block;
          background: #0b1020;
          color: #f8f7f4;
          font-family: 'DM Sans', sans-serif;
          --gold: #edc77a;
          --muted: #a9b2c7;
        }

        * { box-sizing: border-box; }

        .section {
          max-width: 1440px;
          margin: auto;
          padding: 75px 8% 100px;
        }

        .heading {
          text-align: center;
          margin-bottom: 45px;
        }

        .label {
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 3px;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.3;
          margin: 18px 0;
        }

        .description {
          max-width: 550px;
          margin: auto;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        @media (max-width: 950px) {
          .grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .section { padding: 60px 6% 70px; }
        }
      </style>

      <section class="section" id="lessons">
        <div class="heading">
          <span class="label">YOUR LEARNING PATH</span>
          <h2>
            Explore Your Next<br>
            <span style="color:#edc77a">Thai Adventure</span>
          </h2>
          <p class="description">
            Learn step by step, discover Thai culture, and build
            confidence with lessons designed for your journey.
          </p>
        </div>

        <div class="grid">
          <!-- ADD OR REMOVE SUB-LESSONS HERE -->
          <thai-lesson-1></thai-lesson-1>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("thai-lessons")) {
  customElements.define("thai-lessons", ThaiLessons);
}
