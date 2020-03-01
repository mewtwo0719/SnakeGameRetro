//DOM
startScreen = document.getElementsByClassName("start")[0];
gameScreen = document.getElementsByClassName("fieldWrapper")[0];
score = document.getElementById("score");
gameOverScreen = document.getElementsByClassName("gameOverScreen")[0];

//load field
fieldDOM = document.getElementsByClassName("block");
field = [];
for(var i = 0; i<22; i++){
    var ta = [];
    for(var j = 0; j<22; j++){
        ta.push(fieldDOM[(i*22) + j])
    }
    field.push(ta);
}

//snake
var snake = [[12, 10], [11, 10], [10, 10]];


//variables
var gameStarted = false;
var direction = 'right';
var food = [1, 1];
var sc= 0;
var canTurn = true;

drawSnake();
spawnFood();

var intervalID;

function moveSnake(){
    if(direction == 'right') moveRight();
    if(direction == 'left') moveLeft();
    if(direction == 'up') moveUp();
    if(direction == 'down') moveDown();
}

function startGame(){
    startScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
    gameStarted = true;
    canTurn = true;
    intervalID = setInterval(function(){

        moveSnake();
        canTurn = true;
        ;}, 200);
}

function checkIsOnFood(){
    if (snake[0][0] == food[0] && snake[0][1] == food[1]){
        sc += 100;
        score.innerHTML = "Score: " + sc;
        field[food[0]][food[1]].classList.remove("food");
        var newPart = [-1, -1];
        spawnFood();
        snake.push(newPart);
    }
}


function checkIfAteItself(){
    for(var i = 0; i < snake.length; i++){
        for(j = 0; j < snake.length; j++){
            if(snake[i][0] == snake[j][0] && snake[i][1] == snake[j][1] && i != j)gameOver();
        }
    }
}

function checkIfOutOfBounds(){
    if(snake[0][0]<0 || snake[0][1]<0 || snake[0][0]>=22 || snake[0][1]>=22)gameOver();
}

function move(){
    checkIsOnFood();
    checkIfAteItself();
    checkIfOutOfBounds();
    for(var i = snake.length-1; i > 0; i--){
        snake[i][0] = snake[i-1][0];
        snake[i][1] = snake[i-1][1];
    }
}

function moveRight(){
    move();
    snake[0][0]++;

    clearField();
    drawSnake();
}
function moveLeft(){
    move();
    snake[0][0]--;

    clearField();
    drawSnake();
}
function moveDown(){
    move();
    snake[0][1]++;

    clearField();
    drawSnake();
}
function moveUp(){
    move();
    snake[0][1]--;

    clearField();
    drawSnake();
}

function clearField(){
    for(var i = 0; i < field.length; i++){
        for(var j = 0; j < field[0].length; j++){
            field[i][j].classList.remove("active");
        }
    }
}

function drawSnake(){
    for(var i = 0; i<snake.length; i++){
        field[snake[i][0]][snake[i][1]].classList.add("active");
    }
}

function uniCharCode(event) {
    if(canTurn){
    var char = event.which || event.keyCode;
    if(char == 97 && direction != 'right') direction = 'left';
    if(char == 115 && direction != 'up') direction = 'down';
    if(char == 100 && direction != 'left') direction = 'right';
    if(char == 119 && direction != 'down') direction = 'up';
    if(char == 112) alert("GAME IS PAUSED, PRESS ANY KEY TO CONTINUE");
    canTurn = false;
    }
  }

function spawnFood(){
    var fX;
    var fY;

    do{
    fX = Math.floor(Math.random()*22);
    fY = Math.floor(Math.random()*22);
    
    if(!isOnSnake(fX, fY)) break;

    }while(true);

    food[0] = fX;
    food[1] = fY;
    
    field[food[0]][food[1]].classList.add("food");
}

function isOnSnake(a, b){
    for(var i = 0; i < snake.length; i++){
            if(snake[i][0] == a && snake[i][1] == b) return true;
    }
    return false;
}

function gameOver(){
    clearInterval(intervalID);
    gameOverScreen.classList.remove("hide");
}

function backToMainMenu(){
    startScreen.classList.remove("hide");
    gameScreen.classList.add("hide");
    gameOverScreen.classList.add("hide");
    gameStarted = false;
    sc = 0;
    canTurn = true;
    score.innerHTML = "Score: 0";
    snake = [[12, 10], [11, 10], [10, 10]];
    direction = 'right';
    clearField();
}