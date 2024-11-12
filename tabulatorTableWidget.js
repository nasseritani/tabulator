import 'https://cdn.jsdelivr.net/npm/tabulator-tables@5.0.7/dist/js/tabulator.min.js';

class TabulatorTableWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const container = document.createElement("div");
    container.setAttribute("id", "table");
    this.shadowRoot.appendChild(container);

    const defaultData = this.tableData || [
      { id: 1, name: "John Doe", age: 29, gender: "Male", rating: 4, date: "2023-01-01" },
      { id: 2, name: "Jane Smith", age: 32, gender: "Female", rating: 5, date: "2023-05-10" }
    ];

    const table = new Tabulator(container, {
      data: defaultData,
      layout: "fitColumns",
      columns: [
        { title: "ID", field: "id", sorter: "number", width: 100 },
        { title: "Name", field: "name", editor: "input" },
        { title: "Age", field: "age", sorter: "number", editor: "number" },
        { title: "Gender", field: "gender", editor: "select", editorParams: { values: ["Male", "Female"] } },
        { title: "Rating", field: "rating", sorter: "number", editor: "star", hozAlign: "center" },
        { title: "Date", field: "date", sorter: "date", editor: "input", editorParams: { elementAttributes: { type: "date" } } }
      ]
    });

    this.refreshData = (newData) => {
      table.replaceData(newData);
    };
  }

  static get observedAttributes() {
    return ["tableData"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "tableData") {
      this.refreshData(JSON.parse(newValue));
    }
  }
}

customElements.define("tab", TabulatorTableWidget);
