// this function for player
// arguments {x: x positon , y: y position , w: width , h: height}
let cx;
function Player(img,x,y,w,h){
  // options of matter.js body
  
  let options = {
    friction:0,
    restitution:0.6
  }
  //create body and pass in to a variable
  this.body = Bodies.rectangle(x, y, w, h,options);
  this.w = w;
  this.h = h;
  // add body into world
  World.add(world,this.body);
  // we are showing objects on screen
  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;
    
    push();
    cx = constrain(pos.x,this.w/2,width-this.w/2);
    translate(cx,pos.y);
    
    rectMode(CENTER);
    
    rotate(angle);
    
      stroke(4);
    
      fill(230);
    
  //  rect(0,0,this.w,this.h);
    imageMode(CENTER);
    image(img,0,0,this.w,this.h);
    pop();
  }
  
 this.hits = function(fruit){
   return collideRectRect(this.body.position.x, this.body.position.y, this.w, this.w, fruit.body.position.x, fruit.body.position.y, fruit.w, fruit.h);
  }
  
}