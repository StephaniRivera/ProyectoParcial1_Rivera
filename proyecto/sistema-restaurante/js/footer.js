class MiFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.estilo = document.createElement("style");
        
        this.estilo.textContent = `
            :host {
                display: block;
                width: 100%;
                background-color: #222;
                color: #fff;
                text-align: center;
                padding: 20px 0;
                font-family: Arial, sans-serif;
                font-size: 0.9em;
                position: fixed;
                bottom: 0;
                left: 0;
            }
        `;

        this.container = document.createElement('div');
        this.container.innerHTML = `
            <footer>
                Derechos reservados © ${new Date().getFullYear()}
            </footer>
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }
}

window.customElements.define("mi-footer", MiFooter);
