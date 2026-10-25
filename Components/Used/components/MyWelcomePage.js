class Welcome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

:root {
  --bg: #0b1020;
  --surface: #151c30;
  --gold: #edc77a;
  --text: #f8f7f4;
  --muted: #a9b2c7;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  position: relative;
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
  opacity: 0.17;
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

.navbar {
  min-height: 86px;
  padding: 20px 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  position: relative;
  z-index: 5;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 21px;
  font-weight: 700;
}

.logo-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #f5d999, #c68a3b);
  border-radius: 13px;
  color: #171627;
  font-size: 25px;
}

.gold {
  color: var(--gold);
}

.navbar nav {
  display: flex;
  gap: 30px;
}

.navbar nav a {
  color: var(--muted);
  transition: color 0.3s;
}

.navbar nav a:hover {
  color: var(--gold);
}

.nav-button {
  border: 1px solid rgba(237,199,122,0.5);
  padding: 12px 19px;
  border-radius: 30px;
  font-size: 13px;
  transition: 0.3s;
}

.nav-button:hover {
  background: var(--gold);
  color: var(--bg);
  transform: translateY(-3px);
}

.hero {
  max-width: 1440px;
  min-height: 680px;
  padding: 90px 8% 100px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 70px;
  position: relative;
}

.hero-content {
  animation: enterLeft 1s ease both;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border: 1px solid rgba(237,199,122,0.23);
  border-radius: 30px;
  background: rgba(237,199,122,0.06);
  color: var(--gold);
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.status-dot {
  width: 7px;
  height: 7px;
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

.primary-button,
.secondary-button {
  padding: 15px 22px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  transition: 0.3s;
}

.primary-button {
  color: #181727;
  background: linear-gradient(110deg, #f4d99d, #dca95c);
  font-weight: 700;
  box-shadow: 0 8px 30px rgba(220,169,92,0.14);
}

.primary-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(220,169,92,0.28);
}

.primary-button span {
  transition: transform 0.3s;
}

.primary-button:hover span {
  transform: translateX(5px);
}

.secondary-button {
  border: 1px solid rgba(255,255,255,0.13);
  color: #e0e4ef;
}

.secondary-button:hover {
  border-color: var(--gold);
  background: rgba(255,255,255,0.04);
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

.feature strong,
.feature small {
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
  aspect-ratio: 0.84;
  position: relative;
  border-radius: 200px 200px 30px 30px;
  padding: 9px;
  border: 1px solid rgba(237,199,122,0.4);
  background: rgba(255,255,255,0.04);
  box-shadow: 0 30px 100px rgba(0,0,0,0.4);
  transform: rotate(2deg);
  animation: float 6s ease-in-out infinite;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.image-overlay {
  position: absolute;
  inset: 9px;
  border-radius: inherit;
  background: linear-gradient(
    transparent 50%, rgba(8,12,25,0.8)
  );
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
  margin-top: 5px;
}

.orbit {
  position: absolute;
  border: 1px solid rgba(237,199,122,0.14);
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
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  background: rgba(24,30,49,0.82);
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
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
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.015);
}

.section-label {
  color: var(--gold);
  font-size: 11px;
  letter-spacing: 3px;
}

.intro-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 4vw, 48px);
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  max-width: 1440px;
  margin: auto;
}

.lesson-card {
  padding: 30px;
  border: 1px solid rgba(255,255,255,0.09);
  background: linear-gradient(
    145deg, rgba(255,255,255,0.055),
    rgba(255,255,255,0.015)
  );
  border-radius: 20px;
  transition: transform 0.35s, border-color 0.35s;
}

.lesson-card:hover {
  transform: translateY(-8px);
  border-color: rgba(237,199,122,0.45);
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

footer {
  padding: 30px 8%;
  border-top: 1px solid rgba(255,255,255,0.07);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  color: var(--muted);
  font-size: 12px;
}

.particles {
  position: absolute;
  inset: 0;
  height: 100%;
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

.navbar, main, .intro-section, .lesson-section, footer {
  position: relative;
  z-index: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

@keyframes spin {
  to { rotate: 360deg; }
}

@keyframes glowMove {
  from { transform: translate(0, 0); }
  to { transform: translate(90px, 50px); }
}

@keyframes enterLeft {
  from { opacity: 0; transform: translateX(-35px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes enterRight {
  from { opacity: 0; transform: translateX(35px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes rise {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.5; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-100vh) rotate(200deg); opacity: 0; }
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
  .navbar {
    padding: 18px 5%;
  }

  .navbar nav {
    display: none;
  }

  .nav-button {
    padding: 10px 12px;
    font-size: 11px;
  }

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

  .thai-card {
    left: -1%;
  }

  .culture-card {
    right: -1%;
  }

  .image-card {
    width: 76%;
  }

  .intro-section {
    padding: 70px 7%;
  }

  .lesson-section {
    padding: 25px 6% 70px;
  }

  footer {
    flex-direction: column;
    padding: 25px 6%;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}

      </style>

      <div class="background-glow glow-one"></div>
  <div class="background-glow glow-two"></div>
  <div class="particles" id="particles"></div>

  <header class="navbar">
    <a href="#" class="logo">
      <span class="logo-icon">ก</span>
      <span>Thai<span class="gold">Bloom</span></span>
    </a>

    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#lessons">Lessons</a>
    </nav>

    <a href="#lessons" class="nav-button">Start Learning ↗</a>
  </header>

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
        <a href="#about" class="secondary-button">
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
    <h2>More than a language.<br>
      <span class="gradient-text">A beautiful experience.</span>
    </h2>
    <p>
      From your first Thai greeting to everyday conversations,
      this is your space to learn, explore, and grow with confidence.
    </p>
  </section>

  <section id="lessons" class="lesson-section">
    <div class="lesson-card">
      <span>01 · BASICS</span>
      <h3>Speak Your First Thai Words</h3>
      <p>Start with greetings, pronunciation, and everyday phrases.</p>
      <a href="lessons.html">Explore lessons →</a>
    </div>

    <div class="lesson-card">
      <span>02 · CULTURE</span>
      <h3>Discover Thai Culture</h3>
      <p>Understand the customs and culture behind the language.</p>
      <a href="#about">Learn more →</a>
    </div>

    <div class="lesson-card">
      <span>03 · PRACTICE</span>
      <h3>Build Your Confidence</h3>
      <p>Practice useful words and take your next learning step.</p>
      <a href="lessons.html">Start practicing →</a>
    </div>
  </section>

  <footer>
    <p>Made with <span class="gold">♥</span> for Thai language learners.</p>
    <p>© 2026 ThaiBloom · Learn a little, grow a lot.</p>
  </footer>
    `;
  }
}

customElements.define("my-welcome", Welcome);
