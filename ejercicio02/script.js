let urlData = "http://localhost:3000/data";
const createDatas = () => {
  const name = document.getElementById("name").value;
  const grades = document.getElementById("grades").value;
  if (name === "") {
    alert("El campo nombre esta vacío");
    return false; // Simage.pnge pare la aplicación
  }
  if (grades === "") {
    alert("El campo apellido esta vacío");
    return false;
  }

  if (name.length < 3) {
    alert("El campo nombre debe tener mínimo 3 caracteres");
    return false;
  }

  if (grades > 10) {
    alert("El campo califacion debe tener mínimo 10");
    return false;
  }
  const newData = {
    name: name,
    grades: grades,
  };

  createData(newData);
};

const createData = async (data) => {
  const resp = await fetch(urlData, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST", // nuevos elementos
    body: JSON.stringify(data),
  });
  const customers = await resp.json();
  console.log(customers);
};

const getDatas = () => {  // padre
  const books = async () => {
    const resp = await fetch(urlData, {
      method: "GET", // traer elementlos
    });
    const data = await resp.json();
    showCustomers(data);// function
    showChart(data);// function
  };
  books();
};

const showCustomers = (students) => { //hijo 1
  students.forEach((element, index) => {
    let texth1 = document.createElement("tr");
    texth1.innerHTML = `
      <td>${index + 1}</td>
      <td>${element.name}</td>
      <td>${element.grades}</td>`;
    document.getElementsByTagName("tbody")[0].appendChild(texth1);
  });
};

const showChart = (data) => { //hijo 2
  const ctx = document.getElementById("myChart").getContext("2d");
  let labels = [];
  let dataValue = [];
  console.log(data);
  let prom = 0;
  data.forEach((data) => {
    labels.push(data.name);
    dataValue.push(data.grades);
    prom = prom + parseInt(data.grades);
  });
  const dataChart = {
    labels: labels,
    datasets: [
      {
        label: `El promedio de la clase es ${prom / dataValue.length} `,
        backgroundColor: "rgb(76, 255, 51)",
        borderColor: "rgb(76, 255, 51)",
        data: dataValue,
      },
    ],
  };
  const config = {
    type: "line",
    data: dataChart,
    options: {},
  };

  const myChart = new Chart(ctx, config);
};
getDatas();