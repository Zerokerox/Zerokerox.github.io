import "./menu.js";
import "./sidebar-v3.js";
class SideBarTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <app-sidebar width="280px">
      <!-- Menu Stack -->
      <nav slot="menu">
        <h2>My Application</h2>
        <my-menu target-url="./index.html" menu-name="Home"></my-menu>
        <my-menu
          target-url="./characters.html"
          menu-name="Characters"
        ></my-menu>
        <my-menu target-url="./vowels.html" menu-name="Vowels"></my-menu>
        <my-menu target-url="./สระอา.html" menu-name="สระอา"></my-menu>
        <my-menu target-url="./สระอี.html" menu-name="สระอี"></my-menu>
        <my-menu target-url="./สระอู.html" menu-name="สระอู"></my-menu>

        <!-- เพิ่ม Menu ได้เรื่อย ๆ -->
      </nav>
      <slot></slot>
    </app-sidebar>
    `;
  }
}

customElements.define("my-sidebar", SideBarTemplate);
