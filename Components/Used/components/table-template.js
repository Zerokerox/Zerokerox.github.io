class MyTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;

    this.shadowRoot.innerHTML = `
      <style>
        
:host {
  display: block;
  width: 100%;
}

.table-container {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  align-items: stretch;
}

.table-cell {
  min-width: 0;
  width: 100%;
}

/* Tablet */
@media (max-width: 1100px) {
  .table-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Mobile */
@media (max-width: 600px) {
  .table-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 10px;
  }
}

      </style>

      <div class="table-container">
        ${Array.from(
          { length: 32 },
          (_, index) => `
            <div class="table-cell" data-cell="${index + 1}">
              <slot name="cell-${index + 1}"></slot>
            </div>
          `,
        ).join("")}
      </div>
    `;
  }
}

if (!customElements.get("my-table")) {
  customElements.define("my-table", MyTable);
}
