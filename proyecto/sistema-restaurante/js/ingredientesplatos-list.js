class IngredientesPlatosList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.container = document.createElement('div');

        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: left;
            }
            th, td {
                padding: 10px;
                border: 1px solid #ccc;
            }
            th {
                background-color: #f4f4f4;
            }
            .error-alert {
                color: red;
                font-weight: bold;
            }
            .empty-alert {
                color: gray;
                font-style: italic;
            }
        `;
        
        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        const apiUrl = this.getAttribute('api-url');
        this.fetchData(apiUrl);
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const ingredientesPlatos = data || [];
            this.render(ingredientesPlatos);
        } catch (error) {
            console.error("Error con la API", error);
            this.container.innerHTML = `<p class="error-alert">Error con la API</p>`;
        }
    };

    render = (ingredientesPlatos) => {
        if (ingredientesPlatos.length === 0) {
            this.container.innerHTML = `<p class="empty-alert">No hay relaciones entre ingredientes y platos disponibles</p>`;
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Plato Nombre</th>
                        <th>Cantidad Usada</th>
                    </tr>
                </thead>
                <tbody>
        `;

        ingredientesPlatos.forEach((item) => {
            tableHTML += `
                <tr>
                    <td>${item.plato_nombre}</td>
                    <td>${item.cantidad_usada}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        this.container.innerHTML = tableHTML;
    };
}

window.customElements.define('ingredientesplatos-list', IngredientesPlatosList);
