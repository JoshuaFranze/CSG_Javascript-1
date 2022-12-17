// simple gravity


var yVal; 
var accel; 
var velocity; 
var mass; 


function setup() {
  createCanvas(640, 360);
  
  yVal = 0;  
  velocity = 0; 
  mass = 0.1; 
  
  accel = mass * 0.1; 
}

function draw() {
  background(127);
  fill(255,0,0);
  
  velocity += accel; 
  yVal += velocity;
	ellipse(width/2,yVal, 50,50); 
  
  if (yVal > height - mass/2) {
    // A little dampening when hitting the bottom
    velocity *= -0.6;
    yVal = height - mass/2;
  }
}


function mousePressed() {
  yVal = 0;  
  velocity = 0; 
}
