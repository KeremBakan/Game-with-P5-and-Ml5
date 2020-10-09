// this function for rock
// arguments {x: x positon , y: y position , w: width , h: height}
function Rock(img,x,y,w,h){
  // options of matter.js body
  let options = {
    friction:0,
    restitution:0.6
  }
  //create body and pass in to a variable
  this.body = Bodies.rectangle(x, y, w, h,options);
  this.body.collisionFilter = {
      'group': -1,
      'category': 2,
      'mask': 0,
  }
  this.w = w;
  this.h = h;
  // add body into world
  World.add(world,this.body);
  
    this.isOffScreen = function(){
    var pos = this.body.position;
    return (pos.y > height + 15);
 
  }
  
  this.removeBodies = function(){
    World.remove(world,this.body);
  }
  
  // we are showing objects on screen
  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;
    
    push();
    
    translate(pos.x,pos.y);
    
    rectMode(CENTER);
    
    rotate(angle);
    
      stroke(4);
    
      fill(230);
  //  rect(0,0,this.w + 10,this.h + 10);
   
    imageMode(CENTER);
    
    image(img,0,0,this.w,this.h);
    
    pop();
  }
  
}