// error muziek besproken: akkoord VNR

var width = w;
var grens = width / 8 * 3;
var w = window.screen.width * window.devicePixelRatio;
var h = window.screen.height * window.devicePixelRatio;
var loading = 1;
var counter = 0;
var angle = 0;

  // geen preload expres voor gekozen, je kan dan een custom laadscherm maken.

  function soundLoaded() {
    counter++;
    if (counter == 23) {
      loading = 0;
    }
  }
  
  function setup() {
    achtergrondmuzieklvl1 = loadSound("sounds/Drum_and_Bass_-_Peanut.mp3", soundLoaded);
    achtergrondmuzieklvl2 = loadSound("sounds/wildwest.mp3", soundLoaded);
    achtergrondmuzieklvl3 = loadSound("sounds/Dr. vreemd.mp3", soundLoaded);
    achtergrondmuzieklvl4 = loadSound("sounds/piramide.mp3", soundLoaded);
    achtergrondmuzieklvl5 = loadSound("sounds/Ruimte.mp3", soundLoaded);

    hitsound = loadSound("sounds/hit.wav", soundLoaded);
    shootingsound = loadSound("sounds/shot.mp3", soundLoaded);
    heart = loadImage("assets/heart.png", soundLoaded)

    achtergrondlvl1 = loadImage("assets/neoncity.jpg", soundLoaded);
    achtergrondlvl2 = loadImage("assets/wildwest.jpg", soundLoaded);
    achtergrondlvl3 = loadImage("assets/sanctum gif.gif", soundLoaded);
    achtergrondlvl4 = loadImage("assets/piramide.jpg", soundLoaded);
    achtergrondlvl5 = loadImage("assets/space.jpg", soundLoaded);

    aKey = loadImage("assets/keys/a_key.png", soundLoaded);
    wKey = loadImage("assets/keys/w_key.png", soundLoaded);
    dKey = loadImage("assets/keys/d_key.png", soundLoaded);
    eKey = loadImage("assets/keys/e_key.png", soundLoaded);
    qKey = loadImage("assets/keys/q_key.png", soundLoaded);
    leftKey = loadImage("assets/keys/left_key.png", soundLoaded);
    upKey = loadImage("assets/keys/up_key.png", soundLoaded);
    rightKey = loadImage("assets/keys/right_key.png", soundLoaded);
    shiftKey = loadImage("assets/keys/shift key.png", soundLoaded);
    num_0Key = loadImage("assets/keys/0_key.png", soundLoaded);




    canvas = createCanvas(w,h);
    canvas.parent('processing');
    colorMode(RGB,255,255,255,1);
    textFont("Monospace");
    textSize(w/43.636363);
    textAlign(CENTER,CENTER);  
    frameRate(60);
    spel = new spel();
  }
  
  function draw() {
    if (loading == 1) {
      push();
      background(186, 232, 232);
      fill(39, 35, 67);
      text("Loading", w/2,h/2.7)
      translate(w/2,h/2);
      rotate(angle);
      strokeWeight(4);
      stroke(39, 35, 67);
      line(0,0,w/19.2,0);
      angle += 0.1;
      pop();
    }
    else {
    spel.update();
    spel.teken();
    }
  }
  