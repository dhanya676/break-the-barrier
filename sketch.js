var PLAY = 1;
var END = 0;
var gameState = PLAY;


var score;

function preload(){
  backgroundImage= loadImage("backg (1).jpg");
 goldcoinImage=loadImage("goldcoinimage.png");

    kookierunning = loadAnimation("kookie1.png","kookie2.png","kookie3.png");
kookiecollided = loadAnimation ("kookiecollided.png");
 gameOverImg= loadImage("gameOver.png") 
  restartImg=loadImage("restart.png");
  
  barricadesImage=loadImage("barricades.png")
  }

function setup() {
  createCanvas(800, 400);
    stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  // adding background image
  background2 = createSprite(220,100,100,100);
  background2.addImage(backgroundImage);
  
  //creating invisible ground so that kookie does not fall down
  invisibleGround = createSprite(10,310,800,10);
  invisibleGround.visible = false;

  //creating kookie
   kookie = createSprite(35,270,20,50);
  kookie.addAnimation("running", kookierunning);
   kookie.addAnimation("collided", kookiecollided);
  kookie.scale = 0.5;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  //creating groups
  goldcoinGroup = createGroup();
  barricadesGroup = createGroup();
  
   kookie.setCollider("circle",0,0,80);
  //kookie.debug = true;

  score=0;
  }

function draw() {
  background(180);
   drawSprites();
  
  //displaying score
  textSize(20);
  fill(255);
  text("Score: "+ score, 400,50);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
   kookie.changeAnimation("running", kookierunning);
    
    
     background2.velocityX=-2;
    if (background2.x < 0){
      background2.x = background2.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& kookie.y >= 100) {
        kookie.velocityY = -12;
    
    }
    
    //add gravity to kookie
    kookie.velocityY = kookie.velocityY + 0.8;
  
  if(goldcoinGroup.isTouching(kookie)){
      goldcoinGroup.destroyEach();
    score = score + 2;
    }
  spawnCoin();
  spawnBarricades()
  }
    if(barricadesGroup.isTouching(kookie)) {
        gameState = END;
       }  
      
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      background2.velocityX = 0;
      kookie.velocityY = 0;
     
     barricadesGroup.setVelocityXEach(0);
    goldcoinGroup.setVelocityXEach(0);
     //kookie.changeAnimation(kookiecollidedImage);
     //change the kookie animation
    kookie.changeAnimation("collided",kookiecollided);
     
     //for restart when mouse is pressed
     if(mousePressedOver(restart)) {
      reset();
    }
  
   }
  
   kookie.collide(invisibleGround);
  
}
     
//  function spawnbarricades(){
//  if (frameCount % 60 === 0)
//    var barricades = createSprite(600,165,10,40);
//   barricades.velocityX = -(6 + score/100);
   
//     //generate random obstacles
//     var rand = Math.round(random(1,6));
//     switch(rand) {
//       case 1: barricads.addImage(obstacle1);
//               break;
//       case 2: barricads.addImage(obstacle2);
//               break;
//       case 3: barricads.addImage(obstacle3);
//               break;
//       case 4: barricads.addImage(obstacle4);
//               break;
//       case 5: barricads.addImage(obstacle5);
//               break;
//       case 6: barricads.addImage(obstacle6);
//               break;
//       default: break;
//     }    
     
  
// }

function spawnBarricades() {
  //code to spawn the barricades
  if (frameCount % 150 === 0) {
  barricades = createSprite(800,290,10,10);
    barricades.x = Math.round(random(500,800));
  barricades.addImage(barricadesImage);
  barricades.scale=0.1;
    barricades.velocityX = -3;
    
     //assign lifetime to the variable
    barricades.lifetime = 800;
    
    //add each barricades to the group
    barricadesGroup.add(barricades);
  }
  
}
function spawnCoin() {
  //code to spawn the coins
  if (frameCount % 250 === 0) {
  goldcoin = createSprite(800,150,10,10);
    goldcoin.y = Math.round(random(80,200));
  goldcoin.addImage(goldcoinImage);
  goldcoin.scale=0.1;
    goldcoin.velocityX = -3;
    
     //assign lifetime to the variable
    goldcoin.lifetime = 400;
    
    //adjust the depth
    goldcoin.depth = kookie.depth;
    kookie.depth = kookie.depth + 1;
    
    //add each goldcoin to the group
    goldcoinGroup.add(goldcoin);
  }
  
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  barricadesGroup.destroyEach();
  goldcoinGroup.destroyEach();
  score = 0;
}
