class Perfil extends HTMLElement {
    constructor() {
        super();
       
        this.attachShadow({ mode: "open" });

        this.estilo = document.createElement("style");
        this.estilo.textContent = `
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .perfil-usuario {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 10px;
            width: 400px;
            max-width: 400px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            font-family: Arial, sans-serif;
        }

        .profile-pic {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 10px;
            object-fit: cover;
        }

        .username {
            font-size: 1.4em;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .bio {
            font-size: 1em;
            color: #666;
            margin-bottom: 15px;
            text-align: center;
        }

        .follow-button,
        .message-button {
            padding: 5px 7px; 
            margin: 5px;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
        }

        .follow-button {
            background-color: #007bff;
            color: #fff;
        }

        .follow-button:hover {
            background-color: #0056b3;
        }

        .message-button {
            background-color: #28a745;
            color: #fff;
        }

        .message-button:hover {
            background-color: #1c7430;
        }

        `;

        this.template = document.createElement("template");
        this.template.innerHTML = `
            <div class="perfil-usuario">
                <img src="" alt="Foto del usuario" class="profile-pic">
                <div class="username"></div>
                <div class="bio"></div>
                <button class="follow-button">Seguir</button>
                <button class="message-button">Mensaje</button>
            </div>
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const profilePic = this.getAttribute("profile-pic") || "https://i.pinimg.com/736x/af/87/0f/af870f76aa07267e17f5b2b1c7f3dc0a.jpg";
        const username = this.getAttribute("username") || "Stephani Rivera";
        const bio = this.getAttribute("bio") || "Estudiante de Ingenieria en Tecnologías de la Información";

        const profilePicEl = this.shadowRoot.querySelector(".profile-pic");
        const usernameEl = this.shadowRoot.querySelector(".username");
        const bioEl = this.shadowRoot.querySelector(".bio");

        profilePicEl.src = profilePic;
        profilePicEl.alt = `Foto de ${username}`;
        usernameEl.textContent = username;
        bioEl.textContent = bio;
    }
}

window.customElements.define("mi-perfil", Perfil);
