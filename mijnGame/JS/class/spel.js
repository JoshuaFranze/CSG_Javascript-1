let lastAttackTimespeler1 = 0;
let lastAttackTimespeler2 = 0;
let attackCooldown = 500; // 1 seconde
let lastRandom = 0;

class spel {
    constructor() {
    this.level = 0;
    this.maxLevel = 6;
    this.levelGehaald = null;
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
    this.gekozenlevels = [];
    this.gespeeldelevels = 0;
    this.speler2wins = 0;
    this.speler1wins = 0;
    this.actief = null;
  }

  nieuwespelers () {
    this.speler1 = new speler(w / 1.3714286,h / 2.454545,UP_ARROW,LEFT_ARROW,RIGHT_ARROW,"blue");
    this.speler2 = new speler(w / 4.8,h / 2.454545,87,65,68,"red");
  }

  reset() {
    this.willekeurigLevel();
    this.gespeeldelevels++;
    this.gestart = 0;
    this.nieuwespelers();
    this.speler1.kogels = [];
    this.speler2.kogels = [];
    achtergrondmuzieklvl1.stop();
    achtergrondmuzieklvl2.stop();
    achtergrondmuzieklvl3.stop();
    achtergrondmuzieklvl4.stop();
    achtergrondmuzieklvl5.stop();
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
                    this.actief = true;
                }
            fill(227, 246, 245);

        }
        else fill(186, 232, 232);
    }
    else {
        fill(186, 232, 232);
    }
    stroke("white");
    strokeWeight(5);
    rect(width / 8 * 3,h / 2.16,width / 4,h / 5.4);
    push();
    noStroke();
    fill(39, 35, 67);
    text('Willekeurig', width / 8 * 4, h / 1.8);
    pop();
    pop();

    push();
    if (mouseX > this.grens && mouseX < this.grens + width / 4) {
        if (mouseY > h / 1.44 && mouseY < h / 1.13684) {
            if (mouseIsPressed === true) {
                this.level = 2;
            }
            fill(227, 246, 245);
        }
        else fill(186, 232, 232);
    }
    else {
        fill(186, 232, 232);
    }
    stroke("white");
    strokeWeight(5);
    rect(width / 8 * 3,h / 1.44,width / 4,h / 5.4);
    push();
    noStroke();
    fill(39, 35, 67);
    text('Map kiezen', width / 8 * 4, h / 1.270588);
    pop();
    pop();
  }

  tutorialScreen() {
    push();
    background(186, 232, 232);
    fill(39, 35, 67);
    text("speler 1",w/5.485714,h/10.8);
    text("Om te bewegen gebruik:",w/5.3333,h/4.6);
    image(aKey,w/9.6,h/2.7,w/19.2,h/10.8);
    image(wKey,w/6.4,h/2.7,w/19.2,h/10.8);
    image(dKey,w/4.8,h/2.7,w/19.2,h/10.8);
    text("Om te schieten gebruik:",w/5.333,h/1.542857);
    image(eKey,w/5.4857,h/1.35,w/19.2,h/10.8);
    image(qKey,w/7.68,h/1.35,w/19.2,h/10.8);
    text("speler 2",w/1.246753,h/10.8)
    text("Om te bewegen gebruik:",w/1.2387,h/3.6);
    image(leftKey,w/1.38129,h/2.7,w/19.2,h/10.8);
    image(upKey,w/1.28859,h/2.7,w/19.2,h/10.8);
    image(rightKey,w/1.207547,h/2.7,w/19.2,h/10.8);
    text("Om te schieten gebruik:",w/1.2387,h/1.5428571);
    text("Rechter:",w/1.3714,h/1.35)
    image(shiftKey,w/1.246753,h/1.44,w/7.68,h/10.8);
    text("Numpad:",w/1.3714,h/1.167567);
    image(num_0Key,w/1.246753,h/1.23428,w/19.2,h/10.8);
    text("Druk op 'Enter' om door te gaan", w/2,h/10.8)
    pop();
    if (keyIsDown(13) && this.willekeurig == 1) {
      this.willekeurigLevel();
    }
  }

  levels() {
    push();
       fill('black');
    if (this.gespeeldelevels < 4) {

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
        background(achtergrondlvl3);
        this.platformslvl3();
        for (var p = 0; p < this.platforms.length;p++) {
          this.platforms[p].teken();
        }
        if (this.gestart == 0) {
          achtergrondmuzieklvl3.play();
          achtergrondmuzieklvl3.loop();
          achtergrondmuzieklvl3.setVolume(0.3);
          this.gestart = 1;
        }
       }

       if (this.level == 6) {
        background(achtergrondlvl4);
        this.platformslvl4();
        for (var p = 0; p < this.platforms.length;p++) {
          this.platforms[p].teken();
        }
        if (this.gestart == 0) {
          achtergrondmuzieklvl4.play();
          achtergrondmuzieklvl4.loop();
          achtergrondmuzieklvl4.setVolume(0.3);
          this.gestart = 1;
        }
       }

       if (this.level == 7) {
        background(achtergrondlvl5);
        this.platformslvl5();
        for (var p = 0; p < this.platforms.length;p++) {
          this.platforms[p].teken();
        }
        if (this.gestart == 0) {
          achtergrondmuzieklvl5.play();
          achtergrondmuzieklvl5.loop();
          achtergrondmuzieklvl5.setVolume(0.3);
          this.gestart = 1;
        }
       }
      }
      else{
        this.eindScherm();
        this.actief = false;
      }

       

       for (var n = 0; n< this.speler1.kogels.length; n++) {
        this.speler1.kogels[n].kogelTeken();
    }

       for (var n = 0; n< this.speler2.kogels.length; n++) {
      this.speler2.kogels[n].kogelTeken();
    } 

    if (this.actief) {
       this.speler1.update(this.platforms);
       this.speler1.teken();
       this.speler2.update(this.platforms);
       this.speler2.teken();
       this.verwerkschieten();
    }

       if (this.speler1.levens == 0) {
        this.reset();
        this.speler1wins++;
       }

       if (this.speler2.levens == 0) {
        this.reset();
        this.speler2wins++;
       }

    pop();
  }

  willekeurigLevel() {
    while (true){
      let randomNum = int(random(3.49,7.49));
      if (
        randomNum == this.gekozenlevels[0] ||
        randomNum == this.gekozenlevels[1] ||
        randomNum == this.gekozenlevels[2] ||
        randomNum == this.gekozenlevels[3] ||
        randomNum == this.gekozenlevels[5]
        ) {
         continue;
       }
      else{
      this.gekozenlevels.push(randomNum);
      lastRandom = randomNum;
      this.level = randomNum;
      return randomNum;
      }  
   }
   //bron: https://editor.p5js.org/zoegao/sketches/ieIKJSIJe
  }

  platformslvl1() {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"Fuchsia"));
    this.platforms.push(new Platform(w / 7.68,h / 1.35,w / 6.4,"Fuchsia"));
    this.platforms.push(new Platform(w / 1.42222,h / 1.35,w / 6.4,"Fuchsia"));
    this.platforms.push(new Platform(w / 3.4909,h / 2.16,w / 2.4,"Fuchsia"));
  }

  platformslvl2() {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"brown"));
    this.platforms.push(new Platform(0,h / 1.44,w / 6.4,"brown"));
    this.platforms.push(new Platform(w / 1.185185,h / 1.44,w / 6.4,"brown"));
  }

  platformslvl3() {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"midnightblue"));
    this.platforms.push(new Platform(0,h / 1.44,w / 6.4,"midnightblue"));
    this.platforms.push(new Platform(w / 1.185185,h / 1.44,w / 6.4,"midnightblue"));
    this.platforms.push(new Platform(400,500,200,"midnightblue"));
    this.platforms.push(new Platform(1320,500,200,"midnightblue"));
  }

  platformslvl4() {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"midnightblue"));
  }

  platformslvl5() {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"midnightblue"));
  }

  verwerkschieten() {
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
    this.platforms = [];
    push();
    fill(39, 35, 67);
    if (this.speler1wins > this.speler2wins) {
    text("Speler 1 heeft gewonnen", w/2,h/5.4);
    text(this.speler1wins + "-" + this.speler2wins,w/2,h/2)
    }
    pop();
  }


  teken() {
    background(186, 232, 232);
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