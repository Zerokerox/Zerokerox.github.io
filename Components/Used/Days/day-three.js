import dayThreeData from "../data/day-three-data.js";
import "../Cards/char-card-with-link-style-image-shower-audio.js";
import "../Cards/char-card-with-link-style.js";
import "../Templates/expandable-section.js";

class DayThree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const charList = dayThreeData
      .map((char) => {
        return `
      <li>
          <my-char-card-with-link-style-image-shower-audio
            title-char="${char.titleChar}"
            reading-sound="${char.readingSound}"
            youtube-link="${char.youtubeLink}"
            image-url="${char.imageUrl}"
            audio-url=""
          ></my-char-card-with-link-style-image-shower-audio>
        </li>`;
      })
      .join("");

    this.shadowRoot.innerHTML = `
    <my-expandable-section content-title="Day 3" >
    <h2 slot="sub-title" style="display:block; color: blue;">บ -> ร</h2>
    <ol slot="detail" start=26>
    ${charList}
    </ol>
    </my-expandable-section>
        `;
  }
}

customElements.define("my-day-three", DayThree);
