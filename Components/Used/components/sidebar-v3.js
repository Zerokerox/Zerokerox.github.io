class AppSidebar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --sidebar-width: 280px;
          --sidebar-bg: #171923;
          --sidebar-color: #ffffff;

          display: block;
        }

        .wrapper {
          position: relative;
          width: 100%;
        }

        .sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          width: var(--sidebar-width);
          height: 100dvh;
          background: var(--sidebar-bg);
          color: var(--sidebar-color);
          transform: translateX(-100%);
          transition: transform .3s ease;
          z-index: 1000;
          overflow-y: auto;
          box-sizing: border-box;
          padding: 20px;
          margin: 7px 0;
        }

        .content {
          min-height: 100vh;
          transform: translateX(0);
          transition: transform .3s ease;
        }

        .wrapper.open .sidebar {
          transform: translateX(0);
        }

        .wrapper.open .content {
          transform: translateX(var(--sidebar-width));
        }

        .toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1001;

          width: 42px;
          height: 42px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;

          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;

          background: #6366f1;
          color: white;

          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

          transition:
            left .3s ease,
            background .2s ease,
            transform .2s ease;
        }

        .toggle span {
          display: block;
          width: 18px;
          height: 2px;
          border-radius: 2px;
          background: white;
          transition: .2s ease;
        }

        .toggle:hover {
          background: #4f46e5;
          transform: scale(1.05);
        }

        .toggle:active {
          transform: scale(.95);
        }

        .wrapper.open .toggle {
          left: calc(var(--sidebar-width) + 20px);
        }

        @media (max-width: 600px) {
          .wrapper.open .content {
            transform: translateX(var(--sidebar-width));
          }
        }
      </style>

      <div class="wrapper">
        <aside class="sidebar">
          <slot name="menu"></slot>
        </aside>

        <button class="toggle" aria-label="Toggle menu">
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

    // set default open
    this.wrapper.classList.add("open");

    this.toggle.addEventListener("click", () => {
      this.toggleSidebar();
    });
  }

  connectedCallback() {
    this.style.setProperty(
      "--sidebar-width",
      this.getAttribute("width") || "280px",
    );
  }

  toggleSidebar() {
    const isOpen = this.wrapper.classList.toggle("open");

    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { open: isOpen },
        bubbles: true,
        composed: true,
      }),
    );
  }

  open() {
    this.wrapper.classList.add("open");
  }

  close() {
    this.wrapper.classList.remove("open");
  }
}

customElements.define("app-sidebar", AppSidebar);
