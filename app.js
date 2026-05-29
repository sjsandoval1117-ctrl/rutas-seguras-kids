

import { validateStudent, validateRoute } from "./validaciones.js";


let routes = JSON.parse(localStorage.getItem("routes")) || [];


const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");

const user = document.getElementById("user");
const pass = document.getElementById("pass");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

const routesContainer = document.getElementById("routesContainer");
const studentRoute = document.getElementById("studentRoute");
const studentsBody = document.getElementById("studentsBody");


const studentName = document.getElementById("studentName");
const studentGrade = document.getElementById("studentGrade");


const routeName = document.getElementById("routeName");
const city = document.getElementById("city");
const time = document.getElementById("time");
const driverSelect = document.getElementById("driverSelect");


const msgBox = document.getElementById("msgBox");


function showMessage(text, type) {

  msgBox.textContent = text;
  msgBox.className = type;
  msgBox.style.display = "block";

  setTimeout(() => {
    msgBox.style.display = "none";
  }, 2000);
}

loginBtn.onclick = () => {

  if (user.value === "admin" && pass.value === "5647") {

    loginScreen.style.display = "none";
    app.style.display = "block";

  } else {

    loginError.textContent =
    "Usuario o contraseña incorrectos";
  }
};
document.getElementById("createRoute").onclick = async () => {

  const valid = validateRoute(
    routeName.value,
    city.value,
    time.value,
    driverSelect.value
  );

  if (valid !== true) {

    showMessage(valid, "error");
    return;
  }

  const weather = await getWeather(city.value);

  routes.push({

    id: Date.now(),

    name: routeName.value,

    city: city.value,

    time: time.value,

    students: []
  });

  save();
  renderAll();

  routeName.value = "";
  city.value = "";
  driverSelect.value = "";

  showMessage(
    "Ruta creada correctamente",
    "success"
  );
};

document.getElementById("addStudent").onclick = () => {

  const valid = validateStudent(
    studentName.value,
    studentRoute.value
  );

  if (valid !== true) {

    showMessage(valid, "error");
    return;
  }

  const route = routes.find(
    r => r.name === studentRoute.value
  );

  if (route) {

    route.students.push({

      id: Date.now(),

      name: studentName.value,

      route: studentRoute.value,

      color: studentColor.value,
      
    });
  }

  save();
  renderAll();

  studentName.value = "";
  studentGrade.value = "";
  studentRoute.value = "";

  showMessage(
    "Estudiante agregado correctamente",
    "success"
  );
};

function save() {

  localStorage.setItem(
    "routes",
    JSON.stringify(routes)
  );
}

function renderAll() {

  renderRoutes();
  renderStudents();
}

function renderRoutes() {

  routesContainer.innerHTML = "";
  studentRoute.innerHTML = "";

  routes.forEach(r => {

    const count = r.students.length;

    const div = document.createElement("div");

    div.className = "block";

    div.innerHTML = `
      <h3>${r.name}</h3>

      <p>
        <b>Conductor:</b>
        ${r.driver}
      </p>

      <p>
        <b>Lugar:</b>
        ${r.city}
      </p>

      <p>
        <b>Hora:</b>
        ${r.time}
      </p>

      <p>
        <b>Pasajeros:</b>
        ${count}
        ${count === 1
          ? "estudiante"
          : "estudiantes"}
      </p>

      <button onclick="editRoute(${r.id})">
        Actualizar
      </button>

      <button onclick="deleteRoute(${r.id})">
        Eliminar
      </button>
    `;

    routesContainer.appendChild(div);

    const opt = document.createElement("option");

    opt.value = r.name;

    opt.textContent = r.name;

    studentRoute.appendChild(opt);
  });
}

function renderStudents() {

  studentsBody.innerHTML = "";

  routes.forEach(r => {

    r.students.forEach(s => {

      const row =
      document.createElement("tr");

      row.innerHTML = `
        <td>${s.name}</td>

        <td>${r.name}</td>

        <td>${s.name}</td>

        <td>${r.name}</td>

        <td>${s.name}</td>

        <td>${r.name}</td>

        <td>
          <button onclick="
            this.parentElement
            .parentElement
            .remove()
          ">
            X
          </button>
        </td>
      `;

      studentsBody.appendChild(row);
    });
  });
}

window.deleteRoute = (id) => {

  routes = routes.filter(
    r => r.id !== id
  );

  save();
  renderAll();

  showMessage(
    "Ruta eliminada correctamente",
    "success"
  );
};

window.editRoute = (id) => {

  const r = routes.find(
    x => x.id === id
  );

  const n = prompt(
    "Nombre ruta",
    r.name
  );

  const c = prompt(
    "Lugar",
    r.city
  );

  const t = prompt(
    "Hora",
    r.time
  );

  if (n) r.name = n;
  if (c) r.city = c;
  if (t) r.time = t;

  save();
  renderAll();

  showMessage(
    "Ruta actualizada correctamente",
    "success"
  );
};

renderAll();