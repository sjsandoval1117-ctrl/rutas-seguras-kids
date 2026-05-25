class ArticleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    const title = this.getAttribute("title");
    const short = this.getAttribute("short");
    const desc = this.getAttribute("desc");
    const img = this.getAttribute("img");

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: white;
          padding: 12px;
          border-radius: 12px;
          box-shadow: 0 3px 10px rgba(108,92,231,0.15);
          text-align: center;
        }

        h4 { color:#6c5ce7; }

        img {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .full { display:none; }

        button {
          width:100%;
          background:#6c5ce7;
          color:white;
          border:none;
          padding:8px;
          margin-top:10px;
        }
      </style>

      <div class="card">
        <img src="${img}">
        <h4>${title}</h4>
        <p>${short}</p>
        <p class="full">${desc}</p>
        <button>Ver más</button>
      </div>
    `;

    const btn = this.shadowRoot.querySelector("button");
    const full = this.shadowRoot.querySelector(".full");

    btn.onclick = () => {
      full.style.display = full.style.display === "block" ? "none" : "block";
      btn.textContent = full.style.display === "block" ? "Ver menos" : "Ver más";
    };
  }
}

customElements.define("article-card", ArticleCard);