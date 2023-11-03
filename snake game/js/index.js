// constant for snake game 
// 1.to set the direction of the snake intially 
let inputDir={x:0,y:0}
// 2.set music constants 
 const foodSound=new Audio('music/food.mp3');
// const gameoverSound=Audio('music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
const musicSound=new Audio('music/music.mp3');
let speed=2;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}
];
food={x:6,y:7};


// GAme function 

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr){
     // If you bump into yourself 
     for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameEngine(){
    // Part1 updating the snake array & Food
      if(isCollide(snakeArr)){
        // gameoverSound.play(); 
        musicSound.pause();
        // setting direction back to intial 
        inputDir={x:0,y:0};
        alert("Game Over press any key to play again");
        //when someone press any key
        snakeArr=[{x:13,y:15}];
        musicSound.play()
        score=0;
      }
//    If snake eaten food 
if (snakeArr[0].y===food.y && snakeArr[0].x===food.x){
    // increse the body of snake 
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
    // Generating food at random location 
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
}
//moving the snake
for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;
    // Part 2:Display the snake and food
    // 1.Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // 2.Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}
// Man logic start here 
window.requestAnimationFrame(main);
//  logic for various key press by user as input which moves the snake 
window.addEventListener('keyDown',e=>{
    inputDir={x:0,y:1} //start the game
    moveSound.play();
    switch(e.key){
        case"ArrowUp":
        console.log("ArrowUp")
        inputDir.x=0;
        inputDir.y=-1;
        break;
        case"ArrowDown":
        console.log("ArrowDown")
        inputDir.x=0;
        inputDir.y=1;
        break;
        case"ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x=-1;
        inputDir.y=0;
        break;
        case"ArrowRight":
        console.log("ArrowRight")
        inputDir.x=1;
        inputDir.y=0;
        break;
        default:
            break;
    }
});

