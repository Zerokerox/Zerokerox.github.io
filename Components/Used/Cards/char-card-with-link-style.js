class ThaiCharCardWithLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const titleChar = this.getAttribute("title-char");
    const readingSound = this.getAttribute("reading-sound");
    const youtubeLink = this.getAttribute("youtube-link");

    const card = `
    <style>
    .reading-card {
  --accent: #6366f1;

  width: 100%;
  max-width: 360px;
  box-sizing: border-box;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #f8faff);
  box-shadow: 0 8px 24px rgba(31, 41, 55, 0.06);
  font-family: system-ui, sans-serif;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.reading-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(31, 41, 55, 0.1);
}

.reading-card__header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

.reading-card__title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  margin: 0;
  border-radius: 18px;
  background: #eef2ff;
  color: var(--accent);
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
}

.reading-card__content {
  min-width: 0;
}

.reading-card__label {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
}

.reading-card__sound {
  margin: 6px 0 0;
  color: #1f2937;
  font-size: 19px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.reading-card__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 15px;
  border-radius: 12px;
  background: #fff1f2;
  color: #be123c;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s ease;
}

.reading-card__link:hover {
  background: #ffe4e6;
}

.reading-card__play {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #e11d48;
  color: white;
  font-size: 13px;
}

.reading-card__arrow {
  margin-left: auto;
  font-size: 18px;
}

@media (max-width: 400px) {
  .reading-card {
    padding: 18px;
  }

  .reading-card__title {
    width: 72px;
    height: 72px;
    font-size: 34px;
  }
}
    
    </style>
  <div class="reading-card">
    <div class="reading-card__header">
      <h2 class="reading-card__title">${titleChar}</h2>
      <div class="reading-card__content">
        <span class="reading-card__label">วิธีอ่าน</span>
        <p class="reading-card__sound">${readingSound}</p>
      </div>
    </div>

    <a
      class="reading-card__link"
      href="https://www.youtube.com/watch?v=${youtubeLink}&list=PLvoH85XExQXJo3v4NlDbjNDLFQMJyePaC&index=2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="reading-card__play">▶</span>
      <span>วิธีเขียน</span>
      <span class="reading-card__arrow">↗</span>
    </a>
  </div>
`;
    this.shadowRoot.innerHTML = card;
  }
}

customElements.define("my-char-card-with-link-style", ThaiCharCardWithLink);
