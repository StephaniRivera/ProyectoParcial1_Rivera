class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.container = document.createElement('div');
        this.container.innerHTML = `
            <navbar-component></navbar-component>
            <main id="content"></main>
        `;

        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        
        const contentElement = this.shadowRoot.querySelector('#content');

        this.shadowRoot.querySelector('navbar-component').addEventListener('navigate', (event) => {
            this.handleNavigation(event.detail, contentElement);
        });
    }

    handleNavigation(option, contentElement) {
        switch (option) {
            case 'inicio':
                contentElement.innerHTML = `<h1>Hola Bienvenido</h1>
                <h2>Esta es una aplicación para un sistema de restaurante</h2>
                <h3>Espero sea de su agrado <3 </h3>`;
                break;
            case 'platos':
                contentElement.innerHTML = `
                <platos-list api-url="http://localhost:8000/platos"></platos-list>
                <plato-form></plato-form>`;
                break;
            case 'ingredientes':
                contentElement.innerHTML = `
                <ingrediente-list api-url="http://localhost:8000/ingredientes"></ingrediente-list>
                 <ingrediente-form></ingrediente-form>`;
                break;
            case 'platos-ingredientes':
                contentElement.innerHTML = `
                    <ingredientesplatos-list api-url="http://localhost:8000/ingredientesplatos"></ingredientesplatos-list>
                `;
                break;
            case 'acerca':
                contentElement.innerHTML = `<mi-perfil></mi-perfil>`;
                break;
            default:
                contentElement.innerHTML = `<h1>Opción no válida</h1>`;
        }
    }
}

window.customElements.define('main-component', MainComponent);
