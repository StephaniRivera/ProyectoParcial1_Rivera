class IngredienteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.container = document.createElement('div');

        this.modal = document.createElement('div');
        this.modal.style.display = 'none'; 
        this.modal.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-content">
                    <h3>Actualizar Ingrediente</h3>
                    <form id="update-form">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required>
                        
                        <label for="cantidad">Cantidad Disponible:</label>
                        <input type="number" id="cantidad" name="cantidad" required>
                        
                        <button type="button" id="cancel-btn">Cancelar</button>
                        <button type="submit" id="update-btn">Actualizar</button>
                    </form>
                </div>
            </div>
        `;

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
            .actions button {
                margin: 0 5px;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .btn-update {
                background-color: #4caf50;
                color: white;
            }
            .btn-delete {
                background-color: #f44336;
                color: white;
            }
            .error-alert {
                color: red;
                font-weight: bold;
            }
            .empty-alert {
                color: gray;
                font-style: italic;
            }
            .modal-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .modal-content {
                background: white;
                padding: 20px;
                border-radius: 8px;
                width: 400px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            form label {
                display: block;
                margin: 10px 0 5px;
            }
            form input {
                width: 100%;
                padding: 8px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            form button {
                padding: 10px 15px;
                margin-right: 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            #cancel-btn {
                background: #f44336;
                color: white;
            }
            #update-btn {
                background: #4caf50;
                color: white;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
        this.shadowRoot.appendChild(this.modal);
    }

    connectedCallback() {
        const apiUrl = this.getAttribute('api-url');
        this.fetchData(apiUrl);
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const ingredientes = data || [];
            this.render(ingredientes);
        } catch (error) {
            console.error("Error con la API", error);
            this.container.innerHTML = `<p class="error-alert">Error con la API</p>`;
        }
    };

    render = (ingredientes) => {
        if (ingredientes.length === 0) {
            this.container.innerHTML = `<p class="empty-alert">No hay ingredientes disponibles</p>`;
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cantidad Disponible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        ingredientes.forEach((ingrediente) => {
            tableHTML += `
                <tr>
                    <td>${ingrediente.id_ingrediente}</td>
                    <td>${ingrediente.nombre}</td>
                    <td>${ingrediente.cantidad_disponible}</td>
                    <td class="actions">
                        <button class="btn-update" data-id="${ingrediente.id_ingrediente}">Actualizar</button>
                        <button class="btn-delete" data-id="${ingrediente.id_ingrediente}">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        this.container.innerHTML = tableHTML;

        this.container.querySelectorAll('.btn-delete').forEach((button) => {
            button.addEventListener('click', () => this.handleDelete(button.dataset.id));
        });

        this.container.querySelectorAll('.btn-update').forEach((button) => {
            button.addEventListener('click', () => this.showUpdateModal(button.dataset.id));
        });
    };

    handleDelete = async (id) => {
        const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar el ingrediente con ID: ${id}?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8000/ingredientes/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Ingrediente eliminado con éxito');
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchData(apiUrl);
                } else {
                    alert('Error al eliminar el ingrediente');
                }
            } catch (error) {
                console.error("Error en la eliminación", error);
                alert('Error con la conexión de la API');
            }
        }
    };

    showUpdateModal = (id) => {
        const ingrediente = [...this.container.querySelectorAll('tr')]
            .map(row => ({
                id: row.querySelector('.btn-update')?.dataset.id,
                nombre: row.cells[1]?.innerText,
                cantidad: row.cells[2]?.innerText,
            }))
            .find(item => item.id == id);

        if (!ingrediente) return;

        this.modal.style.display = 'flex';
        this.modal.querySelector('#nombre').value = ingrediente.nombre;
        this.modal.querySelector('#cantidad').value = ingrediente.cantidad;

        const form = this.modal.querySelector('#update-form');
        const cancelButton = this.modal.querySelector('#cancel-btn');

        const updateHandler = async (event) => {
            event.preventDefault();
            const updatedName = form.nombre.value;
            const updatedQuantity = form.cantidad.value;

            try {
                const response = await fetch(`http://localhost:8000/ingredientes/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: updatedName, cantidad_disponible: parseInt(updatedQuantity, 10) }),
                });

                if (response.ok) {
                    alert('Ingrediente actualizado con éxito');
                    this.modal.style.display = 'none';
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchData(apiUrl);
                } else {
                    alert('Error al actualizar el ingrediente');
                }
            } catch (error) {
                console.error("Error en la actualización", error);
                alert('Error con la conexión de la API');
            }
        };

        form.onsubmit = updateHandler;
        cancelButton.onclick = () => {
            this.modal.style.display = 'none';
        };
    };
}

window.customElements.define('ingrediente-list', IngredienteList);