let rectX = 80,
  rectY = 80;
let posX = 200,
  posY = 350;
let scaleX = 60,
  scaleY = 80;
let velX = 0,
  velY = 0;
var fruits = [];
var fruitImages = [];
var box1;
var rock;
var rockScale = 0;
var rockVelY = 0.3;
let appleImage, apricotImage, bananaImage, cherryImage, kiviImage, lemonImage, orangeImage, pineappleImage, strawberryImage, watermelonImage, bucketImage,backgroundImage,heartImage;

var Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
// create engine
var engine = Engine.create();
// create world (world is a container we are putting objects in it)
var world = engine.world;

let score = 0;

let escapedFruits = 3;

let myFont;

let number;

let ctrlLabel;

let pickUpSound,escapeSound;

let resetBtn,sizeX = 200,sizeY = 50;

  const options = {probabilityThreshold: 0.95 };
  const classifier =  ml5.soundClassifier('SpeechCommands18w', options, modelReady);

function preload() {
  appleImage = loadImage('images/apple.png');
  apricotImage = loadImage('images/apricot.png');
  bananaImage = loadImage('images/banana.png');
  cherryImage = loadImage('images/cherry.png');
  kiviImage = loadImage('images/kivi.png');
  lemonImage = loadImage('images/lemon.png');
  orangeImage = loadImage('images/orange.png');
  pineappleImage = loadImage('images/pineapple.png');
  strawberryImage = loadImage('images/strawberry.png');
  watermelonImage = loadImage('images/watermelon.png');
  bucketImage = loadImage('images/bucket.png');
  heartImage = loadImage('images/heart_mini.png');
  backgroundImage = loadImage('images/space.gif');
  myFont = loadFont('fonts/PressStart2P-Regular.ttf');
  soundFormats('wav');
  pickUpSound = loadSound('sounds/pickup.wav');
  escapeSound = loadSound('sounds/escape.wav');
}

function setup() {
 let c = createCanvas(400, 400);
  c.position((windowWidth-width)/2,(windowHeight-height)/2);
  fruitImages.push(appleImage);
  fruitImages.push(apricotImage);
  fruitImages.push(bananaImage);
  fruitImages.push(cherryImage);
  fruitImages.push(kiviImage);
  fruitImages.push(lemonImage);
  fruitImages.push(orangeImage);
  fruitImages.push(pineappleImage);
  fruitImages.push(strawberryImage);
  fruitImages.push(watermelonImage);

  // set worlds gravity to 0
  world.gravity.y = 0;
  
  box1 = new Player(bucketImage, posX, posY, scaleX, scaleY);

  // run the engine
  Engine.run(engine);
  // Body.setVelocity( box1.body, {x: velX, y: scaleY/2}); 

  box1.body.velocity.x = 20;

  console.log(box1.body.angle);

  // box1.body.angle = 0.1;
  console.log(Math.floor(Math.random() * 10));
  console.log(box1);
 
}

function modelReady(){
  classifier.classify(gotResults);
}

function gotResults(error,results){
  if(error){
    console.error(error);
    return;
  }
  ctrlLabel = results[0].label;
  console.log(ctrlLabel);

}

function SpawnRocks() {
  rockScale = random(20, 50);
  fruits.push(new Rock(fruitImages[Math.floor(Math.random() * 10)], random(rockScale / 2, width - rockScale / 2), -rockScale, rockScale, rockScale));
}
setInterval(SpawnRocks, 5000);

function keyPressed(){

}

function draw() {
  background(backgroundImage);
  
  rectMode(CENTER);
/*    if (keyIsDown(LEFT_ARROW)) {
    velX -= 1;
    

  } else if (keyIsDown(RIGHT_ARROW)) {
    velX += 1;

  } */
    if(ctrlLabel == 'left'){
        velX -= 30;
      ctrlLabel = '';
  } else if(ctrlLabel == 'right'){
    velX += 30;
    ctrlLabel = '';
  } else {
    velX = 0;
    velY = 0;
  } 

  for (var i = 0; i < fruits.length; i++) {
    Body.rotate(fruits[i].body, 0.01);
    Body.setVelocity(fruits[i].body, {
      x: 0,
      y: rockVelY
    });
    fruits[i].show();
    if (box1.hits(fruits[i])) {
      /* console.log('game over');
       noLoop(); */
      fruits[i].removeBodies();
      fruits.splice(i, 1);
      score++;
      pickUpSound.play();
     // i--;
    }
    if (fruits[i].isOffScreen()) {
      fruits[i].removeBodies();
      fruits.splice(i, 1);
      i--;
      escapedFruits--;
      escapeSound.play();
    }
  }

  if(escapedFruits == 0){
    console.log('game over');
    textSize(40);
    fill('white');
    textAlign(CENTER);
    textFont(myFont);
    text('GAME OVER',width/2,height/2);
    noLoop();
  }

  Body.setVelocity(box1.body, {
    x: velX,
    y: velY
  });
/*
  if(box1.body.position.x > width+20){
    box1.body.position.x = 0;
  }
  */
  
    
  box1.show();

    textSize(28);
  fill('white');
  textAlign(CENTER);
  textFont(myFont);
  rectMode(CENTER);
  text(score,width-20,30,100,50);
  textSize(18);
   image(heartImage,10,10,30,30);
  text('x'+escapedFruits,60,35);
  //tint(255,0);
  //console.log(box1.body.position.x);

}

