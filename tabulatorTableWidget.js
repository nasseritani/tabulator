const tabLink = document.createElement('link');
tabLink.rel = 'stylesheet';
tabLink.href = 'https://unpkg.com/tabulator-tables@5.3.3/dist/css/tabulator.min.css';
document.head.appendChild(tabLink);

const tabScript = document.createElement('script');
tabScript.src = 'https://unpkg.com/tabulator-tables@5.3.3/dist/js/tabulator.min.js';
document.head.appendChild(tabScript);

(function () {
    let template = document.createElement("template");
    template.innerHTML = ``;

    class TabulatorWidget extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));
            this._props = {};
        }

        async connectedCallback() {
            this.initTable();
        }

        async initTable() {
            if (this.shadowRoot.querySelector("#tabulator")) return; // Prevent multiple initializations

            // Create a div for Tabulator
            const tableDiv = document.createElement("div");
            tableDiv.id = "tabulator";
            this.shadowRoot.appendChild(tableDiv);

            // Initialize Tabulator table
            this.table = new Tabulator(tableDiv, {
                layout: "fitColumns",
                responsiveLayout: "hide",
                data: this._props.tableData || [],
                columns: this._props.columns || [
                    { title: "ID", field: "id", width: 100 },
                    { title: "Name", field: "name", width: 150 },
                    { title: "Age", field: "age", align: "left", formatter: "progress" },
                ],
            });
        }

        setValue() {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: { properties: { tableData: [] } }
            }));
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            this.initTable();
            this.setValue();
        }
    }

    customElements.define("com-tabulator-widget", TabulatorWidget);
})();
