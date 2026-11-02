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

          cursor: pointer;
          padding: 10px 14px;
          border: 0;
          border-radius: 6px;
          background: #6366f1;
          color: white;
          font-size: 15px;

          transition: left .3s ease;
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

        <button class="toggle">
          ☰ Menu
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
