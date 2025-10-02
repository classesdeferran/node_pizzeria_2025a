// ENUNCIADO

// 1 - Mostrar el menú con las opciones:

// Menú de la pizzeria
// ===================

// A. Masa normal
// B. Masa espelta
// ....
// 1. tomate
// ...

// Al ejecutar el fichero el usuario hace la elección
// de los ingredientes, pero hay que respetar estas
// condiciones:

// 1) Tiene que elegir un tipo de masa, pero solo uno
// 2) Tiene que elegir como mínimo tres ingredientes y
// como máximo cinco. Si elige menos, mostraremos
// un mensaje de error, si elige más de 5, sólo
// utilizaremos los cinco primeros.
// 3) Si no se indican los ingredientes aparece el menú.
// 4) No se pueden repetir los ingredientes.

// Ejemplo:
// node ./pizzeria.js C 1 3 5 6

// Con esto, indicaremos al usuario que ha elegido y cuanto cuesta.
// "Preparamos tu pizza con masa sin gluten, tomate, champiñones, parmesano, bacon."
// "Precio: 14.40€"

// Obtener los ingredientes desde el fichero
const ingredientes = require("./ingredientes");
// console.log(ingredientes);

// node pizzeria.js -> aparece el menu
// node pizzeria.js A 1 2 3 -> hacemos la selección

const elecciones = process.argv.slice(2);
// console.log(elecciones);

if (elecciones.length === 0) {
  mostrarMenu();
} else {

    if (elecciones.length < 4 ) {
        console.log("Faltan ingredientes");
    } else if (ingredientes.length > 6) {
        console.log("Sobran ingredientes");
    } else {
        let masas = []
        let ingredientesPizza = []

        // Validación de la elección de la masa
        for (item of elecciones) {
            item = item.toLocaleUpperCase()
            if (item >= "A" && item <= "Z" && (item in ingredientes) ) {
                masas.push(item)
            }                
        }
        if (masas.length > 1) {
            console.log("Sólo puedes elegir un tipo de masa para la pizza");
            process.exit(1)
        }

        // Validación de los ingredientes (por número)
        for (item of elecciones) {
    
            if (item >= 1 && item <= 99 && item in ingredientes) {
                if (!ingredientesPizza.includes(item))
                    ingredientesPizza.push(item)
            } 
        } 
        if (ingredientesPizza.length < 3 || ingredientesPizza.length > 5) {
            let mensajeError = `Has elegido ${ingredientesPizza.length} ingrediente`
            mensajeError += "\nTe recordamos que deben ser distintos y debe haber"
            mensajeError += "\n3 ingredientes como mínimo y 5 como máximo";
            console.log(mensajeError);
            process.exit(1)
        }
       
        console.log(ingredientesPizza);
    }


 
  // prepararPizza(elecciones);
}

function prepararPizza(elecciones) {
  let pizza = "Preparamos tu pizza con ";
  pizza += elecciones.map((i) => ingredientes[i].nombre).join(", ") + ".";
  pizza += "\nPrecio :";

  let total = 0;

  for (item of elecciones) {
    total += ingredientes[item].precio;
  }

  pizza += total.toFixed(2) + "€.";

  console.log(pizza);
}

function mostrarMenu() {
  let menu = "Pizzeria Nodi";
  menu += "\n" + "=".repeat(menu.length);
  menu += "\n\n" + "Elige la masa (sólo una):";
  for (item in ingredientes) {
    if (item >= "A" && item <= "Z")
      menu += `\n${item} - ${ingredientes[item].nombre}, ${ingredientes[
        item
      ].precio.toFixed(2)} €`;
  }
  menu += "\n" + "-".repeat(20) + "\n";
  menu += "Elige los ingredientes (mínimo tres, máximo cinco):";
  for (item in ingredientes) {
    item = parseInt(item);
    if (item >= 1 && item <= 99)
      menu += `\n${item} - ${ingredientes[item].nombre}, ${ingredientes[
        item
      ].precio.toFixed(2)} €`;
  }
  menu += "\n" + "-".repeat(20) + "\n";
  console.log(menu);
}
