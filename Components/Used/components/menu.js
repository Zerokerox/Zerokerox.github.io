class Menu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const targetUrl = this.getAttribute("target-url") || "index.html";
    const menuName = this.getAttribute("menu-name") || "Menu Name";
    this.shadowRoot.innerHTML = `
      <style>
        h1 {
          color: cyan;
        }
      </style>

      
        <h3
          style="cursor: pointer; margin: 0; padding: 5px 0"
          onmouseover="
            ((this.style.backgroundColor = 'white'),
              (this.style.color = '#171923'))
          "
          onmouseout="
            ((this.style.backgroundColor = '#171923'),
              (this.style.color = 'white'))
          "
          onclick="window.location.href = '${targetUrl}'"
        >
          ${menuName}
        </h3>
        <hr style="margin: 0; padding: 0" />
    `;
  }
}

customElements.define("my-menu", Menu);
