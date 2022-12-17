let lastAttackTimespeler1 = 0;
let lastAttackTimespeler2 = 0;
let attackCooldown = 500; // 1 seconde

class spel {
    constructor() {
    this.level = 0;
    this.maxLevel = 6;
    this.actief = null;
    this.levelGehaald = null;
    this.alfa = 0.5;
    this.width = window.screen.width * window.devicePixelRatio;;
    this.grens = this.width / 8 * 3;
    this.speler1 = null;
    this.speler2 = null;
    this.platforms = [];
    this.nieuwespelers();
    this.speler1.kogels = [];
    this.speler2.kogels = [];
    this.leftcheck = null;
    this.gestart = 0;
    this.test = 0;
    this.willekeurig = 0;
    this.willekeuriglevels = 4;
  }

  nieuwespelers () {
    this.speler1 = new speler(w / 1.3714286,h / 2.454545,UP_ARROW,LEFT_ARROW,RIGHT_ARROW,"blue");
    this.speler2 = new speler(w / 4.8,h / 2.454545,87,65,68,"red");
  }

  reset() {
    this.willekeurigLevel();
    this.gestart = 0;
    this.nieuwespelers();
    this.speler1.kogels = [];
    this.speler2.kogels = [];
    this.willekeuriglevels--;
    achtergrondmuzieklvl1.stop();
    achtergrondmuzieklvl2.stop();
  }

  update() {
    if (this.level >= 3) {
      this.speler1.update(this.platforms);
      this.speler2.update(this.platforms);
    }
    for (var n = 0; n< this.speler1.kogels.length; n++) {
      this.speler1.kogels[n].kogelBeweeg();
      this.speler1.kogels[n].kogelTeken();
      this.speler2.updateKogel(this.speler1.kogels[n]);
    }
    for (var n = 0; n< this.speler2.kogels.length; n++) {
      this.speler2.kogels[n].kogelBeweeg();
      this.speler2.kogels[n].kogelTeken();
      this.speler1.updateKogel(this.speler2.kogels[n]);
    }
  }


  beginScherm() {
    push();
    if (mouseX > this.grens && mouseX < this.grens + width / 4) {
        if (mouseY > h / 2.16 && mouseY < h / 1.54285) {
                if (mouseIsPressed === true) {
                    this.level = 1;
                    this.willekeurig = 1;
                }
            fill('black');

        }
        else fill("grey");
    }
    else {
        fill('grey');
    }
    rect(width / 8 * 3,h / 2.16,width / 4,h / 5.4);
    push();
    fill('red');
    text('Willekeurig', width / 8 * 4, h / 1.8);
    pop();
    pop();

    push();
    if (mouseX > this.grens && mouseX < this.grens + width / 4) {
        if (mouseY > h / 1.44 && mouseY < h / 1.13684) {
            if (mouseIsPressed === true) {
                this.level = 2;
            }
            fill('black');
        }
        else fill("grey");
    }
    else {
        fill('grey');
    }
    rect(width / 8 * 3,h / 1.44,width / 4,h / 5.4);
    push();
    fill('red');
    text('Map kiezen', width / 8 * 4, h / 1.270588);
    pop();
    pop();
  }

  tutorialScreen() {
    push();
    background("white");
    text("speler 1",350, 100);
    text("Om te bewegen gebruik:",360,300);
    image(aKey,200,400,100,100);
    image(wKey,300,400,100,100);
    image(dKey,400,400,100,100);
    text("Om te schieten gebruik:",360,700);
    image(eKey,350,800,100,100);
    image(qKey,250,800,100,100);
    text("Om te bewegen gebruik:",1550,300);
    // image(leftKey,)
    // image(upKey,)
    // image(rightKey,)
    // image(shiftKey,)
    // image(num_0Key,)
    pop();
    if (keyIsDown(13) && this.willekeurig == 1) {
      this.level = 3;
    }
  }

