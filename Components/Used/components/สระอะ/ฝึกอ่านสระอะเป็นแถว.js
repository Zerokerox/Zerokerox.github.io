class ThaiReadingLessonPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.currentAudio = null;

    // ข้อมูลรูปภาพและประโยค
    this.sectionsData = [
      {
        type: "illustrated-sentences",
        items: [
          {
            id: "item-1",
            imageSrc:
              "https://th.bing.com/th/id/OIP.aiomzp6rlT6rzCuGt-0RDgHaFj?w=239&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
            imageAlt: "ตามีมะระ",
            sentences: [
              {
                fullText: "ตา มี มะระ",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  { text: "ตา", audioSrc: "audio/ekaa.mp3" },
                  { text: "มี", audioSrc: "audio/tee.mp3" },
                  { text: "มะระ", audioSrc: "audio/ngoo.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-2",
            imageSrc: "/Images/สระอะ/ชะนีตีกะลา.png",
            imageAlt: "ชะนีตีกะลา",
            sentences: [
              {
                fullText: "ชะนี ตี กะลา",
                audioSrc: "audio/aa_paa_taa_maa.mp3",
                words: [
                  { text: "ชะนี", audioSrc: "audio/aa.mp3" },
                  { text: "ตี", audioSrc: "audio/paa.mp3" },
                  { text: "กะลา", audioSrc: "audio/taa.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-3",
            imageSrc:
              "data:image/webp;base64,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",
            imageAlt: "ตามากะอา",
            sentences: [
              {
                fullText: "ตา มา กะ อา",
                audioSrc: "audio/taa_doo_hoo_laa.mp3",
                words: [
                  { text: "ตา", audioSrc: "audio/taa.mp3" },
                  { text: "มา", audioSrc: "audio/doo.mp3" },
                  { text: "กะ", audioSrc: "audio/hoo.mp3" },
                  { text: "อา", audioSrc: "audio/laa.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-4",
            imageSrc:
              "https://th.bing.com/th/id/OIP.oF4n9fpe49QkMO0RfDpetAHaE7?w=231&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
            imageAlt: "อา ตี งู ดู ซะ",
            sentences: [
              {
                fullText: "อา ตี งู ดู ซะ",
                audioSrc: "audio/taa_doo_hoo_laa.mp3",
                words: [
                  { text: "อา", audioSrc: "audio/taa.mp3" },
                  { text: "ตี", audioSrc: "audio/doo.mp3" },
                  { text: "งู", audioSrc: "audio/doo.mp3" },
                  { text: "ดู", audioSrc: "audio/doo.mp3" },
                  { text: "ซะ", audioSrc: "audio/doo.mp3" },
                ],
              },
            ],
          },
        ],
      },
    ];

    this.render();
  }

  connectedCallback() {
    this.bindEvents();
  }

  playAudio(src) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);

    this.currentAudio.play().catch((err) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", src);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
          container-type: inline-size;
        }

        .page-card {
          background: #ffffff;
          border: 2px solid #b0bec5;
          border-radius: 12px;
          padding: 5cqi 4cqi;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          width: 100%;
          box-sizing: border-box;
        }

        /* รายการรูปภาพและข้อความ */
        .illustrated-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .illustrated-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 1.5rem;
          align-items: center;
        }

        @container (max-width: 480px) {
          .illustrated-row {
            grid-template-columns: 100px 1fr;
            gap: 0.8rem;
          }
        }

        .image-container {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          background-color: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lesson-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .sentences-container {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .sentence-block {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
        }

        .word-item {
          font-size: clamp(1.4rem, 5cqi, 2.2rem);
          font-weight: 500;
          color: #37474f;
          padding: 2px 6px;
          border-radius: 6px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .word-item:hover {
          background-color: #e3f2fd;
          color: #1565c0;
        }

        .word-item:active {
          transform: scale(0.96);
        }

        .play-sentence-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: clamp(1rem, 3cqi, 1.3rem);
          padding: 2px 6px;
          border-radius: 50%;
          opacity: 0.7;
          transition: opacity 0.2s, transform 0.1s;
        }

        .play-sentence-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      </style>

      <div class="page-card">

        <div class="illustrated-list">
          ${this.sectionsData[0].items
            .map(
              (item) => `
                <div class="illustrated-row">
                  <div class="image-container">
                    <img
                      class="lesson-img"
                      src="${item.imageSrc}"
                      alt="${item.imageAlt}"
                      loading="lazy"
                    />
                  </div>

                  <div class="sentences-container">
                    ${item.sentences
                      .map(
                        (s) => `
                          <div class="sentence-block">
                            ${s.words
                              .map(
                                (w) => `
                                  <span
                                    class="word-item"
                                    data-audio="${w.audioSrc}"
                                  >${w.text}</span>
                                `,
                              )
                              .join("")}

                            <button
                              class="play-sentence-btn"
                              data-audio="${s.audioSrc}"
                              title="ฟังทั้งประโยค"
                            >🔊</button>
                          </div>
                        `,
                      )
                      .join("")}
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>

      </div>
    `;
  }

  bindEvents() {
    const clickableElements = this.shadowRoot.querySelectorAll("[data-audio]");

    clickableElements.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();

        const audioSrc = el.getAttribute("data-audio");

        if (audioSrc) {
          this.playAudio(audioSrc);
        }
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

if (!customElements.get("thai-reading-lesson-page")) {
  customElements.define("thai-reading-lesson-page", ThaiReadingLessonPage);
}
