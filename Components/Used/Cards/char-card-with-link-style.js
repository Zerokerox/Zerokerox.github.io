class ThaiCharCardWithLink extends HTMLElement {
  connectedCallback() {
    const titleChar = this.getAttribute("title-char");
    const readingSound = this.getAttribute("reading-sound");
    const youtubeLink = this.getAttribute("youtube-link");

    const card = `
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
      <span>ฝึกฟังการออกเสียง</span>
      <span class="reading-card__arrow">↗</span>
    </a>
  </div>
`;
    this.innerHTML = card;
  }
}

customElements.define("my-char-card-with-link-style", ThaiCharCardWithLink);
