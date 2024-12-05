class MiHeader extends HTMLElement {
    constructor() {
        super();
    
        this.attachShadow({ mode: "open" });
        
        const estilo = document.createElement("style");
        estilo.textContent = `
            :host {
                display: block;
                width: 100%;
                background: linear-gradient(90deg, #ff7e5f, #feb47b);
                color: white;
                text-align: center;
                padding: 20px 0;
                font-family: 'Georgia', serif;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            header {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
            }

            h1 {
                margin: 0;
                font-size: 2em;
                color: #fff;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }

        `;

        const template = document.createElement("template");
        template.innerHTML = `
            <header>
                <h1>Proyecto Primer Parcial</h1>
            </header>
        `;

        this.shadowRoot.appendChild(estilo);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define("mi-header", MiHeader);
