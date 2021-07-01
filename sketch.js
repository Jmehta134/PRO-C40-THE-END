var bike , bikeimg
var ground ;
var coin ,coinImage, bushes, bushesImage
var bushesGroup;
var coinGroup=[];
var survivaltime=0;
var score=0;
var gamestate=0;
function preload(){
  createCanvas(600,600);
  bikeimg = loadAnimation("bike.png")
  coinImage = loadImage("coin.png");
  obstaceImage = loadImage("bushes.png");
}

function setup() {
  bike=createSprite(100,300,20,20);
  bike.addAnimation("moving",bikeimg);
  bike.scale=0.5;
  bike.setCollider("rectangle",0,0,180,150);
  ground=createSprite(200,350,800,10);
  coinGroup=new Group();
  bushesGroup=new Group();
}

function draw() {
  background(255,240,240);
  textSize(20);
  bike.collide(ground);
  if(gamestate===0){
    if (keyDown("space")&&bike.y>=300) {
      bike.velocityY=-20;
    }
    bike.velocityY=bike.velocityY+1;
    camera.position.x+=2;
    bike.x+=2;
    ground.x+=2;
    food();
    bushess();
    for(var i=0;i<coinGroup.length;i++){
      if(coinGroup[i].isTouching(bike)){
        score+=1;
        coinGroup.splice(i,1);
      }
    }
    if(bushesGroup.isTouching(bike)){
      gamestate=1;
    }
  } 
  drawSprites(); 
  text("Score "+score,camera.position.x-190,20);
  text("press space to jump",camera.position.x-190,380);
  fill(255,0,0);      
  text("(avoid the bushes)",camera.position.x ,380);
  if (gamestate===1){
    text("GAME OVER",camera.position.x-100,200);
  }
}
function food (){ 
  if (frameCount%80===0){
    coin=createSprite(camera.position.x+200,0,10,10);
    coin.scale=0.05;
    coin.y=Math.round(random(120,200));
    coin.addImage(coinImage);
    coin.lifetime=500;
    coinGroup.push(coin);
  }
}
function bushess(){
  if (frameCount%200===0){
    var bush=createSprite(camera.position.x+200,330,10,10);
    bush.scale=0.3;
    bush.addImage(obstaceImage);
    bush.lifetime=500;
    bushesGroup.add(bush);
  }
}




