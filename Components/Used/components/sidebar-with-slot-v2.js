import "./menu-v2.js";
import "./sidebar-v4.js";

class SideBarTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
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

        nav ::slotted(my-menu) {
          display: block;
          margin-bottom: 8px;
        }

        slot {
          display: block;
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

          <my-menu
            target-url="./index.html"
            menu-name="Home"
          ></my-menu>

          <my-menu
            target-url="./characters.html"
            menu-name="Characters"
          ></my-menu>

          <my-menu
            target-url="./vowels.html"
            menu-name="Vowels"
          ></my-menu>

          <my-menu
            target-url="./สระอา.html"
            menu-name="สระอา"
          ></my-menu>

          <my-menu
            target-url="./สระอี.html"
            menu-name="สระอี"
          ></my-menu>

          <my-menu
            target-url="./สระอู.html"
            menu-name="สระอู"
          ></my-menu>

          <my-menu
            target-url="./สระเอ.html"
            menu-name="สระเอ"
          ></my-menu>

          <my-menu
            target-url="./สระอะ.html"
            menu-name="สระอะ"
          ></my-menu>

          <my-menu
            target-url="./สระอิ.html"
            menu-name="สระอิ"
          ></my-menu>

          <my-menu
            target-url="./สระอุ.html"
            menu-name="สระอุ"
          ></my-menu>

          <my-menu
            target-url="./สระโอ.html"
            menu-name="สระโอ"
          ></my-menu>

          <my-menu
            target-url="./สระใอ.html"
            menu-name="สระใอ"
          ></my-menu>

          <my-menu
            target-url="./สระไอ.html"
            menu-name="สระไอ"
          ></my-menu>

        </nav>

        <slot></slot>

      </app-sidebar>
    `;
  }
}

if (!customElements.get("my-sidebar")) {
  customElements.define("my-sidebar", SideBarTemplate);
}
