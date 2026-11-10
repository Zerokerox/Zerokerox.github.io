class AppSidebar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --sidebar-width: 280px;
          --sidebar-bg: rgba(255, 255, 255, 0.72);
          --sidebar-color: #45546b;
          --glass-border: rgba(255, 255, 255, 0.85);
          --glass-shadow: 0 8px 32px rgba(70, 85, 130, 0.12);
          --glass-blur: 22px;
          --primary-color: #7356a5;

          display: block;
          min-height: 100vh;
          color: var(--sidebar-color);
        }

        * {
          box-sizing: border-box;
        }

        .wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }

        /* =========================
           GLASS SIDEBAR
        ========================= */

        .sidebar {
          position: fixed;
          inset: 0 auto 0 0;

          width: min(var(--sidebar-width), calc(100vw - 48px));
          height: 100dvh;

          padding: 76px 16px 24px;

          background: var(--sidebar-bg);
          color: var(--sidebar-color);

          border-right: 1px solid var(--glass-border);
          border-radius: 0 24px 24px 0;

          box-shadow: var(--glass-shadow);

          backdrop-filter: blur(var(--glass-blur));
          -webkit-backdrop-filter: blur(var(--glass-blur));

          transform: translateX(-105%);
          transition: transform .35s cubic-bezier(.22,1,.36,1);

          z-index: 1000;
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .sidebar::-webkit-scrollbar {
          width: 5px;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(115, 86, 165, 0.25);
          border-radius: 10px;
        }

        .wrapper.open .sidebar {
          transform: translateX(0);
        }

        /* =========================
           CONTENT
        ========================= */

        .content {
          position: relative;
          width: 100%;
          min-height: 100vh;

          transform: translateX(0);

          transition: transform .35s cubic-bezier(.22,1,.36,1);
        }

        /* Desktop: Push Content */

        @media (min-width: 769px) {
          .wrapper.open .content {
            transform: translateX(var(--sidebar-width));
          }
        }

        /* =========================
           GLASS TOGGLE BUTTON
        ========================= */

        .toggle {
          position: fixed;

          top: 18px;
          left: 18px;

          z-index: 1002;

          width: 46px;
          height: 46px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;

          cursor: pointer;

          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 15px;

          background: rgba(255,255,255,0.72);
          color: var(--primary-color);

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          box-shadow:
            0 5px 18px rgba(70,85,130,0.12),
            inset 0 1px 1px rgba(255,255,255,0.9);

          transition:
            left .35s cubic-bezier(.22,1,.36,1),
            background .2s ease,
            transform .2s ease;
        }

        .toggle span {
          display: block;

          width: 19px;
          height: 2px;

          border-radius: 5px;
          background: var(--primary-color);

          transition: .25s ease;
        }

        .toggle:hover {
          background: rgba(255,255,255,0.95);
          transform: scale(1.06);
        }

        .toggle:active {
          transform: scale(.94);
        }

        .toggle:focus-visible {
          outline: 3px solid rgba(115,86,165,0.5);
          outline-offset: 4px;
        }

        .wrapper.open .toggle {
          left: calc(var(--sidebar-width) + 18px);
        }

        .wrapper.open .toggle span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .wrapper.open .toggle span:nth-child(2) {
          opacity: 0;
        }

        .wrapper.open .toggle span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* =========================
           MOBILE OVERLAY
        ========================= */

        .overlay {
          display: none;

          position: fixed;
          inset: 0;

          z-index: 999;

          width: 100%;
          height: 100%;

          border: none;
          background: rgba(40, 50, 75, 0.20);

          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);

          opacity: 0;
          pointer-events: none;

          transition: opacity .3s ease;
        }

        @media (max-width: 768px) {

          .wrapper.open .content {
            transform: none;
          }

          .wrapper.open .toggle {
            left: min(
              calc(var(--sidebar-width) + 18px),
              calc(100vw - 64px)
            );
          }

          .overlay {
            display: block;
          }

          .wrapper.open .overlay {
            opacity: 1;
            pointer-events: auto;
          }

          .sidebar {
            border-radius: 0 22px 22px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sidebar,
          .content,
          .toggle,
          .toggle span,
          .overlay {
            transition: none;
          }
        }
      </style>

      <div class="wrapper">

        <aside class="sidebar">
          <slot name="menu"></slot>
        </aside>

        <button
          class="overlay"
          aria-label="Close menu"
          tabindex="-1"
        ></button>

        <button
          class="toggle"
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="sidebar"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <main class="content">
          <slot></slot>
        </main>

      </div>
    `;

    this.wrapper = this.shadowRoot.querySelector(".wrapper");
    this.toggle = this.shadowRoot.querySelector(".toggle");
    this.overlay = this.shadowRoot.querySelector(".overlay");
    this.sidebar = this.shadowRoot.querySelector(".sidebar");

    this.toggle.addEventListener("click", () => {
      this.toggleSidebar();
    });

    this.overlay.addEventListener("click", () => {
      this.close();
    });

    this._handleKeydown = (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    };
  }

  connectedCallback() {
    this.style.setProperty(
      "--sidebar-width",
      this.getAttribute("width") || "280px",
    );

    document.addEventListener("keydown", this._handleKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleKeydown);
  }

  toggleSidebar() {
    const isOpen = this.wrapper.classList.toggle("open");

    this.toggle.setAttribute("aria-expanded", String(isOpen));

    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { open: isOpen },
        bubbles: true,
        composed: true,
      }),
    );
  }

  open() {
    if (this.wrapper.classList.contains("open")) return;

    this.wrapper.classList.add("open");
    this.toggle.setAttribute("aria-expanded", "true");

    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { open: true },
        bubbles: true,
        composed: true,
      }),
    );
  }

  close() {
    if (!this.wrapper.classList.contains("open")) return;

    this.wrapper.classList.remove("open");
    this.toggle.setAttribute("aria-expanded", "false");

    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { open: false },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

if (!customElements.get("app-sidebar")) {
  customElements.define("app-sidebar", AppSidebar);
}
