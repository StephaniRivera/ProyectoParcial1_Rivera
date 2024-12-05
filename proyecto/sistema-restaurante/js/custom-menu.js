class CustomMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement('nav');
        this.container.innerHTML = `
            <style>
                .container-menu {
                    display: flex;
                    list-style-type: none;
                    background: linear-gradient(90deg, #f46b45, #f9d423);
                    padding: 15px 30px;
                    margin: 0;
                    justify-content: center;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                }

                .container-menu li {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                    margin: 0 20px; 
                    transition: transform 0.3s, color 0.3s;
                }

                .container-menu li:hover {
                    transform: scale(1.2);
                    color: #fff;
                }

                button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 15px;
                    cursor: pointer;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-weight: bold;
                    font-family: 'Georgia', serif;
                    transition: color 0.3s;
                }

                button:hover {
                    color: #ffd700;
                    text-decoration: underline;
                }
            </style>
            <ul class="container-menu">
                <li><button id="inicio">Inicio</button></li>
                <li><button id="platos">Platos</button></li>
                <li><button id="ingredientes">Ingredientes</button></li>
                <li><button id="platos-ingredientes">Platos y Ingredientes</button></li>
                <li><button id="acerca">Acerca de</button></li>
            </ul>
        `;
        this.shadowRoot.appendChild(this.container);

        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.container.querySelector('#inicio').addEventListener('click', this.handleClick);
        this.container.querySelector('#platos').addEventListener('click', this.handleClick);
        this.container.querySelector('#ingredientes').addEventListener('click', this.handleClick);
        this.container.querySelector('#platos-ingredientes').addEventListener('click', this.handleClick);
        this.container.querySelector('#acerca').addEventListener('click', this.handleClick);
    }

    handleClick(event) {
        const option = event.target.id;  
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: option, 
            bubbles: true, 
            composed: true  
        }));
    }
}

window.customElements.define('navbar-component', CustomMenu);