var width = 1920;

var grens = width / 8 * 3;

function preload() {
    achtergrondmuziek = loadSound("sounds/bensound-dance.mp3");
    // bron: https://www.bensound.com/royalty-free-music/track/dance
    
    raak = loadSound("sounds/score.wav");
    data = loadJSON('assets/data.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont("Monospace");
    textSize(40);
    textAlign(CENTER,CENTER);
    frameRate(60);
    speler1 = new speler(400,440,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);
    speler2 = new speler(1400,440,87,65,68);
    //platform1= new Platform(1000,800,100);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}





function draw() {
    background('white');
    debug();
    if (lvl == 0) {
    beginscherm(grens);
    }

    if (lvl == 1,3,4,5,6) {
    willekeurig();
    }
}




function willekeurig() {
    if (lvl == 1) {
    lvl = int(random(3,3));
    }
    levels(lvl);
}

function levels(lvl) {
if (lvl == 3) {
    fill('black');
    rect(200,980,1500,100);
    speler1.update();
    speler1.teken();
    speler2.update();
    speler2.teken();
    // platform1.teken();
    // platform1.level();
}

if (lvl == 4) {
    fill('black');
    rect(200,980,1500,100);
    speler1.update();
    speler1.teken();
    speler2.update();
    speler2.teken();
}

if (lvl == 5) {
    fill('black');
    rect(200,980,1500,100);
    speler1.update();
    speler1.teken();
    speler2.update();
    speler2.teken();
}

if (lvl == 6) {
    fill('black');
    rect(200,980,1500,100);
    speler1.update();
    speler1.teken();
    speler2.update();
    speler2.teken();
}
}

function beginscherm() {
    push();
    if (mouseX > grens && mouseX < grens + width / 4) {
        if (mouseY > 500 && mouseY < 700) {
                if (mouseIsPressed === true) {
                    lvl = 1;
                }
            fill('black');

        }
        else fill("grey");
    }
    else {
        fill('grey');
    }
    rect(width / 8 * 3,500,width / 4,200);
    push();
    fill('red');
    text('Willekeurig', width / 8 * 4, 600);
    pop();
    pop();


    push();
    if (mouseX > grens && mouseX < grens + width / 4) {
        if (mouseY > 750 && mouseY < 950) {
            if (mouseIsPressed === true) {
                lvl = 2;
            }
            fill('black');
        }
        else fill("grey");
    }
    else {
        fill('grey');
    }
    rect(width / 8 * 3,750,width / 4,200);
    push();
    fill('red');
    text('Map kiezen', width / 8 * 4, 850);
    pop();
    pop();

}

function debug() {
    push();
    fill('black');
    text('level = ' + lvl, 125, 50);
    pop();
}