import "./menu.js";
import "./sidebar-v3.js";
import { sidebarMenus } from "../data/sidebar-menu.js";
class SideBarTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const menuHTML = sidebarMenus
      .map(
        (menu) => `
    <my-menu
      target-url="${menu.url}"
      menu-name="${menu.name}"
    ></my-menu>
  `,
      )
      .join("");
    this.shadowRoot.innerHTML = `
      <app-sidebar width="280px">
      <!-- Menu Stack -->
      <nav slot="menu">
        <h2>My Application</h2>
        ${menuHTML}
        

        <!-- เพิ่ม Menu ได้เรื่อย ๆ -->
      </nav>
      <slot></slot>
    </app-sidebar>
    `;
  }
}

customElements.define("my-sidebar", SideBarTemplate);
