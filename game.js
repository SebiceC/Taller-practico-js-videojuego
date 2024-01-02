const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvaSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

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

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const positionX = elementsSize * (colI + 1);
            const positionY = elementsSize * (rowI + 1);
            game.fillText(emoji, positionX, positionY);


            if (col == 'O') {
            playerPosition.x = positionX;
            playerPosition.y = positionY;
            console.log({playerPosition});
        }
        });
    });
    
    movePlayer();
}

function movePlayer () {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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


window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
    console.log('Me quiero mover hacia arriba')
    playerPosition.y -= elementsSize;
    movePlayer();
}
function moveLeft() {
    console.log('Me quiero mover a la izquierda')
}
function moveRight() {
    console.log('Me quiero mover a la derecha')
}
function moveDown() {
    console.log('Me quiero mover hacia abajo')
}