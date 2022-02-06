let qtdCartas;
let cartasEncontradas;
let jogadas;

let cartasArray = [];
const cartasGifs = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];
const cartasHTML = document.querySelector(".cartas");
const relogioHTML = document.querySelector(".relogio");

let primeiraCarta;
let numPrimeiraCarta;

let segundaCarta;
let numSegundaCarta;

let qtdCartasViradas;
let tempo;
let intervalTempo;

function inicializao(){
    inicializarVariaveis();
    while(qtdCartas % 2 !== 0 || qtdCartas<4 || qtdCartas>14){
        qtdCartas = prompt("Quantas cartas você deseja(numeros pares de 4 a 14");
    }

    for(let i = 0; i<qtdCartas; i+=2){
        cartasArray[i] = i/2;
        cartasArray[i+1] = i/2;
    }

    distribuirCartas();
    intervalTempo = setInterval(atualizarTempo, 1000);
}

function distribuirCartas(){    
    cartasArray.sort(embaralhador);

    for(let i = 0; i<qtdCartas; i++){
        cartasHTML.innerHTML += `
        <div class="carta clicavel" data-identifier="card" onclick="virarCarta(this, ${cartasArray[i]})">
            <span class="frente-face face" data-identifier="back-face">
                <img src="midia/front.png" alt="Carta virada pra baixo"/>
            </span>
            <span class="costas-face face" data-identifier="front-face">
                <img src="midia/${cartasGifs[cartasArray[i]]}" alt="gif">
            </span>
        </div>
      `;
    }
}

function atualizarTempo(){
    tempo++;
    relogioHTML.innerHTML = `
    <p>${tempo}</p>
  `;
}

function virarCarta(objCarta, numCarta){
    if(objCarta.classList.contains("clicavel")){
        console.log("apertou");
        let frente = objCarta.querySelector(".frente-face");
        let costas = objCarta.querySelector(".costas-face");
    
        frente.classList.add("frente-clique");
        costas.classList.add("costas-clique");
        
        if(qtdCartasViradas === 0){
            primeiraCarta = objCarta;
            numPrimeiraCarta = numCarta;
            qtdCartasViradas++;
        }
        else{
            segundaCarta = objCarta;
            numSegundaCarta = numCarta;
            checarCartasViradas();
        }

        jogadas++;
    }

    if(cartasEncontradas==qtdCartas){
        setTimeout(fimDeJogo, 1000); //Precisei colocar esse timeout pois estava dando o aviso antes de realmente virar a carta
    }
    
}

function checarCartasViradas(){
    qtdCartasViradas = 0;

    if(numPrimeiraCarta === numSegundaCarta){
        desabilitarCliqueCarta(primeiraCarta);
        desabilitarCliqueCarta(segundaCarta)
    }
    else{
        setTimeout(desvirarCarta, 1000, primeiraCarta);
        setTimeout(desvirarCarta, 1000, segundaCarta);
    }

}

function desabilitarCliqueCarta(carta){
    carta.classList.remove("clicavel");
    cartasEncontradas++;
}

function desvirarCarta(carta){
    let frente = carta.querySelector(".frente-face");
    let costas = carta.querySelector(".costas-face");

    frente.classList.remove("frente-clique");
    costas.classList.remove("costas-clique");
}

function fimDeJogo(){
    clearInterval(intervalTempo);

    alert("Você terminou o jogo em " + jogadas + " jogadas!\nTempo: " + tempo + " segundos");    
    

    const reiniciar = prompt("Deseja reiniciar o jogo? (s ou n)");
    if(reiniciar == 's'){
        cartasHTML.innerHTML = '';
        inicializao();
    }
}


function embaralhador() { 
    return Math.random() - 0.5; 
}

function inicializarVariaveis(){
    qtdCartas = 0;
    cartasEncontradas = 0;
    jogadas = 0;
    primeiraCarta = null;
    numPrimeiraCarta = 0;
    segundaCarta = null;
    numSegundaCarta = 0;
    qtdCartasViradas = 0;
    cartasArray = [];
    tempo = 0;
}
    
inicializao();