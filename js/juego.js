/**2C = 2 de tréboles
 * 2D = 2 de diamantes
 * 2H = 2 de corazones
 * 2S = 2 de espadas
 */

/** Objetivo 
 * El objetivo de este juego es completar la baraja de cartas colocando sus posiciones de menor a mayor.
 * Para ello sacamos cartas desde la baraja de tres a tres.
 */ 

let deck = [];
const tipos = ['C','D','H','S'];
const cartaEspeciales = ['A','J','Q','K'];
const divCartascolocadas1 = document.querySelector('#CartasColocadas-1');
const divCartascolocadas2 = document.querySelector('#CartasColocadas-2');
const divCartascolocadas3 = document.querySelector('#CartasColocadas-3');
const divCartascolocadas4 = document.querySelector('#CartasColocadas-4');
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
let puntuacion = 0;
let padres = [];
const generarDeck = () => {
    let carta_negra = new Image();
    carta_negra.src = './cartas/grey_back.png';
    carta_negra.classList.add('carta');
    cartaCover.append(carta_negra);

    for(let i = 2; i <= 10; i++){
        for(let cartaTipo of tipos){
            let a = new Image();
            a.src='./cartas/' + i + cartaTipo + '.png';
            a.id = i + cartaTipo;
            deck.push(a);
        }
    }
    for(let cartaTipo of tipos) {
        for(let cartaEspecial of cartaEspeciales) {
            let a = new Image();
            a.src = './cartas/' + cartaEspecial + cartaTipo + '.png';
            a.id = cartaEspecial + cartaTipo;
            deck.push(a);
        }
    }

}

generarDeck();

deck = _.shuffle(deck);
const repartiendoCartas = () => {
    if (deck.length === 0) {
        cartaCover.removeChild(cartaCover.firstElementChild);
    }
    if(divCogerCartas.contains(divCogerCartas.firstElementChild)){
        deck.push(divCogerCartas.firstElementChild);
        divCogerCartas.removeChild(divCogerCartas.firstElementChild);
        
    }
    const carta = deck.shift();
    return carta;
}


