import characterData from "../../data/character-data.js";
import "../../Cards/char-card-with-link-style-image-shower-audio-v3.js";

class Character extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const charList = characterData
      .map((char) => {
        return `
          <div class="grid-item">
            <my-char-card-with-link-style-image-shower-audio-v3
              title-char="${char.titleChar}"
              reading-sound="${char.readingSound}"
              youtube-link="${char.youtubeLink}"
              image-url="${char.imageUrl}"
              audio-url="${char.audioUrl}"
            ></my-char-card-with-link-style-image-shower-audio-v3>
          </div>
        `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .grid-container {
          display: grid;
          grid-template-columns:
            repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .grid-item {
          min-width: 0;
        }
      </style>

      <div class="grid-container">
        ${charList}
      </div>
    `;
  }
}

customElements.define("my-characters", Character);
