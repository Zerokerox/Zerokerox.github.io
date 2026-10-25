class ThaiLessons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.shadowRoot.children.length > 0) return;

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

        *, *::before, *::after {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .lessons {
          max-width: 1440px;
          margin: auto;
          padding: 75px 8% 100px;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 45px;
        }

        .section-label {
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

        .heading-description {
          max-width: 550px;
          margin: auto;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .lesson-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .lesson-card {
          position: relative;
          overflow: hidden;
          padding: 30px;
          border: 1px solid rgba(255,255,255,.09);
          background: linear-gradient(
            145deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.015)
          );
          border-radius: 20px;
          transition:
            transform .35s ease,
            border-color .35s ease,
            background .35s ease;
        }

        .lesson-card::before {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          right: -80px;
          top: -80px;
          border-radius: 50%;
          background: var(--gold);
          opacity: .06;
          filter: blur(35px);
          pointer-events: none;
        }

        .lesson-card:hover {
          transform: translateY(-8px);
          border-color: rgba(237,199,122,.45);
          background: linear-gradient(
            145deg,
            rgba(237,199,122,.09),
            rgba(255,255,255,.02)
          );
        }

        .lesson-number {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .lesson-number span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 2px;
        }

        .lesson-icon {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border-radius: 15px;
          background: rgba(237,199,122,.09);
          border: 1px solid rgba(237,199,122,.18);
          color: var(--gold);
          font-size: 23px;
        }

        h3 {
          font-family: 'Playfair Display', serif;
          font-size: 23px;
          line-height: 1.4;
          margin: 0 0 12px;
        }

        .lesson-description {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
          margin: 0 0 25px;
        }

        .lesson-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-size: 13px;
          font-weight: 600;
          transition: gap .25s ease;
        }

        .lesson-link:hover {
          gap: 16px;
        }

        .lesson-link span {
          font-size: 18px;
        }

        @media (max-width: 950px) {
          .lesson-grid {
            grid-template-columns: 1fr;
          }

          .lesson-card {
            padding: 28px;
          }
        }

        @media (max-width: 600px) {
          .lessons {
            padding: 60px 6% 70px;
          }

          .section-heading {
            margin-bottom: 30px;
          }

          .lesson-card {
            padding: 24px;
          }

          h3 {
            font-size: 21px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      </style>

      <section class="lessons" id="lessons">
        <div class="section-heading">
          <span class="section-label">YOUR LEARNING PATH</span>

          <h2>
            Explore Your Next<br>
            <span style="color:#edc77a">Thai Adventure</span>
          </h2>

          <p class="heading-description">
            Learn step by step, discover Thai culture, and build
            confidence with lessons designed for your journey.
          </p>
        </div>

        <div class="lesson-grid">
          <article class="lesson-card">
            <div class="lesson-number">
              <span>01 · BEGINNER</span>
              <div class="lesson-icon">ก</div>
            </div>

            <h3>Thai Alphabet & Basics</h3>

            <p class="lesson-description">
              Start learning Thai characters, pronunciation,
              greetings, and your first everyday words.
            </p>

            <a class="lesson-link" href="characters.html">
              Explore characters <span>→</span>
            </a>
          </article>

          <article class="lesson-card">
            <div class="lesson-number">
              <span>02 · CULTURE</span>
              <div class="lesson-icon">✿</div>
            </div>

            <h3>Discover Thai Culture</h3>

            <p class="lesson-description">
              Explore Thai traditions, useful expressions,
              and the cultural meaning behind the language.
            </p>

            <a class="lesson-link" href="culture.html">
              Discover culture <span>→</span>
            </a>
          </article>

          <article class="lesson-card">
            <div class="lesson-number">
              <span>03 · PRACTICE</span>
              <div class="lesson-icon">✎</div>
            </div>

            <h3>Practice Your Thai</h3>

            <p class="lesson-description">
              Review what you've learned and practice useful
              Thai words and phrases at your own pace.
            </p>

            <a class="lesson-link" href="lessons.html">
              Start practicing <span>→</span>
            </a>
          </article>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("thai-lessons")) {
  customElements.define("thai-lessons", ThaiLessons);
}
