// variables and constants
let inputDrive = {x : 0, y : 0};
const food = new Audio('music/food-eating.mp3');
const VideoGame = new Audio('music/game-2.mp3');
// const opening = new Audio('opener.wav');
const over = new Audio('music/game-over.mp3');

let lastPaintTime = 0;
let second = 2;

let snakeArray = [{x : 5, y : 9}];
let snakeFood = {x : 15, y : 8};
let box = document.querySelector('#mid-box');
let score = 0;
let previousKey = "";
let directionBtn = document.getElementsByClassName('direction-btn');


// Game functions 

// game loop
function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime - lastPaintTime) / 1000 < 1 / second){
        return;
    }
    console.log(ctime);

    lastPaintTime = ctime;

    gameEngine()
}

function gameEngine(){ 
    
// When snake collides    
    if(isCollide()){
        VideoGame.pause();
        over.play();
        inputDrive = {x : 0, y : 0};
        window.alert("Game is over. Press any key to play again.");
        snakeArray = [{x : 5, y : 9}];
        second = 2;
        score = 0;
        previousKey = "";
    }
// When snake has eaten the food 
    if(snakeArray[0].y ==  snakeFood.y && snakeArray[0]. x == snakeFood.x){
        VideoGame.pause();
        food.play();
        VideoGame.play();
        snakeArray.push({x :  0 , y :0});
        let a = 2;
        let b = 16;
        snakeFood = {x: Math.round(a + (b-a)* Math.random()), y : Math.round(a +(b-a)* Math.random())};
        second++;
        score++;
    }

// moving the snake
    for(let i = snakeArray.length - 2; i>=0; i--){
        snakeArray[i+1] = {...snakeArray[i]};

    }
    snakeArray[0].x += inputDrive.x;
    snakeArray[0].y += inputDrive.y;
 
 
// displaying snake
    box.innerHTML = "";
    snakeArray.forEach((v, index) =>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = v.y;
    snakeElement.style.gridColumnStart = v.x;
    if(index == 0){
        snakeElement.classList.add('head');
    } else snakeElement.classList.add('snake');
    box.appendChild(snakeElement);
    
})
// displaying food 

    
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = snakeFood.y;
    foodElement.style.gridColumnStart = snakeFood.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);

    // displaying score
    document.querySelector('#score h6').innerHTML = score;
}

function isCollide(){
    
    let snakeSliceArray = snakeArray.slice(1);
    let collide = snakeSliceArray.some((v) => {
        return ((v.x == snakeArray[0].x) && (v.y == snakeArray[0].y));
    });

    if(collide ){
        return true;
    }

    if(snakeArray[0].x >= 18 || snakeArray[0].x <= 0 || snakeArray[0].y >= 18 || snakeArray[0].y <= 0){
        return true;
    }

}



// Game logic starts from here
window.requestAnimationFrame(main);
window.addEventListener("keydown" , value => {
    VideoGame.play();
    //  = {x : 1 , y : 1};
    changeDirection(value.key);
})

for(let i = 0; i < 4; i++){
    directionBtn[i].addEventListener("touchstart", function() {
        VideoGame.play();
        let a = this.getAttribute("id");
        console.log(a);
    
        changeDirection(a);
        document.querySelector(`#${a} img`).classList.add("effect");
    })

}
for(let i = 0; i < 4; i++){
    directionBtn[i].addEventListener("touchend", function() {
        let a = this.getAttribute("id");
        document.querySelector(`#${a} img`).classList.remove("effect");
    })

}

// directionBtn[0].addEventListener("mousedown", () => {
//     VideoGame.play();

//     changeDirection("ArrowUp");
//     document.querySelector('#up img').classList.add("effect");
// })
// directionBtn[1].addEventListener("mousedown", () => {
//     VideoGame.play();

//     changeDirection("ArrowDown");
// })
// directionBtn[2].addEventListener("mousedown", () => {
//     VideoGame.play();

//     changeDirection("ArrowLeft");
// })
// directionBtn[3].addEventListener("mousedown", () => {
//     VideoGame.play();

//     changeDirection("ArrowRight");
// })

function changeDirection(newKey){
    if((newKey == "ArrowUp" && previousKey == "ArrowDown") || (newKey == "ArrowDown" && previousKey == "ArrowUp")|| (newKey == "ArrowLeft" && previousKey == "ArrowRight") || (newKey == "ArrowRight" && previousKey == "ArrowLeft")){
    

    } else{
        previousKey = newKey;
        switch(newKey){
            case "ArrowUp" :
                inputDrive.x = 0;
                inputDrive.y = -1;
                break;
    
            case "ArrowDown" :
                inputDrive.x = 0;
                inputDrive.y = 1;
                break;
    
            case "ArrowLeft" :
                inputDrive.x = -1;
                inputDrive.y = 0;
                break;
            case "ArrowRight" :
                inputDrive.x = 1;
                inputDrive.y = 0;
                break;
             default :
                 break; 
                     
            }
        } 
}