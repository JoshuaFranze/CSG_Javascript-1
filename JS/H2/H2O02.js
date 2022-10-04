var kater,toren,piano;

function preload() {
  kater = loadImage("images/brieck.jpg");
  eifel = loadImage("images/toren.jpg");
  piano = loadImage("images/piano.jpg");
}

function setup() {
  canvas = createCanvas(850,300);
  canvas.parent('processing');
  noLoop();
  background('grey');
  fill('white');
  textFont("Verdana");
  textSize(14);
  noStroke();
  rect(25,25,250,250);
  rect(300,25,250,250);
}

function draw() {
  text("afmeting: " + kater.width + " x " + kater.height,30,20);
  text("afmeting: " + eifel.width + " x " + eifel.height,300,20);
  text("afmeting: " + piano.width + " x " + piano.height,575,20);
  image(kater,25,25,250,250);
  image(eifel,300,25,250,250);
  image(piano,575,25,250,250);
}