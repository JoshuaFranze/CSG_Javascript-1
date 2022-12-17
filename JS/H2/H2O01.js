var kever

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  keverX = 150;
  keverY = 100;
}

function draw() {
  background('grey');  
  image(kater,25,25,400,400);
  keverX+=random(-5,5);
  keverY+=random(-5,5);
  image(kever,keverX,keverY,30,30);
  image(eifel,100,25,400,400);
}