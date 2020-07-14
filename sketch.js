//Global Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, gameOverImg;
var restart, restartImg;

var monkey, runningMonkey;
var jungle, jungle1, backImage;
var banana, bananaImage;
var obstacle, obstacleImage;

var obstacleGroup;
var foodGroup;

var Score;

var invisibleGround;

function preload(){ 
backImage=loadImage("jungle.jpg"); 
runningMonkey = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png","Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

bananaImage = loadImage("Banana.png");
obstacleImage = loadImage("stone.png");
  
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
}


function setup() {
  createCanvas(700,400);
  
  jungle1 = createSprite(1400, 200, 2800, 800);
  jungle1.addImage(backImage);
  //jungle1.x = jungle1.width /2;
  jungle1.velocityX = -5;
  
  jungle = createSprite(700, 200, 1400, 800);
  jungle.addImage(backImage);
  jungle.x = jungle.width /2;
  jungle.velocityX = -5;

  monkey = createSprite(50, 350, 50, 50);
  monkey.addAnimation("running", runningMonkey);
  monkey.scale=0.1;
  
  invisibleGround = createSprite(350, 395, 700, 10);
  invisibleGround.visible = false;
  
  banana = createSprite(700, random(10, 390), 10, 10)
  banana.addImage(bananaImage);
  banana.velocityX = -5;
  banana.scale=0.1;
  banana.visible = false;
  
  
  stone = createSprite(700, 350, 10, 10)
  stone.addImage(obstacleImage);
  stone.velocityX = -5;
  stone.scale=0.2;
  
  Score = 0;
  
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw(){
  background(255); 
  
  monkey.collide(invisibleGround);
  stone.collide(invisibleGround);

  if (gameState === PLAY) {
      
  if (foodGroup.isTouching(monkey)){
    Score = Score+2;
    banana.destroy();
  }
  
  if (jungle1.x < 0){
    jungle1.x = jungle1.width/2;
  }
    
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
   
  if(keyDown("space")){
    monkey.velocityY = -5 
  }
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkeySize();
  createBananas();
  
  if (obstacleGroup.isTouching(monkey)){
    Score = Score-2;
  }
    
  if (Score<-20){
    gameState = END;
  }
    
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
    
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    
    if (mousePressedOver(restart)){
      reset(); 
    }
  }
  drawSprites();
  
  stroke("white"); 
  textSize(20); 
  fill("white"); 
  text("Score: "+ Score, 500,50);
}

function createBananas(){
  if(frameCount % 200 === 0) { 
  banana = createSprite(700, random(10, 390), 10, 10);
  banana.addImage(bananaImage);
  banana.velocityX = -5;
  foodGroup.add(banana);
  banana.scale=0.1;
  banana.lifetime=200;
  banana.visible = true;
  }
}

function monkeySize(){
   switch(Score) {
  case 10: monkey.scale=0.12;
  break; 
  case 20: monkey.scale=0.14;
  break; 
  case 30: monkey.scale=0.16; 
  break; 
  case 40: monkey.scale=0.18; 
  break;
  default: break;
   }
}

function createObstacles(){
  if(frameCount%250 === 0){
    var stone = createSprite(410, 350, 30, 30);
    stone.velocityX = -5;
    stone.setLifetime = 250;
    obstacleGroup.add(stone);
    stone.scale=0.3;
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  Score = 0;
}