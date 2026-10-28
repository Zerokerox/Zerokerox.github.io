import dayFourData from "../data/day-four-data.js";
import "../Cards/char-card-with-link-style-image-shower-audio.js";
import "../Cards/char-card-with-link-style.js";
import "../Templates/expandable-section-v2.js";

class DayFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const charList = dayFourData
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
    <my-expandable-section content-title="Day 4" >
    <h2 slot="sub-title" style="display:block;">ล -> ฮ</h2>
    <ol slot="detail" start="36">
    ${charList}
    </ol>
    </my-expandable-section>
        `;
  }
}

customElements.define("my-day-four", DayFour);
