const canvas = document.getElementById('ground');
const ctx = canvas.getContext('2d'); //per richiamare le proprietà e metodi




//responsive canvas
let img = new Image();
img.src = '/img/ground.png';
img.onload = function(){
canvas.width = img.naturalWidth
canvas.height = img.naturalHeight
}

//Unità e caricamento delle immagini 

const box = 32;

const foodImg = new Image();
foodImg.src = "img/salad.png";

const burgerImg = new Image();
burgerImg.src = "img/burger.png";

const kebabImg = new Image();
kebabImg.src = "img/kebab.png";

const ciderImg = new Image();
ciderImg.src = "img/cider.png"

//carimento audio

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src= "audio/dead.mp3"
eat.src= "audio/eat.mp3"
up.src= "audio/up.mp3"
left.src= "audio/left.mp3"
right.src= "audio/right.mp3"
down.src= "audio/down.mp3"

//canvas map

// -->------>  |  3box
// 1box  17box v
//             |
//             |  15box
//             v


//snake

let snake = [];
snake[0] = {
    x : 9*box, 
    y: 10*box
    //posizione iniziale 9box a destra 10box in giù
};

//cibo

let food = {
    x : Math.floor(Math.random()*17+1)*box,
    y : Math.floor(Math.random()*15+3)*box
}

//burger
let burger = {
    x : Math.floor(Math.random()*17+1)*box,
    y : Math.floor(Math.random()*15+3)*box
}


//kebab

let kebab = {
    x : Math.floor(Math.random()*17+1)*box,
    y : Math.floor(Math.random()*15+3)*box
}

let cider = {
    x : Math.floor(Math.random()*17+1)*box,
    y : Math.floor(Math.random()*15+3)*box
}




//score

let score = 0;

bonusScoreList1 = [-15,-10,-5,-1,30,100];

bonusScoreList2= [0,-1,10,20];

bonusScoreList3 = [0,1];

let bonusScore;

//controlli snake

let d;

document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 37 || event.keyCode == 100 && d != "right"){
        left.play();
        d="left"
    }else if(event.keyCode == 38 || event.keyCode == 104  && d != "down"){
        up.play();
        d="up"        
    }else if(event.keyCode == 39 || event.keyCode == 102 && d != "left"){
        right.play();
        d="right"
    }else if(event.keyCode == 40 || event.keyCode == 98 && d != "up"){
        down.play();
        d="down"
    }
}

//controlla la collisione

function collision(head,array){
    for(let i=0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
//restart button

document.addEventListener("keydown", restart);
48
function restart(event){
    if(event.keyCode == 13){
        location.reload()
    }
}


//funzione che disegna gli elementi sul canvas

function draw(){
    //ground
    ctx.drawImage(img, 0,0,canvas.width,canvas.height)
    //bonus
    jQuery(document).ready(function() {
        $('.textSalad').popover({
        trigger:'hover',
        content:'+10 pt',
        placement:'top'
        });
    });
    
    jQuery(document).ready(function() {
        $('.textBurger').popover({
        trigger:'hover',
        content:'-15/-10/-5/-1/+30/+100 pt',
        placement:'top'
        });
    });
    
    jQuery(document).ready(function() {
        $('.textKebab').popover({
        trigger:'hover',
        content:'x0/x-1/x10/x20 pt',
        placement:'top'
        });
    });
    jQuery(document).ready(function() {
        $('.textCider').popover({
        trigger:'hover',
        content:'Dead / 5000 pt',
        placement:'top'
        });
    });
    //forma dello snake
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i==0)? "#0d47a1" : "#e8eaf6 ";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "#bbdefb";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    //cibo

    ctx.drawImage(foodImg,food.x,food.y);
    ctx.drawImage(burgerImg,burger.x,burger.y);
    ctx.drawImage(kebabImg,kebab.x,kebab.y);
    ctx.drawImage(ciderImg,cider.x,cider.y);



    //testa prima di mangiare

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //nuova direzione

    if (d=="left") snakeX -= box;
    if (d=="up") snakeY -= box;
    if (d=="right") snakeX += box;
    if (d=="down") snakeY += box;

    //quando mangia 


    //quando mangia cibo normale
    if (snakeX == food.x && snakeY == food.y){
        score+=10;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1)*box,
            y : Math.floor(Math.random()*15+3)*box
        }
    }else if (snakeX == burger.x && snakeY == burger.y){
        bonusScore = bonusScoreList1[Math.floor(Math.random()*bonusScoreList1.length)];
        score = score + bonusScore;
        eat.play();
        burger = {
            x : Math.floor(Math.random()*17+1)*box,
            y : Math.floor(Math.random()*15+3)*box
        }
    }else if (snakeX == kebab.x && snakeY == kebab.y){
        bonusScore = bonusScoreList2[Math.floor(Math.random()*bonusScoreList2.length)];
        score = score * bonusScore;
        eat.play();
        kebab = {
            x : Math.floor(Math.random()*17+1)*box,
            y : Math.floor(Math.random()*15+3)*box    
        }
    } else if (snakeX == cider.x && snakeY == cider.y){
        bonusScore = bonusScoreList3[Math.floor(Math.random()*bonusScoreList3.length)];
        if (bonusScore == 0){
            score = score + 5000;
        }else{
            clearInterval(game)
                    dead.play();
        ctx.font = "30px Courier New"
        ctx.fillStyle = "White"
        ctx.fillText("GAMEOVER!!! Press Enter to retry!",10,200);
        }
        eat.play();
        cider = {
            x : Math.floor(Math.random()*17+1)*box,
            y : Math.floor(Math.random()*15+3)*box
        }
    }else{
    //tolgo la coda
    snake.pop();
    } 
    
    //nuova testa

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //game over

    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box ||snakeY > 17*box || collision(newHead,snake) ){
        clearInterval(game);
        dead.play();
        ctx.font = "30px Courier New"
        ctx.fillStyle = "White"
        ctx.fillText("GAMEOVER!!! Press Enter to retry!",10,200);
        
        
    }
    

    snake.unshift(newHead);

    //score sullo schermo

    ctx.fillStyle = "white";
    ctx.font = "35px Courier New";
    ctx.fillText("Score:"+ score,1.5*box,1.6*box)
}

//ogni 100ms viene chiamata la funzione
let game = setInterval(draw,100)


























// let context = document.querySelector("canvas").getContext("2d");

// let render = function() {
//     context.canvas.width = document.documentElement.clientWidth *0.80;
//     context.canvas.height = document.documentElement.clientHeight *0.80;

//     context.fillStyle = "#008000";
//     context.fillRect(0,0,context.canvas.width,context.canvas.height);       

// };

// window.addEventListener("resize", render);

// render()
