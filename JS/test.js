function setup() {
  canvas = createCanvas(450,450);
  background('silver');
  canvas.parent('processing');
  noLoop();
}

function preload() {
  toren = loadImage("images/toren.jpg");
}

function draw () {
translate(2.5,200);
for (var n = 0; n < 10; n++) {
  image(toren,0,0,40,40);
  translate (45,0);
}

}