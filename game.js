const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');


let canvaSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;


const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let wallPosition = [];

window.addEventListener('load', setCavaSize);
window.addEventListener('resize', setCavaSize);

function fixNumber(n){
    return Number(n.toFixed(2));
}

function setCavaSize() {

    if (window.innerHeight > window.innerWidth) {
        canvaSize = window.innerWidth * 0.7;
    } else {
        canvaSize = window.innerHeight * 0.7;
    }

    canvaSize = Number(canvaSize.toFixed(0));
    canvas.setAttribute('width', canvaSize);
    canvas.setAttribute('height', canvaSize);

    elementsSize = canvaSize / 10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

function startGame() {

    console.log({ canvaSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end'

    const map = maps[level];
    
    if (!map) {
        gameWin();
        return;
    }
    
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    showLives();

    wallPosition = [];
    game.clearRect(0,0,canvaSize, canvaSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const positionX = elementsSize * (colI + 1);
            const positionY = elementsSize * (rowI + 1);


            if (col == 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = positionX;
                    playerPosition.y = positionY;
                }
            } else if (col == 'I') {
                giftPosition.x = positionX;
                giftPosition.y = positionY;
            } else if (col == 'X') {
                wallPosition.push({
                    x: positionX,
                    y: positionY,
                });
            }

        game.fillText(emoji, positionX, positionY);

        });
    });
    
    movePlayer();
}

function movePlayer () {
    const giftColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftColision = giftColisionX && giftColisionY;

    if(giftColision) {
        levelWin();
    }

    const wallColision = wallPosition.find(wall => {
        const wallColisionX = wall.x.toFixed(3) == playerPosition.x.toFixed(3);
        const wallColisionY = wall.y.toFixed(3) == playerPosition.y.toFixed(3);
        return wallColisionX && wallColisionY;
    });

    if(wallColision) {
        levelFail();
    }
    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    console.log('fallaste');
    lives--;

    console.log(lives);

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('terminaste el juego!');
    clearInterval(timeInterval);


    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'superaste el record!';
        } else {
            pResult.innerHTML = 'no superaste el record';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Es tu primera vez? ¡este es tu record!';
    }

    console.log({recordTime, playerTime});
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART'])
    // console.log(heartsArray);
    

    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

// function setCavaSize() {

//     if (window.innerHeight > window.innerWidth) {
//         canvaSize = window.innerWidth * 0.7;
//     } else {
//         canvaSize = window.innerHeight * 0.7;
//     }

//     canvaSize = Number(canvaSize.toFixed(0));
//     canvas.setAttribute('width', canvaSize);
//     canvas.setAttribute('height', canvaSize);

//     elementsSize = canvaSize / 10;

//     startGame();
// }
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

    if((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
    
}
function moveLeft() {
    console.log('Me quiero mover a la izquierda')

    if((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    console.log('Me quiero mover a la derecha')

    if((playerPosition.x + elementsSize) > canvaSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    console.log('Me quiero mover hacia abajo')

    if((playerPosition.y + elementsSize) > canvaSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}