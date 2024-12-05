class IngredienteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement("div");
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .form-container {
                max-width: 400px;
                margin: 20px auto;
                padding: 20px;
                background: #ffffff;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                font-family: 'Arial', sans-serif;
            }

            .form-container h2 {
                text-align: center;
                margin-bottom: 20px;
                color: #333;
                font-size: 24px;
            }

            form label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                color: #555;
            }

            form input {
                width: calc(100% - 20px);
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 6px;
                box-sizing: border-box;
                font-size: 14px;
                outline: none;
                transition: border-color 0.3s ease;
            }

            form input:focus {
                border-color: #4caf50;
            }

            form button {
                width: 100%;
                padding: 10px;
                background-color: #4caf50;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            form button:hover {
                background-color: #0056b3;
            }

            .error-alert {
                color: red;
                font-weight: bold;
                text-align: center;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        this.container.innerHTML = `
            <div class="form-container">
                <h2>Registro de Ingredientes</h2>
                <form id="ingrediente-form">
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre"  required>

                    <label for="cantidad_disponible">Cantidad Disponible</label>
                    <input type="number" name="cantidad_disponible" id="cantidad_disponible" required>

                    <button type="submit">Registrar</button>
                </form>
            </div>
        `;

        this.shadowRoot.querySelector("#ingrediente-form").addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const cantidad_disponible = this.shadowRoot.querySelector('#cantidad_disponible').value;

        const newIngrediente = {
            nombre,
            cantidad_disponible
        };

        try {
            const response = await fetch('http://localhost:8000/ingredientes', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newIngrediente)
            });

            if (response.ok) {
                alert('Ingrediente registrado');
                this.shadowRoot.querySelector("#ingrediente-form").reset();
            } else {
                alert('Error al registrar el ingrediente');
            }
        } catch (error) {
            console.log(`Error al realizar fetch ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    }
}

window.customElements.define('ingrediente-form', IngredienteForm);
