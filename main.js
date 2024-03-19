

const p = document.getElementById("p");
const q = document.getElementById("q");
const btn = document.getElementById("btn");
let n = document.getElementById("n");
let fi = document.getElementById("fi");
let palabra = document.getElementById("palabra");
let e = BigInt(17);
let dFi = 0;
let d = document.getElementById("d");
const btnCifrar = document.getElementById("btn-cifrar");
const btnDescifrar = document.getElementById("btn-descifrar");
let palabraCifrada = [];
let fraseDescifrada = [];
let palabraCifrar = document.getElementById("palabra-cifrar");
let word = document.getElementById("word");
let palabraDescifrar = document.getElementById("palabra-descifrar");


btn.addEventListener("click", (event) => {
    event.preventDefault();
    p.value = BigInt(generarPrimo());
    q.value = BigInt(generarPrimo());
    n.value = calcularN(p.value, q.value);
    fi.value = calcularFi(p.value, q.value);
    dFi = modInverse(e, BigInt(fi.value));
    d.value = dFi;


})

function esPrimo(numero) {
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return numero > 1;
}

function generarPrimo() {
    let numeroPrimo;
    do {
        numeroPrimo = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    } while (!esPrimo(numeroPrimo));
    return numeroPrimo;
}

function calcularN(p, q) {
    return p * q
}

function calcularFi(p, q) {

    let fiNumber = ((p - 1) * (q - 1))
    if (fiNumber !== 0) {
        return fiNumber;

    }
    else {
        console.log("Error: El valor de 'fi' es cero. Asegúrate de que 'p' y 'q' sean primos válidos.");
    }
}

console.log("Número primo al azar entre 100 y 999:");

function modInverse(a, m) {
    let m0 = m;
    let x0 = 0n;
    let x1 = 1n;


    if (m === 1n) {
        return 0n;
    }

    while (a > 1n) {
        // q es el cociente de la división euclidiana de m por a
        const q = a / m;
        let t = m;

        // m se actualiza como el residuo de la división euclidiana anterior
        m = a % m;
        a = t;

        // Actualizando x0 y x1
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    // Asegurando que x1 sea positivo
    if (x1 < 0) {
        x1 += m0;
    }

    return x1;
}

btnCifrar.addEventListener("click", (event) => {
    event.preventDefault();
    palabraCifrada = [];
    if (BigInt(n.value) !== 0n) {
        palabraCifrada = palabra.value.split("").map((letra) => {
            return (BigInt(letra.charCodeAt(0)) ** e) % BigInt(n.value);
        });
        console.log("Palabra cifrada: ", palabraCifrada);
    } else {
        console.error("Error: El valor de 'n' es cero. Asegúrate de que 'p' y 'q' sean primos válidos.");
    }
    const cadena = palabraCifrada.join(" ");
    console.log(cadena);
    palabraCifrar.value = cadena;

});

btnDescifrar.addEventListener("click", (event) => {
    event.preventDefault();
    let fraseDescifrada = word.value.split(" ").map((letra) => {
        return String.fromCharCode(Number((BigInt(letra) ** dFi) % BigInt(n.value)));
    });
    fraseDescifrada = fraseDescifrada.join("");
    console.log(fraseDescifrada);
    palabraDescifrar.value = fraseDescifrada;



})



