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
          "https://th.bing.com/th/id/OIP.tyczCXi0mN-DGbsW__ENFQHaE8?w=273&h=182&c=7&r=0&o=7&pid=1.7&rm=3",
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

          --primary: #7356a5;
          --primary-light: #a18bd3;
          --text-color: #52647c;
          --vowel-color: #d45c75;
        }

        * {
          box-sizing: border-box;
        }

        /* GLASS CONTAINER */

        .book-container {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          width: 100%;
          min-width: 0;

          padding: clamp(12px, 3vw, 24px);

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.82),
              rgba(255,255,255,0.52)
            );

          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 22px;

          box-shadow:
            0 8px 30px rgba(70,85,130,0.09),
            inset 0 1px 1px rgba(255,255,255,0.95);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .book-container::before {
          content: "";
          position: absolute;
          z-index: -1;

          width: 180px;
          height: 180px;

          top: -100px;
          right: -50px;

          background: rgba(161,139,211,0.17);
          filter: blur(35px);
          border-radius: 50%;
          pointer-events: none;
        }

        /* GRID */

        .grid-container {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: clamp(8px, 1.5vw, 14px);

          width: 100%;
          min-width: 0;
          padding: 5px 0;
        }

        /* CARD */

        .card {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 8px;

          width: 100%;
          min-width: 0;
          min-height: 100px;

          padding: clamp(10px, 2vw, 14px);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.95),
              rgba(245,242,255,0.72)
            );

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 15px;

          box-shadow:
            0 4px 12px rgba(80,90,130,0.07),
            inset 0 1px 1px rgba(255,255,255,0.95);

          cursor: pointer;
          user-select: none;

          -webkit-tap-highlight-color: transparent;

          transition:
            transform .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            border-color .2s ease;
        }

        .card:hover:not(:disabled) {
          transform: translateY(-4px);

          background: rgba(255,255,255,0.98);

          border-color: rgba(161,139,211,0.45);

          box-shadow:
            0 9px 20px rgba(115,86,165,0.13),
            inset 0 1px 1px rgba(255,255,255,1);
        }

        .card:active:not(:disabled) {
          transform: scale(0.96);
          background: rgba(235,228,255,0.95);
        }

        .card:focus-visible {
          outline: 3px solid rgba(115,86,165,0.45);
          outline-offset: 3px;
        }

        /* WORD */

        .card-text {
          min-width: 0;

          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 800;

          line-height: 1.2;
          white-space: nowrap;

          color: var(--vowel-color);
        }

        /* IMAGE */

        .card-image {
          width: clamp(55px, 12vw, 85px);
          height: clamp(55px, 12vw, 85px);

          object-fit: contain;

          flex-shrink: 0;

          border-radius: 10px;

          background: rgba(255,255,255,0.5);

          transition: transform .2s ease;
        }

        .card:hover .card-image {
          transform: scale(1.05);
        }

        /* RESPONSIVE */

        @media (max-width: 600px) {
          .card {
            min-height: 85px;
            padding: 9px;
          }

          .card-image {
            width: clamp(48px, 13vw, 70px);
            height: clamp(48px, 13vw, 70px);
          }
        }

        @media (max-width: 360px) {
          .grid-container {
            grid-template-columns: 1fr;
          }

          .card {
            min-height: 90px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card,
          .card-image {
            transition: none;
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
