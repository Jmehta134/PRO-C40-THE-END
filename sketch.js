var bike ,bikesound,bikeup,bikedown, bikeimg
var head;
var bushes, bushesImage,mudimg,bg;
var bushesGroup;
var play , replay;
var mudGroup;
var survivaltime=0;
var score=0;
var Hi=0
var gamestate=0;
function preload(){
  createCanvas(600,600);
  bikeimg = loadImage("bike.png");
  bikeup=loadImage("bikeup.png");
  bikedown=loadImage("bikedown.png");
  bushesImage = loadImage("bushes.png");
  mudimg=loadImage("mud.png");
  bg=loadImage("Untitled.png");
  bikesound=loadSound("motor.wav");
  head=loadImage("heading.png");
  replay=loadImage("restart.png");
}

function setup() {
  bike=createSprite(100,220,20,20);
  bike.scale=0.5;
  bike.addImage(bikeimg);
  bushesGroup=new Group();
  mudGroup=new Group();
  play=createSprite(width/2,height/2,20,20);
  play.addImage(replay);
  play.scale=0.15;
  heading=createSprite(width/2*3,height/2-20,20,20);
  heading.addImage(head);
  heading.scale=0.5;
}

function draw() {
  background(bg);
  textAlign(CENTER);
  textSize(20);fill(0);
  if(gamestate===0){
    play.visible=false;
    camera.position.x+=5;
    bike.x+=5;
    if(frameCount>120){
      score=score+0.1;
      Lane();
      mud();
      bushess();
      if(frameCount%120===0){bikesound.play();}
    }
    if(Hi<=score){Hi=score;}
    if(mudGroup.isTouching(bike)){
      camera.position.x+=-3;
      bike.x+=-3;
      score=score-0.1;
      mudGroup.setLifetimeEach(-1);
    }else{
      mudGroup.setLifetimeEach(100);
    }
    if(bushesGroup.isTouching(bike)){
      gamestate=1;
      bushesGroup.setLifetimeEach(-1);
      mudGroup.setLifetimeEach(-1);
    }
  } 
  drawSprites(); 
  text("Score "+Math.round(score),camera.position.x-160,20);
  text("HI "+Math.round(Hi),camera.position.x+50,20);
  text("up arrow to go up",camera.position.x-100,350);
  text("down arrow to go down",camera.position.x-90,380);
  fill(255,0,0);      
  text("(avoid the obstacles)",camera.position.x-100,320);
  if (gamestate===1){
    bikesound.stop();bikesound.stop();
    play.visible=true;
    play.x=camera.position.x;
    play.depth=bike.depth+1;
    textSize(40);
    text("GAME OVER",camera.position.x-20,70);
    if(mousePressedOver(play)) {reset();}
  }
}
function bushess(){
  if (frameCount>150&&frameCount%120===0){
    var bush=createSprite(camera.position.x+200,random(110,290),10,10);
    bush.scale=0.25;
    bush.addImage(bushesImage);
    bush.setCollider("rectangle",0,0,120,90)
    bush.lifetime=100;
    bike.depth=bush.depth+1;
    bushesGroup.add(bush);
  }
}
function mud(){  
  if (frameCount>150&&frameCount%100===0){
    var mud=createSprite(camera.position.x+200,random(290,110),10,10);
    mud.scale=0.25;
    mud.debug=true;
    mud.addImage(mudimg);
    mud.setCollider("rectangle",0,0,190,160)
    mud.lifetime=100;
    bike.depth=mud.depth+1;
    mudGroup.add(mud);
  }
}
function Lane(){
  if(keyDown(UP_ARROW)&&bike.y>60){
    bike.y-=10;  
    bike.addImage(bikeup);
    bike.setCollider("rectangle",20,0,180,70);
  }else if(keyDown(DOWN_ARROW)&&bike.y<240){
    bike.y+=10;
    bike.addImage(bikedown);
    bike.setCollider("rectangle",35,20,70,180);
    }else {
    bike.addImage(bikeimg);
    bike.setCollider("rectangle",0,40,180,70);
  }
}
function reset(){
  camera.position.x=400/2;
  bushesGroup.destroyEach();
  mudGroup.destroyEach();
  bushesGroup.length=0;
  mudGroup.length=0;
  heading.visible=false;
  bike.x=100;
  bike.y=220;
  gamestate=0;
  score=0;
}