let qtdCartas = 0;

let cartasArray = [];
const cartasGifs = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

let primeiraCarta;
let numPrimeiraCarta;

let segundaCarta;
let numSegundaCarta;

let qtdCartasViradas = 0;

function inicializao(){
    while(qtdCartas % 2 !== 0 || qtdCartas<4 || qtdCartas>14){
        qtdCartas = prompt("Quantas cartas você deseja(numeros pares de 4 a 14");
    }

    for(let i = 0; i<qtdCartas; i+=2){
        cartasArray[i] = i/2;
        cartasArray[i+1] = i/2;
    }

    distribuirCartas();
}

function distribuirCartas(){    
    const cartas = document.querySelector(".cartas");

    cartasArray.sort(embaralhador);

    for(let i = 0; i<qtdCartas; i++){
        cartas.innerHTML += `
        <div class="carta clicavel" onclick="virarCarta(this, ${cartasArray[i]})">
            <span class="frente-face face">
                <img src="midia/front.png" alt="Carta virada pra baixo"/>
            </span>
            <span class="costas-face face">
                <img src="midia/${cartasGifs[cartasArray[i]]}" alt="gif">
            </span>
        </div>
      `;
    }

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
}

function desvirarCarta(carta){
    let frente = carta.querySelector(".frente-face");
    let costas = carta.querySelector(".costas-face");

    frente.classList.remove("frente-clique");
    costas.classList.remove("costas-clique");
}


function embaralhador() { 
	return Math.random() - 0.5; 
}
    
inicializao();