  levels() {
    push();
       fill('black');
       if (this.level == 3) {
        background(achtergrondlvl1);
        this.platformslvl1();
        for (var p = 0; p < this.platforms.length;p++) {
          this.platforms[p].teken();
        }
        if (this.gestart == 0) {
          achtergrondmuzieklvl1.play();
          achtergrondmuzieklvl1.loop();
          achtergrondmuzieklvl1.setVolume(0.1);
          this.gestart = 1;
        }
       }

       if (this.level == 4) {
        background(achtergrondlvl2);
        this.platformslvl2();
        for (var p = 0; p < this.platforms.length;p++) {
          this.platforms[p].teken();
        }
        if (this.gestart == 0) {
          achtergrondmuzieklvl2.play();
          achtergrondmuzieklvl2.loop();
          achtergrondmuzieklvl2.setVolume(0.3);
          this.gestart = 1;
        }
       }

       if (this.level == 5) {

       }

       for (var n = 0; n< this.speler1.kogels.length; n++) {
        this.speler1.kogels[n].kogelTeken();
    }

       for (var n = 0; n< this.speler2.kogels.length; n++) {
      this.speler2.kogels[n].kogelTeken();
    } 

       this.speler1.update(this.platforms);
       this.speler1.teken();
       this.speler2.update(this.platforms);
       this.speler2.teken();
       this.verwerkschieten();

       if (this.speler1.levens == 0 || this.speler2.levens == 0) {
        this.reset();
       }

    pop();
  }

  willekeurigLevel() {
    this.level = int(random(3.49,4.49));
    console.log(this.level);
  }

  platformslvl1 () {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"Fuchsia"));
    this.platforms.push(new Platform(w / 7.68,h / 1.35,w / 6.4,"Fuchsia"));
    this.platforms.push(new Platform(w / 1.42222,h / 1.35,w / 6.4,"Fuchsia"));
    this.platforms.push(new Platform(w / 3.4909,h / 2.16,w / 2.4,"Fuchsia"));
  }

  platformslvl2 () {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"brown"));
  }

  verwerkschieten () {
    if (millis() - lastAttackTimespeler1 >= attackCooldown ) {
      if (keyIsDown(96)) { //speler 1
        this.speler1.kogels.push(new Kogel(this.speler1.x + this.speler1.l,this.speler1.y + 0.5 * this.speler1.l,0,frameCount));
        lastAttackTimespeler1 = millis();
        shootingsound.play();
      }
    }
    if (millis() - lastAttackTimespeler1 >= attackCooldown ) {
      if (keyIsDown(16)) { // speler 1
        this.speler1.kogels.push(new Kogel(this.speler1.x,this.speler1.y + 0.5 * this.speler1.l,1,frameCount));
        lastAttackTimespeler1 = millis();
        shootingsound.play();
      }
    }
    if (millis() - lastAttackTimespeler2 >= attackCooldown ) {
      if (keyIsDown(69)) { // speler 2
        this.speler2.kogels.push(new Kogel(this.speler2.x + this.speler2.l,this.speler2.y + 0.5 * this.speler2.l,0,frameCount));
        lastAttackTimespeler2 = millis();
        shootingsound.play();
      }
    }
    if (millis() - lastAttackTimespeler2 >= attackCooldown ) {
      if (keyIsDown(81)) { // speler 2
        this.speler2.kogels.push(new Kogel(this.speler2.x,this.speler2.y + 0.5 * this.speler2.l,1,frameCount));
        lastAttackTimespeler2 = millis();
        shootingsound.play();
      }
    }
  }


  eindScherm() {
    var tekst = 'Klik voor een nieuw spel.';
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    text(tekst,0,0,canvas.width,canvas.height);
    pop();
  }


  teken() {
    background("grey");
    if (this.level == 0) {
        this.beginScherm();
        }
    if (this.level >= 3) {
        this.levels();
    }
    if (this.level == 1) {
      this.tutorialScreen();
    }
  }
}