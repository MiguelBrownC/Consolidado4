class Personajes {
    constructor(name, height, mass) {
        this.name = name;
        this.height = height;
        this.mass = mass;
    }
}
const primGenerador = generador(1, 5);
const segGeneraor = generador(6, 11);
const terGeneraor = generador(12, 16);
let tarjetaUno = document.getElementById("tarjetaUno");
let tarjetaDos = document.getElementById("tarjetaDos");
let tarjetaTres = document.getElementById("tarjetaTres");

async function* generador(desde, hasta) {
    for (let i = desde; i <= hasta; i++) {
        let url = "https://swapi.dev/api/people/" + i;
        let response = await fetch(url);
        let data = await response.json();
        let { name, height, mass } = data;
        let nuevoPersonaje = new Personajes(name, height, mass);
        yield nuevoPersonaje;
    }
}

async function generadorTarjetas(id) {
    switch (id) {
        case "tarjetaUno":
            const primer = await primGenerador.next();
            return primer;
        case "tarjetaDos":
            const segundo = await segGeneraor.next();
            return segundo;
        case "tarjetaTres":
            const tercero = await terGeneraor.next();
            return tercero;
    }
}

async function consultarTarjeta(id) {
    const { value, done } = await generadorTarjetas(id);
    let div = document.getElementById(id);
    if (done) {
        console.log('No hay más personajes para mostrar');
    } else {
        let html = div.innerHTML;
        html += `
        <div class="card shadow-lg p-3 mb-5 bg-body rounded">
          <span class="circle" data-range="1-5"></span>
          <div class="d-flex">
            <span class="${id}-circle"></span>
            <h5>Altura: ${value.height}</h5>
            <h5>Nombre: ${value.name}</h5>
            <h5>Peso: ${value.mass}</h5>
          </div>
        </div>
        `
        div.innerHTML = html;
    }
};

tarjetaUno.addEventListener("click", (e) => {
    consultarTarjeta("tarjetaUno");
});

tarjetaDos.addEventListener("click", (e) => {
    consultarTarjeta("tarjetaDos");
});

tarjetaTres.addEventListener("click", (e) => {
    consultarTarjeta("tarjetaTres");
});
