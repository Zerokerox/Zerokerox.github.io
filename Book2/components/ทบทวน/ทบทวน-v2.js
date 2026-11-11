// not useful don't use this version
class ThaiReadingPractice extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.wordsData = [];
  }

  connectedCallback() {
    this.loadWords();
    this.render();
    this.bindEvents();
  }

  loadWords() {
    try {
      this.wordsData = JSON.parse(this.getAttribute("words") || "[]");
    } catch (error) {
      console.error("ข้อมูลคำศัพท์ไม่ถูกต้อง:", error);
      this.wordsData = [];
    }
  }

  playAudio(src, card) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;

      if (this.currentCard) {
        this.currentCard.classList.remove("playing");
      }
    }

    this.currentAudio = new Audio(src);
    this.currentCard = card;

    card.classList.add("playing");

    this.currentAudio.addEventListener("ended", () => {
      card.classList.remove("playing");
      this.currentAudio = null;
      this.currentCard = null;
    });

    this.currentAudio.addEventListener("error", () => {
      card.classList.remove("playing");
      this.currentAudio = null;
      this.currentCard = null;
    });

    this.currentAudio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", error);

      card.classList.remove("playing");
      this.currentAudio = null;
      this.currentCard = null;
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* นำ CSS เดิมทั้งหมดของคุณมาใส่ตรงนี้ */
      </style>

      <div class="book-container">
        <div class="grid-container">

          ${this.wordsData
            .map((item, index) => {
              const consonant = item.word[0];
              const vowel = item.word.slice(1);

              return `
              <button
                type="button"
                class="word-card"
                data-index="${index}"
                aria-label="เล่นเสียง ${item.word}"
                ${item.audio ? "" : "disabled"}
              >
                <span class="word-text">
                  <span class="char-consonant">${consonant}</span><span class="char-vowel">${vowel}</span>
                </span>

                <span class="audio-icon" aria-hidden="true">
                  🔊
                </span>
              </button>
            `;
            })
            .join("")}

        </div>
      </div>
    `;
  }

  bindEvents() {
    const cards = this.shadowRoot.querySelectorAll(".word-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        const item = this.wordsData[index];

        this.playAudio(item.audio, card);
      });
    });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    this.currentCard = null;
  }
}

if (!customElements.get("thai-reading-practice")) {
  customElements.define("thai-reading-practice", ThaiReadingPractice);
}