function repartiendoCartasColumnas(columna, i){
    for(let j = 0; j < i; j++){
        const imgCarta = repartiendoCartas();
        imgCarta.classList.add('carta');
        imgCarta.setAttribute('id', imgCarta.id);
        imgCarta.setAttribute('draggable',true);
        imgCarta.setAttribute('ondragstart','drag(event)');
        // imgCarta.setAttribute('ondrop','drop(event)');
        // imgCarta.setAttribute('ondragover','allowDrop(event)');
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

function contador(){
    segundos++;
    if(segundos == 60){
        segundos = 00;
        minutos++
        if(minutos > 0 && minutos % 2 == 0){
            restandoPuntos();
        }
        
        
    }
    smalls[1].innerText = minutos + ':' + segundos;

}

function ganandoPuntos(puntos){
    puntuacion = puntuacion + puntos;
    smalls[0].innerText = puntuacion;
}

function restandoPuntos(){
    puntuacion = puntuacion - 5;
    if(puntuacion <= 0){
        puntuacion = 0;
    }
    smalls[0].innerText = puntuacion;
}

cartaCover.addEventListener('click', () =>{
    
    const carta = repartiendoCartas();
    carta.classList.add('carta');
    carta.setAttribute('id', carta.id);
    carta.setAttribute('draggable',true);
    carta.setAttribute('ondragstart','drag(event)');
    // carta.setAttribute('ondrop','drop(event)');
    // carta.setAttribute('ondragover','allowDrop(event)');
    divCogerCartas.append(carta);

    if(click === 0) {
        click++;
        setInterval(contador, 1000);
    }
    
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev){
    ev.dataTransfer.setData("id", ev.target.id);
}

function drop(ev) {
    
    ev.preventDefault();
    const id = ev.dataTransfer.getData('id');
    const idObjetivo = ev.target.id;

    if(idObjetivo.includes('CartasColocadas') || idObjetivo.includes('columna-')){


        if(id.includes("A") && idObjetivo.includes('CartasColocadas')){
            ev.target.appendChild(document.getElementById(id));
            ganandoPuntos(15);
            if(click == 0){
                click++;
                setInterval(contador, 1000);
            }
        }
        if(id.charAt(0) == 'K' && idObjetivo.includes('columna-')){
            ev.target.appendChild(document.getElementById(id));
            ganandoPuntos(5);
            
        }
    }
    else{
        let cartaTipo = id.charAt(1);
        let cartaNum;
        let cartaEspecial;
        //REVISAR EL LAS VARIABLES PARA PODER DIFERENCIARLAS
        if(id.includes("K") || id.includes("Q") || id.includes("J")){
            cartaEspecial = id.charAt(0);
        }
        else{
            if(id.includes("10")){
                cartaNum = id.substring(0,2);
                console.log(cartaNum);
                cartaTipo = id.charAt(2);
                console.log(cartaTipo);
            }
            else{
                cartaNum = id.charAt(0);
            }
            
        }
        console.log(cartaTipo);
        console.log(cartaEspecial);
        console.log(cartaNum);
        let columna = ev.target.parentNode;
        console.log(columna.id);
        if(columna.id.includes('columna-')){
            if(((idObjetivo.charAt(1) == 'S' || idObjetivo.charAt(1) == 'C') && (cartaTipo == 'D' || cartaTipo == 'H')) ||
                ((idObjetivo.charAt(1) == 'D' || idObjetivo.charAt(1) == 'H') && (cartaTipo == 'S' || cartaTipo == 'C'))){
                console.log(idObjetivo.charAt(0));
                console.log(cartaNum);
                
                if(cartaEspecial == 'J' && idObjetivo.charAt(0) == 'Q'){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(5);
                }

                if(cartaEspecial == 'Q' && idObjetivo.charAt(0) == 'K'){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(5);
                }
                
                if(idObjetivo.charAt(0) == 'J' && cartaNum == 10){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(5);
                }

                if(idObjetivo.charAt(0) - 1 == cartaNum){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(5);
                }
            }
            if(((idObjetivo.charAt(2) == 'S' || idObjetivo.charAt(2) == 'C') && (cartaTipo == 'D' || cartaTipo == 'H')) ||
            ((idObjetivo.charAt(2) == 'D' || idObjetivo.charAt(2) == 'H') && (cartaTipo == 'S' || cartaTipo == 'C'))){
                console.log(idObjetivo.charAt(2));
                console.log(idObjetivo.substring(2,3));
                
                if(idObjetivo.substring(0,2) - 1 == cartaNum){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(5);
                }
            }
            
        }
        if(columna.id.includes('CartasColocadas-')){
            if(idObjetivo.charAt(1) == cartaTipo){
                if(idObjetivo.charAt(0) == 'A' &&  cartaNum == 2){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(15);
                }
                if((cartaNum - 1 == idObjetivo.charAt(0))){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(15);
                }
                if(cartaEspecial == 'Q' && idObjetivo.charAt(0) == 'J'){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(15);
                }
                if(cartaEspecial == 'K' && idObjetivo.charAt(0) == 'Q'){
                    columna.append(document.getElementById(id));
                    ganandoPuntos(15);
                }
                
                
            }
            if(idObjetivo.charAt(2) == cartaTipo && cartaNum == 10 && cartaNum - 1 == idObjetivo.charAt(0)){
                columna.append(document.getElementById(id));
                ganandoPuntos(15);
            }
            if(idObjetivo.charAt(2) == cartaTipo && cartaEspecial == 'J' && idObjetivo.substring(0,2) == 10){
                columna.append(document.getElementById(id));
                ganandoPuntos(15);
            }
        }
        
    }

    if(divCartascolocadas1.childElementCount == 13 && divCartascolocadas2.childElementCount == 13 && divCartascolocadas3.childElementCount == 13 && divCartascolocadas4.length == 13){
        clearInterval(contador);
        document.querySelector('.titulo').append("Bien hecho, Has finalizado la partida");
    } 
    
}


btnNuevo.addEventListener('click', () => {
    if(window.confirm('¿Estas seguro que quieres crear un nuevo juego?')){
        alert("Creando nuevo juego");
        location.reload();
    }
    
})

