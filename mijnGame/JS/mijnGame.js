var achtergrond = 'grey';
var width = w;
var grens = width / 8 * 3;
var w = window.screen.width * window.devicePixelRatio;
var h = window.screen.height * window.devicePixelRatio;

function preload() {
    achtergrondmuzieklvl1 = loadSound("sounds/Drum_and_Bass_-_Peanut.mp3");
    achtergrondmuzieklvl2 = loadSound("sounds/wildwest.mp3");
    hitsound = loadSound("sounds/hit.wav");
    shootingsound = loadSound("sounds/shot.mp3");
    heart = loadImage("assets/heart.png")
    achtergrond = loadImage("assets/Blauwelucht.png");
    achtergrondlvl1 = loadImage("assets/neoncity.jpg");
    achtergrondlvl2 = loadImage("assets/wildwest.jpg");
    data = loadJSON('assets/data.json');
    aKey = loadImage("assets/keys/a key.png");
    wKey = loadImage("assets/keys/w key.png");
    dKey = loadImage("assets/keys/d key.png");
    eKey = loadImage("assets/keys/e key.png");
    qKey = loadImage("assets/keys/q key.png");
    leftKey = loadImage("assets/keys/left key.png");
    upKey = loadImage("assets/keys/up key.png");
    rightKey = loadImage("assets/keys/right key.png");
    shiftKey = loadImage("assets/keys/shift key.png");
    num_0Key = loadImage("assets/keys/0 key.png");
  }
  
  function setup() {
    canvas = createCanvas(w,h);
    canvas.parent('processing');
    colorMode(RGB,255,255,255,1);
    textFont("Monospace");
    textSize(44);
    textAlign(CENTER,CENTER);  
    frameRate(60);
    spel = new spel();
  }
  
  function draw() {
    spel.update();
    spel.teken();
  }
  