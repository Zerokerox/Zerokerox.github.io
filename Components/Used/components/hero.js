class ThaiHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

        :host {
          display: block;
          background: #0b1020;
          color: #f8f7f4;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          isolation: isolate;
        }

        * { box-sizing: border-box; }

        .hero {
          max-width: 1440px;
          min-height: 680px;
          padding: 90px 8% 100px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          align-items: center;
          gap: 70px;
        }

        .eyebrow {
          display: inline-block;
          padding: 10px 15px;
          border: 1px solid rgba(237,199,122,.23);
          border-radius: 30px;
          color: #edc77a;
          font-size: 10px;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 1.14;
          letter-spacing: -2px;
          margin: 0;
        }

        .gradient-text {
          background: linear-gradient(110deg,#fff2ce,#e7b75d,#d6a8ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .description {
          color: #a9b2c7;
          max-width: 510px;
          line-height: 1.9;
          margin: 25px 0 32px;
          font-size: 15px;
        }

        .actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        a {
          text-decoration: none;
          display: inline-flex;
          padding: 15px 22px;
          border-radius: 12px;
          font-size: 14px;
          transition: .3s;
        }

        .primary {
          background: linear-gradient(110deg,#f4d99d,#dca95c);
          color: #181727;
          font-weight: 700;
        }

        .secondary {
          border: 1px solid rgba(255,255,255,.13);
          color: #e0e4ef;
        }

        .primary:hover,
        .secondary:hover {
          transform: translateY(-4px);
        }

        .visual {
          display: grid;
          place-items: center;
        }

        img {
          display: block;
          width: 100%;
          max-width: 420px;
          aspect-ratio: .84;
          object-fit: cover;
          border-radius: 200px 200px 30px 30px;
          border: 1px solid rgba(237,199,122,.4);
          padding: 9px;
          background: rgba(255,255,255,.04);
        }

        @media (max-width: 950px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 40px;
            padding-top: 65px;
          }

          .visual { max-width: 550px; margin: auto; }
        }

        @media (max-width: 600px) {
          .hero { padding: 65px 6% 70px; }
          h1 { letter-spacing: -1px; }
        }
      </style>

      <section class="hero" id="home">
        <div>
          <div class="eyebrow">
            ✦ YOUR THAI ADVENTURE STARTS HERE
          </div>

          <h1>
            Welcome to<br>
            My <span class="gradient-text">Thai Course</span> ✦
          </h1>

          <p class="description">
            Learn Thai, explore a beautiful culture, and discover
            a whole new way to connect with the world.
            Your journey starts with one simple word.
          </p>

          <div class="actions">
            <a class="primary" href="characters.html">
              Start Your Journey →
            </a>

            <a class="secondary" href="#about" data-target="about">
              Discover More
            </a>
          </div>
        </div>

        <div class="visual">
          <img
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=85"
            alt="Beautiful view of Bangkok, Thailand"
          >
        </div>
      </section>
    `;

    this.shadowRoot.addEventListener("click", (event) => {
      const link = event
        .composedPath()
        .find(
          (el) =>
            el instanceof HTMLAnchorElement && el.hasAttribute("data-target"),
        );

      if (!link) return;

      event.preventDefault();

      this.dispatchEvent(
        new CustomEvent("thai-bloom-navigate", {
          detail: { target: link.dataset.target },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
}

if (!customElements.get("thai-hero")) {
  customElements.define("thai-hero", ThaiHero);
}
