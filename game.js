const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvaSize;
let elementsSize;

window.addEventListener('load', setCavaSize);
window.addEventListener('resize', setCavaSize);

function startGame() {

    console.log({ canvaSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end'

    for ( let i = 1; i <= 10; i++){
        game.fillText(emojis['X'], elementsSize, elementsSize * i);
    }
    
    // window.innerHeight
    // window.innerWidth
    // game.fillRect(0,0,100,100);
    // game.clearRect(50,50,50,50);
}


function setCavaSize() {

    if (window.innerHeight > window.innerWidth) {
        canvaSize = window.innerWidth * 0.8;
    } else {
        canvaSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvaSize)
    canvas.setAttribute('height', canvaSize)

    elementsSize = canvaSize / 10;

    startGame();
}
game.font = '25px Verdana';
game.fillStyle = 'purple';
game.textAlign = 'center';
game.fillText('Platzi', 25, 25);
