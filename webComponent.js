class ArticleCard extends HTMLElement {

  constructor() {

    super();

    
    this.attachShadow({
      mode: "open"
    });
  }

  connectedCallback() {

    this.shadowRoot.innerHTML = `

      <style>

        .card{
          background:white;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 2px 10px rgba(255,182,193,0.3);
        }

        img{
          width:100%;
          height:180px;
          object-fit:cover;
        }

        .content{
          padding:15px;
        }

        h2{
          margin:0;
          color:#d46a92;
        }

        h4{
          margin:10px 0;
          color:#c85a85;
        }

        p{
          color:#555;
          font-size:14px;
        }

        button{
          margin-top:10px;
          padding:10px;
          border:none;
          border-radius:8px;
          background:#f4a6c1;
          color:white;
          cursor:pointer;
          width:100%;
        }

        button:hover{
          background:#e78bad;
        }

        .extra{
          display:none;
          margin-top:10px;
        }

        .show{
          display:block;
        }

      </style>

      <div class="card">`

  }}