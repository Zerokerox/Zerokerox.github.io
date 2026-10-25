/* =========================================
   LESSON 1 — THAI ALPHABET
========================================= */

class ThaiLesson1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        article {
          height: 100%;
          padding: 28px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 20px;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.015)
          );
          color: #f8f7f4;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
          transition: transform .3s, border-color .3s;
        }

        article:hover {
          transform: translateY(-6px);
          border-color: rgba(237,199,122,.5);
        }

        .number {
          color: #edc77a;
          font-size: 11px;
          letter-spacing: 2px;
        }

        .icon {
          font-size: 32px;
          color: #edc77a;
          margin: 22px 0;
        }

        h3 {
          font-family: 'Playfair Display', serif;
          font-size: 23px;
          margin: 0 0 12px;
        }

        p {
          color: #a9b2c7;
          font-size: 13px;
          line-height: 1.8;
        }

        a {
          display: inline-block;
          margin-top: 12px;
          color: #edc77a;
          font-size: 13px;
          text-decoration: none;
        }
      </style>

      <article>
        <span class="number">01 · BEGINNER</span>
        <div class="icon">ก</div>
        <h3>Thai Alphabet</h3>
        <p>
          Learn Thai consonants, vowels, and the foundations
          of reading and writing.
        </p>
        <a href="characters.html">Explore characters →</a>
      </article>
    `;
  }
}

if (!customElements.get("thai-lesson-1")) {
  customElements.define("thai-lesson-1", ThaiLesson1);
}
