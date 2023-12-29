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

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    for ( let row = 1; row <= 10; row++){
        for (let col = 1; col <= 10; col++){
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
    }
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
