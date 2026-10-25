class ThaiBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    if (this.shadowRoot.children.length > 0) return;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

        :host {
          display: block;
          position: relative;
          isolation: isolate;
          overflow: hidden;
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

        .background-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(110px);
          opacity: .17;
          pointer-events: none;
          animation: glowMove 12s ease-in-out infinite alternate;
        }

        .glow-one {
          background: #8a63ff;
          top: 100px;
          left: -200px;
        }

        .glow-two {
          background: #e7ad52;
          top: 250px;
          right: -230px;
          animation-delay: -5s;
        }

        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          bottom: -20px;
          color: var(--gold);
          opacity: 0;
          animation: rise linear infinite;
        }

        main, section {
          position: relative;
          z-index: 1;
        }

        .hero {
          max-width: 1440px;
          min-height: 680px;
          padding: 90px 8% 100px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          align-items: center;
          gap: 70px;
          scroll-margin-top: 20px;
        }

        .hero-content {
          animation: enterLeft 1s ease both;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 15px;
          border: 1px solid rgba(237,199,122,.23);
          border-radius: 30px;
          background: rgba(237,199,122,.06);
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          flex: 0 0 auto;
          background: #7fe0b2;
          border-radius: 50%;
          box-shadow: 0 0 12px #7fe0b2;
          animation: pulse 2s infinite;
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 1.14;
          letter-spacing: -2px;
          margin: 0;
        }

        .gradient-text {
          background: linear-gradient(
            110deg, #fff2ce, #e7b75d, #d6a8ff
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .floating-star {
          display: inline-block;
          color: var(--gold);
          font-size: 27px;
          vertical-align: top;
          animation: float 3s ease-in-out infinite;
        }

        .description {
          color: var(--muted);
          max-width: 510px;
          line-height: 1.9;
          margin: 25px 0 32px;
          font-size: 15px;
        }

        .hero-actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .primary-button, .secondary-button {
          padding: 15px 22px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 20px;
          font-size: 14px;
          transition: .3s;
        }

        .primary-button {
          color: #181727;
          background: linear-gradient(110deg,#f4d99d,#dca95c);
          font-weight: 700;
          box-shadow: 0 8px 30px rgba(220,169,92,.14);
        }

        .primary-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(220,169,92,.28);
        }

        .primary-button span {
          transition: transform .3s;
        }

        .primary-button:hover span {
          transform: translateX(5px);
        }

        .secondary-button {
          border: 1px solid rgba(255,255,255,.13);
          color: #e0e4ef;
        }

        .secondary-button:hover {
          border-color: var(--gold);
          background: rgba(255,255,255,.04);
        }

        .features {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          margin-top: 48px;
        }

        .feature {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .feature-icon {
          color: var(--gold);
          font-size: 24px;
        }

        .feature strong, .feature small {
          display: block;
        }

        .feature strong {
          font-size: 12px;
        }

        .feature small {
          color: var(--muted);
          font-size: 10px;
          margin-top: 5px;
        }

        .hero-visual {
          min-height: 440px;
          position: relative;
          display: grid;
          place-items: center;
          animation: enterRight 1.1s ease both;
        }

        .image-card {
          width: 82%;
          max-width: 420px;
          aspect-ratio: .84;
          position: relative;
          border-radius: 200px 200px 30px 30px;
          padding: 9px;
          border: 1px solid rgba(237,199,122,.4);
          background: rgba(255,255,255,.04);
          box-shadow: 0 30px 100px rgba(0,0,0,.4);
          transform: rotate(2deg);
          animation: float 6s ease-in-out infinite;
        }

        .image-card img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          border-radius: inherit;
        }

        .image-overlay {
          position: absolute;
          inset: 9px;
          border-radius: inherit;
          background: linear-gradient(
            transparent 50%, rgba(8,12,25,.8)
          );
          pointer-events: none;
        }

        .image-caption {
          position: absolute;
          bottom: 28px;
          left: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .caption-icon {
          font-size: 30px;
        }

        .image-caption strong {
          font-size: 14px;
        }

        .image-caption p {
          color: #e1dfdb;
          font-size: 11px;
          margin: 5px 0 0;
        }
          
        .orbit {
          position: absolute;
          border: 1px solid rgba(237,199,122,.14);
          border-radius: 50%;
          pointer-events: none;
        }

        .orbit-one {
          width: 105%;
          height: 78%;
          transform: rotate(-30deg);
          animation: spin 30s linear infinite;
        }

        .orbit-two {
          width: 110%;
          height: 95%;
          transform: rotate(35deg);
          border-style: dashed;
          animation: spin 45s linear infinite reverse;
        }

        .floating-card {
          position: absolute;
          z-index: 2;
          padding: 15px 18px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 16px;
          background: rgba(24,30,49,.82);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 60px rgba(0,0,0,.2);
          animation: float 5s ease-in-out infinite;
        }

        .thai-card {
          top: 14%;
          left: -2%;
          display: grid;
          gap: 5px;
        }

        .thai-letter {
          color: var(--gold);
          font-size: 26px;
          font-weight: 700;
        }

        .translation {
          font-size: 10px;
          color: var(--muted);
        }

        .culture-card {
          bottom: 14%;
          right: -3%;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 9px;
          animation-delay: -2s;
        }

        .intro-section {
          padding: 90px 20px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.015);
          scroll-margin-top: 20px;
        }

        .section-label {
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 3px;
        }

        .intro-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px,4vw,48px);
          line-height: 1.4;
          margin: 20px 0;
        }

        .intro-section p {
          color: var(--muted);
          max-width: 580px;
          margin: auto;
          line-height: 1.9;
        }

        .lesson-section {
          padding: 50px 8% 100px;
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 22px;
          max-width: 1440px;
          margin: auto;
          scroll-margin-top: 20px;
        }

        .lesson-card {
          padding: 30px;
          border: 1px solid rgba(255,255,255,.09);
          background: linear-gradient(
            145deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.015)
          );
          border-radius: 20px;
          transition: transform .35s,border-color .35s;
        }

        .lesson-card:hover {
          transform: translateY(-8px);
          border-color: rgba(237,199,122,.45);
        }

        .lesson-card > span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 2px;
        }

        .lesson-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 23px;
          line-height: 1.4;
          margin: 20px 0 12px;
        }

        .lesson-card p {
          color: var(--muted);
          line-height: 1.8;
          font-size: 13px;
          margin-bottom: 25px;
        }

        .lesson-card a {
          color: var(--gold);
          font-size: 13px;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: .35; }
        }

        @keyframes spin {
          to { rotate: 360deg; }
        }

        @keyframes glowMove {
          from { transform: translate(0,0); }
          to { transform: translate(90px,50px); }
        }

        @keyframes enterLeft {
          from {
            opacity: 0;
            transform: translateX(-35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes enterRight {
          from {
            opacity: 0;
            transform: translateX(35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes rise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: .5; }
          90% { opacity: .3; }
          100% {
            transform: translateY(-100vh) rotate(200deg);
            opacity: 0;
          }
        }

        @media (max-width: 950px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 30px;
            padding-top: 65px;
          }

          .hero-content {
            max-width: 650px;
          }

          .hero-visual {
            max-width: 550px;
            width: 100%;
            margin: auto;
          }

          .lesson-section {
            grid-template-columns: 1fr;
          }

          .lesson-card {
            padding: 25px;
          }
        }

        @media (max-width: 600px) {
          .hero {
            padding: 65px 6% 70px;
          }

          h1 {
            letter-spacing: -1px;
          }

          .description {
            font-size: 14px;
          }

          .features {
            gap: 20px;
          }

          .hero-visual {
            min-height: 360px;
          }

          .thai-card { left: -1%; }
          .culture-card { right: -1%; }

          .image-card {
            width: 76%;
          }

          .intro-section {
            padding: 70px 7%;
          }

          .lesson-section {
            padding: 25px 6% 70px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      </style>

      <div class="background-glow glow-one"></div>
      <div class="background-glow glow-two"></div>
      <div class="particles" aria-hidden="true"></div>

      <main id="home" class="hero">
        <div class="hero-content">
          <div class="eyebrow">
            <span class="status-dot"></span>
            YOUR THAI ADVENTURE STARTS HERE
          </div>

          <h1>
            Welcome to<br>
            My <span class="gradient-text">Thai Course</span>
            <span class="floating-star">✦</span>
          </h1>

          <p class="description">
            Learn Thai, explore a beautiful culture, and discover
            a whole new way to connect with the world.
            Your journey starts with one simple word.
          </p>

          <div class="hero-actions">
            <a href="characters.html" class="primary-button">
              Start Your Journey <span>→</span>
            </a>

            <a href="#about" class="secondary-button" data-target="about">
              Discover More
            </a>
          </div>

          <div class="features">
            <div class="feature">
              <span class="feature-icon">✿</span>
              <div>
                <strong>Easy Lessons</strong>
                <small>Learn step by step</small>
              </div>
            </div>

            <div class="feature">
              <span class="feature-icon">☼</span>
              <div>
                <strong>Thai Culture</strong>
                <small>Explore new traditions</small>
              </div>
            </div>

            <div class="feature">
              <span class="feature-icon">♡</span>
              <div>
                <strong>Fun Learning</strong>
                <small>Learn at your pace</small>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="orbit orbit-one"></div>
          <div class="orbit orbit-two"></div>

          <div class="image-card">
            <img
              src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=85"
              alt="Beautiful view of Bangkok, Thailand"
            >

            <div class="image-overlay"></div>

            <div class="image-caption">
              <span class="caption-icon">🇹🇭</span>
              <div>
                <strong>Discover Thailand</strong>
                <p>A language full of life.</p>
              </div>
            </div>
          </div>

          <div class="floating-card thai-card">
            <span class="thai-letter">สวัสดี</span>
            <span class="translation">Hello · Sawasdee</span>
          </div>

          <div class="floating-card culture-card">
            <span>✨</span>
            <span>Learn something new today</span>
          </div>
        </div>
      </main>

      <section id="about" class="intro-section">
        <span class="section-label">A NEW BEGINNING</span>
        <h2>
          More than a language.<br>
          <span class="gradient-text">A beautiful experience.</span>
        </h2>
        <p>
          From your first Thai greeting to everyday conversations,
          this is your space to learn, explore, and grow with confidence.
        </p>
      </section>

      <section id="lessons" class="lesson-section">
        <article class="lesson-card">
          <span>01 · BASICS</span>
          <h3>Speak Your First Thai Words</h3>
          <p>Start with greetings, pronunciation, and everyday phrases.</p>
          <a href="lessons.html">Explore lessons →</a>
        </article>

        <article class="lesson-card">
          <span>02 · CULTURE</span>
          <h3>Discover Thai Culture</h3>
          <p>Understand the customs and culture behind the language.</p>
          <a href="#about" data-target="about">Learn more →</a>
        </article>

        <article class="lesson-card">
          <span>03 · PRACTICE</span>
          <h3>Build Your Confidence</h3>
          <p>Practice useful words and take your next learning step.</p>
          <a href="lessons.html">Start practicing →</a>
        </article>
      </section>
      `;

    this.shadowRoot.addEventListener("click", this.handleClick);

    document.addEventListener("thai-bloom-navigate", this.handleNavigation);

    this.createParticles();
  }

  handleClick(event) {
    const link = event
      .composedPath()
      .find(
        (element) =>
          element instanceof HTMLAnchorElement &&
          element.hasAttribute("data-target"),
      );

    if (!link) return;

    event.preventDefault();
    this.scrollToSection(link.dataset.target);
  }

  handleNavigation(event) {
    const target = event.detail?.target;

    if (target) {
      this.scrollToSection(target);
    }
  }

  scrollToSection(id) {
    const section = this.shadowRoot.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  createParticles() {
    const container = this.shadowRoot.querySelector(".particles");

    if (!container) return;

    const symbols = ["✦", "✧", "·", "✿"];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 22; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";
      particle.textContent = symbols[i % symbols.length];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${10 + Math.random() * 15}s`;
      particle.style.animationDelay = `${Math.random() * 12}s`;
      particle.style.fontSize = `${10 + Math.random() * 14}px`;

      fragment.appendChild(particle);
    }

    container.appendChild(fragment);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.handleClick);

    document.removeEventListener("thai-bloom-navigate", this.handleNavigation);
  }
}

if (!customElements.get("thai-body")) {
  customElements.define("thai-body", ThaiBody);
}
