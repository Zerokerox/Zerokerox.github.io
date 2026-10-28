import dayOneData from "../data/day-one-data.js";
import "../Cards/char-card-with-link-style-image-shower-audio.js";
import "../Templates/expandable-section-v2.js";

class DayOne extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const charList = dayOneData
      .map((char) => {
        return `
      <li>
          <my-char-card-with-link-style-image-shower-audio
            title-char="${char.titleChar}"
            reading-sound="${char.readingSound}"
            youtube-link="${char.youtubeLink}"
            image-url="${char.imageUrl}"
            audio-url="${char.audioUrl}"
          ></my-char-card-with-link-style-image-shower-audio>
        </li>`;
      })
      .join("");

    this.shadowRoot.innerHTML = `
    <my-expandable-section content-title="Day 1" >
    <h2 slot="sub-title" style="display:block;">ก -> ญ</h2>
    <ol slot="detail">${charList}</ol>
    </my-expandable-section>
        `;
  }
}

customElements.define("day-one", DayOne);
