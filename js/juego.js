/**2C = 2 de Corazion (Rojo)
 * 2D = 2 de Diamantes (Rojo)
 * 2P = 2 de Pica (Negro)
 * 2T = 2 de Treboles (Negro)
 */

/** Objetivo 
 * El objetivo de este juego es completar la baraja de cartas colocando sus posiciones de menor a mayor.
 * Para ello sacamos cartas desde la baraja de tres a tres.
 */ 

let deck = [];
const tipos = ['C','D','P','T'];
const divCartascolumna1 = document.querySelector('#columna-1');
const divCartascolumna2 = document.querySelector('#columna-2');
const divCartascolumna3 = document.querySelector('#columna-3');
const divCartascolumna4 = document.querySelector('#columna-4');
const divCartascolumna5 = document.querySelector('#columna-5');
const divCartascolumna6 = document.querySelector('#columna-6');
const divCartascolumna7 = document.querySelector('#columna-7');
const divCogerCartas = document.querySelector('#cogerCartas');
const cartaCover = document.querySelector('#sacandoCartas');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDeshacer = document.querySelector('#btnDeshacer');
const smalls = document.querySelectorAll('small');
let minutos = 0;
let segundos = 0;
let click = 0;

const generarDeck = ($palabra) => {

    for(let i = 2; i <= 10; i++){
        let a = new Image();
        a.src='./cartas/' + i + $palabra + '.png';
        deck.push(a);
    }

}

generarDeck('C');
generarDeck('D');
generarDeck('H');
generarDeck('S');
deck = _.shuffle(deck);

const repartiendoCartas = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

const allowDrop = (ev) => {
    ev.preventDefault();
}

const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
}

const drop = (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementsById(data));
}

function repartiendoCartasColumnas(columna, i){
    for(let j = 0; j < i; j++){
        const imgCarta = repartiendoCartas();
        imgCarta.classList.add('carta');
        columna.append(imgCarta);
    }
    
}

repartiendoCartasColumnas(divCartascolumna1, 1);
repartiendoCartasColumnas(divCartascolumna2, 2);
repartiendoCartasColumnas(divCartascolumna3, 3);
repartiendoCartasColumnas(divCartascolumna4, 4);
repartiendoCartasColumnas(divCartascolumna5, 5);
repartiendoCartasColumnas(divCartascolumna6, 6);
repartiendoCartasColumnas(divCartascolumna7, 7);

function sumandoTiempo(){
    segundos++;
    if(segundos > 60){
        segundos = 0;
        minutos++
    }
    smalls[1].innerText = minutos + ':' + segundos;

}

cartaCover.addEventListener('click', () =>{
    
    for(let i = 0; i < 3; i++){
        const carta = repartiendoCartas();
        carta.classList.add('escogerCarta');
        divCogerCartas.append(carta);
    }

    if(click === 0) {
        click++;
        setTimeout(sumandoTiempo, 60000);
    }
    
})



btnNuevo.addEventListener('click', () => {
    if(window.confirm('¿Estas seguro que quieres crear un nuevo juego?')){
        alert("Creando nuevo juego");
        location.reload();
    }
    
})

