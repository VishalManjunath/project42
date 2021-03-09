
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var survivalTime = 0;
var score = 0;
var PLAY = 1;
var END = 0
var gameState = PLAY;
var bgIMG;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  bgIMG = loadImage("jungle.jpg");
 
}



function setup() {
  
  createCanvas(600, 500)
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  console.log(ground.x);
  
}


function draw() {
  
  background(bgIMG);
  
  if (gameState === PLAY) {
    if (ground.x > 0) {
    ground.x = ground.width/2;
  }
  
  survivalTime = Math.ceil(frameCount/frameRate());
  textSize(20);
  text("Survival Time:" + survivalTime, 400, 50);
  text("Score:" + score, 100, 50);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if (keyDown("space") && monkey.y > 300) {
    monkey.velocityY = -15;
  }
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  spawnBananas();
  spawnObstacles();
    
    if (monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }
    
  } else if (gameState === END) {
    ground.velocityX = 0;
    banana.velocityX = 0;
    obstacle.velocityX = 0;
  }
  
  drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(150, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 315, 40, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
}