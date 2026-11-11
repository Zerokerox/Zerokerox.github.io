class ThaiSaraLesson extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.wordsData = [
      {
        word: "เกา",
        image:
          "https://th.bing.com/th/id/OIP.0RbqACP08busccKT6PVFeQHaD4?w=303&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "เตา",
        image:
          "https://th.bing.com/th/id/OIP.L50hd5LYRinhQRzxSnfw_AHaHa?w=201&h=201&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "เขา",
        image:
          "https://th.bing.com/th/id/OIP.YlBtQcrqTDigtV-tDiZ6SQHaLH?w=200&h=300&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "เสา",
        image:
          "https://th.bing.com/th/id/OIP.Z4dgQZj0SkLvdMv4FES09gHaJ4?w=132&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "เงา",
        image:
          "https://th.bing.com/th/id/OIP.UQKLNegUqJ2fNa5jaVZbnAHaEK?w=299&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "เมา",
        image:
          "https://th.bing.com/th/id/OIP.Ok7zZwIZzAbQHkGJd8sZpQHaJ-?w=132&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "เฉา",
        image:
          "data:image/webp;base64,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",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
      {
        word: "เผา",
        image:
          "https://th.bing.com/th/id/OIP.TyMg1ozj1oW6-8stmUKrhQHaEK?w=305&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "/Audio/สระไทย/ขา.m4a",
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  playAudio(src) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);

    this.currentAudio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", error);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: none;
          min-width: 0;
          margin: 0;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        .book-container {
          width: 100%;
          min-width: 0;
          background: #ffffff;
          border: 2px solid #8ba3c7;
          border-radius: 12px;
          padding: clamp(12px, 3vw, 20px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(8px, 2vw, 12px);
          border: 2px solid #6b82a8;
          padding: clamp(8px, 2vw, 10px);
          border-radius: 8px;
          background: #fafafa;
        }

        .card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-width: 0;
          min-height: 100px;
          background: #ffffff;
          border: 1px solid #d0d7de;
          border-radius: 8px;
          padding: clamp(10px, 2vw, 14px);
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .card:active {
          transform: scale(0.97);
          background: #eef3f8;
        }

        .card-text {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: bold;
          color: #c62828;
        }

        .card-image {
          width: clamp(55px, 12vw, 85px);
          height: clamp(55px, 12vw, 85px);
          object-fit: contain;
          flex-shrink: 0;
          border-radius: 8px;
        }

        .card:focus-visible {
          outline: 3px solid #2b5282;
          outline-offset: 3px;
        }

        @media (max-width: 360px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="book-container">
        <div class="grid-container">
          ${this.wordsData
            .map(
              (item, index) => `
            <button
              class="card"
              type="button"
              data-index="${index}"
              aria-label="เล่นเสียง ${item.word}"
              ${item.audio ? "" : "disabled"}
            >
              <span class="card-text">${item.word}</span>

              <img
                class="card-image"
                src="${item.image}"
                alt="${item.word}"
                loading="lazy"
              />
            </button>
          `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.shadowRoot.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        this.playAudio(this.wordsData[index].audio);
      });
    });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}

customElements.define("thai-sara-lesson", ThaiSaraLesson);
