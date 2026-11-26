import "./menu-v2.js";
import "./sidebar-v4.js";
import { sidebarMenus } from "../data/sidebar-menu-v2.js";

class SideBarTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const menuHTML = sidebarMenus
      .map(
        (book, index) => `
        <details class="book-section" ${index === 0 ? "open" : ""}>
          <summary>
            <span>${book.title}</span>
            <span class="arrow"></span>
          </summary>

          <div class="book-menus">
            ${book.menus
              .map(
                (menu) => `
                  <my-menu
                    target-url="${menu.url}"
                    menu-name="${menu.name}"
                  ></my-menu>
                `,
              )
              .join("")}
          </div>
        </details>
      `,
      )
      .join("");

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        min-height: 100vh;

        --glass-bg: rgba(255, 255, 255, 0.62);
        --glass-border: rgba(255, 255, 255, 0.8);
        --glass-shadow: 0 8px 32px rgba(70, 85, 130, 0.10);
        --glass-blur: 18px;
        --primary-color: #7356a5;

        background:
          radial-gradient(
            circle at 10% 10%,
            rgba(180, 200, 255, 0.45),
            transparent 40%
          ),
          radial-gradient(
            circle at 90% 80%,
            rgba(255, 200, 220, 0.35),
            transparent 40%
          ),
          linear-gradient(
            135deg,
            #edf3ff,
            #f7f0fa,
            #e9f2ff
          );
      }

      * {
        box-sizing: border-box;
      }

      app-sidebar {
        display: block;
        min-height: 100vh;
      }

      nav[slot="menu"] {
        padding: 18px 12px;
        background: rgba(255, 255, 255, 0.58);
        border-right: 1px solid var(--glass-border);
        backdrop-filter: blur(var(--glass-blur));
        -webkit-backdrop-filter: blur(var(--glass-blur));
      }

      h2 {
        font-size: 19px;
        font-weight: 800;
        color: var(--primary-color);
        padding: 12px 14px;
        margin: 0 0 18px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.48);
        box-shadow:
          inset 0 1px 1px rgba(255,255,255,0.9),
          0 4px 12px rgba(80,90,130,0.05);
      }

      .book-section {
        margin-bottom: 12px;
        border-radius: 10px;
        overflow: hidden;
      }

      /* Book Header */
      .book-section summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        list-style: none;

        font-size: 15px;
        font-weight: 700;
        color: #7356a5;

        padding: 12px 14px;
        background: rgba(255, 255, 255, 0.55);
        border-left: 3px solid #7356a5;
        border-radius: 8px;

        transition: background 0.2s ease;
      }

      .book-section summary:hover {
        background: rgba(255, 255, 255, 0.85);
      }

      /* Hide default arrow */
      .book-section summary::-webkit-details-marker {
        display: none;
      }

      /* Custom Arrow */
      .arrow {
        width: 8px;
        height: 8px;
        border-right: 2px solid #7356a5;
        border-bottom: 2px solid #7356a5;
        transform: rotate(45deg);
        transition: transform 0.25s ease;
        margin-right: 4px;
        margin-top: -4px;
      }

      .book-section[open] .arrow {
        transform: rotate(225deg);
        margin-top: 4px;
      }

      /* Menu Content */
      .book-menus {
        padding: 10px 8px 4px 12px;
        animation: slideDown 0.25s ease;
      }

      .book-menus my-menu {
        display: block;
        margin-bottom: 8px;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-5px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        nav[slot="menu"] {
          padding: 12px 8px;
        }
      }
    </style>

    <app-sidebar width="280px">
      <nav slot="menu">
        <h2>My Application</h2>
        ${menuHTML}
      </nav>

      <slot></slot>
    </app-sidebar>
  `;
  }
}

if (!customElements.get("my-sidebar")) {
  customElements.define("my-sidebar", SideBarTemplate);
}
