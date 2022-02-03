let qtdCartas = 0;
let cartasArray = [];
const ul = document.querySelector("ul");

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
    cartasArray.sort(embaralhador);

    for(let i = 0; i<qtdCartas; i++){
        ul.innerHTML += `
        <li class="carta"><img src="midia/front.png" alt="Carta virada pra baixo"/></li>
      `;
    }

}

function embaralhador() { 
	return Math.random() - 0.5; 
}
    
inicializao();