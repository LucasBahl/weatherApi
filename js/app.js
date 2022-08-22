const ciudad = document.getElementById("ciudad");
const pais = document.getElementById("pais");
let translate = {
  temp: "temperatura",
  feels_like: "Sensacion Termica",
  temp_min: "Temperatura Minima",
  temp_max: "Temperatura Maxima",
  pressure: "Presion",
  humidity: "Humedad",
};

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("submit", (e) => {
    e.preventDefault();

    const APIkey = "856be8b11b73208452e65a78b81ec708";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value},${pais.value}&appid=${APIkey}&units=metric`;
    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        await limpiarHTML();
        if (data.cod === "404") {
          // container.appendChild(mostrarError('No existe la ciudad'))
          alert("No existe ciudad");
          return;
        }
        await insertHTML(data);
      });
  });

  function insertHTML(response) {
    for (variable in response.main) {
      let div = document.createElement("div");
      let card = document.querySelector("#result");
      div.className = "results";
      div.textContent = `${translate[variable]
        .replace("_", " ")
        .toUpperCase()}: ${parseInt(response.main[variable])}`;
      card.appendChild(div);
    }
  }



  function limpiarHTML() {
    let resultado = document.querySelector("#result");
    while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
    }
  }
});
