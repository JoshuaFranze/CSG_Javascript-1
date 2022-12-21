let lastAttackTimespeler1 = 0;
let lastAttackTimespeler2 = 0;
let attackCooldown = 500; // 1 seconde
let lastRandom = 0;


class spel {
    constructor() {
    this.level = 0;
    this.levelGehaald = null;
    this.speler1 = null;
    this.speler2 = null;
    this.platforms = [];
    this.nieuwespelers();
    this.speler1.kogels = [];
    this.speler2.kogels = [];
    this.gestart = 0;
    this.willekeurig = 0;
    this.gekozenlevels = [];
    this.gespeeldelevels = 0;
    this.speler2wins = 0;
    this.speler1wins = 0;
    this.actief = null;
    this.levelBacklog = null;
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
    image(bijbalShooter,w/2-w/3.072/2,0,w/3.072,h/2.7);
    push();
    if (mouseX > w/8*3 && mouseX < w/8*3 + width / 4) {
        if (mouseY > h / 2.16 && mouseY < h / 1.54285) {
            if (mouseIsPressed === true) {
              this.level = 1;
              this.willekeurig = 1;
              this.actief = true;
            }
            fill(227, 246, 245);
            push();
            fill(39, 35, 67);
            text("5 rondes lang gevecht, uitgevochten op willekeurige levels",w/2,h/2.7)
            pop();
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
    if (mouseX > w/8*3 && mouseX < w/8*3 + width / 4) {
        if (mouseY > h / 1.44 && mouseY < h / 1.13684) {
            if (mouseIsPressed === true) {
                this.level = 2;
            }
            fill(227, 246, 245);
            push();
            fill(39, 35, 67);
            text("1 ronde lang gevecht, op een zelf gekozen level",w/2,h/2.7)
            pop();
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
    text("Om te bewegen gebruik:",w/5.3333,h/3.6);
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
    text("Druk op 'F11' om in fullscreen te gaan",w/2,h/5.4);
    pop();
    if (keyIsDown(13) && this.willekeurig == 1) {
      this.willekeurigLevel();
    }
    if (keyIsDown(13) && this.willekeurig == 0) {
      this.level = this.levelBacklog;
    }
  }

  levels() {
    if (this.level == 2) {
      push();
      if (mouseX >= w/16*1 && mouseX < (w/16*1 + w/8*2) && mouseY > h/8*1 && mouseY < (h/8*1 + h/8*2)) {
        if (mouseIsPressed === true) {
          this.level = 1;
          this.levelBacklog = 7;
          this.actief = true;
        }
      }
      if (mouseX >= w/16*6 && mouseX < (w/16*6 + w/8*2) && mouseY > h/8*1 && mouseY < (h/8*1 + h/8*2)) {
        if (mouseIsPressed === true) {
          this.level = 1;
          this.levelBacklog = 3;
          this.actief = true;
        }
      }
      if (mouseX >= w/16*11 && mouseX < (w/16*11 + w/8*2) && mouseY > h/8*1 && mouseY < (h/8*1 + h/8*2)) {
        if (mouseIsPressed === true) {
          this.level = 1;
          this.levelBacklog = 4;
          this.actief = true;
        }
      }
      if (mouseX >= w/16*1 && mouseX < (w/16*1 + w/8*2) && mouseY > h/8*5 && mouseY < (h/8*5 + h/8*2)) {
        if (mouseIsPressed === true) {
          this.level = 1;
          this.levelBacklog = 5;
          this.actief = true;
        }
      }
      if (mouseX >= w/16*11 && mouseX < (w/16*11 + w/8*2) && mouseY > h/8*5 && mouseY < (h/8*5 + h/8*2)) {
        if (mouseIsPressed === true) {
          this.level = 1;
          this.levelBacklog = 6;
          this.actief = true;
        }
      }
      push();
      fill(39, 35, 67);
      text("Kies een level door er op te klikken",w/2,h/2);
      image(bijbalShooter,w/2-w/3.072/2,h/1.77049,w/3.072,h/2.7);
      image(levelSelect1,w/16*1,h/8*1,w/8*2,h/8*2);
      image(levelSelect2,w/16*6,h/8*1,w/8*2,h/8*2);
      image(levelSelect3,w/16*11,h/8*1,w/8*2,h/8*2);
      image(levelSelect4,w/16*1,h/8*5,w/8*2,h/8*2);
      image(levelSelect5,w/16*11,h/8*5,w/8*2,h/8*2);
      pop();
    }
    // tot aan hier is levelselect

    push();
       fill('black');
    if (this.gespeeldelevels < 5) {
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
      // het tekenen en maken van alle levels

       

    for (var n = 0; n< this.speler1.kogels.length; n++) {
      this.speler1.kogels[n].kogelTeken();
    }

    for (var n = 0; n< this.speler2.kogels.length; n++) {
      this.speler2.kogels[n].kogelTeken();
    } 
    //schieten

    if (this.actief) {
       this.speler1.update(this.platforms);
       this.speler1.teken();
       this.speler2.update(this.platforms);
       this.speler2.teken();
       this.verwerkschieten();
    }
    // update
    
    if (this.willekeurig == 1) {
       if (this.speler1.levens == 0) {
        this.reset();
        this.speler1wins++;
       }
       if (this.speler2.levens == 0) {
        this.reset();
        this.speler2wins++;
       }
    }

    if (this.willekeurig == 0) {
      if (this.speler1.levens == 0) {
        if (this.actief) {
          this.speler1wins++;
          this.actief = false;
        }
        this.eindScherm();
       }
       if (this.speler2.levens == 0) {
        if (this.actief) {
          this.speler2wins++;
          this.actief = false;
        }
        this.eindScherm();
       }
    }
    // checken of er iemand dood is
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
    this.platforms.push(new Platform(w/6.4,h/2.16,w/6.4,"midnightblue"));
    this.platforms.push(new Platform(w/1.454545,h/2.16,w/6.4,"midnightblue"));
  }

  platformslvl4() {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"darkorange"));
    this.platforms.push(new Platform(w/5.189,h/1.35,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/2.66666,h/1.35,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/1.82857,h/1.35,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/1.3714,h/1.35,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/3.5229,h/1.8947,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/2-(w/12.8)/2,h/1.8947,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/1.5673,h/1.8947,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/2.66666,h/3.17647,w/12.8,"darkorange"));
    this.platforms.push(new Platform(w/1.82857,h/3.17647,w/12.8,"darkorange"));
  }

  platformslvl5() {
    this.platforms = [];
    this.platforms.push(new Platform(w / 9.6,h / 1.0485436,w / 1.28,"midnightblue"));
    this.platforms.push(new Platform(w/4.8,h/1.44,w/1.74545,"midnightblue"));
    this.platforms.push(new Platform(0,h/2.4,w/9.6,"midnightblue"));
    this.platforms.push(new Platform(w/1.116279,h/2.4,w/9.6,"midnightblue"));
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
    background(186, 232, 232);
    push();
    fill(39, 35, 67);
    if (this.speler1wins > this.speler2wins) {
      text("Speler 1 heeft gewonnen", w/2,h/5.4);
    }
    if (this.speler2wins > this.speler1wins) {
      text("Speler 2 heeft gewonnen", w/2,h/5.4); 
    }
    text(this.speler1wins + "-" + this.speler2wins,w/2,h/2)
    text("Druk op 'F5' om opnieuw te beginnen",w/2,h/1.35)
    stroke("red");
    fill("black");
    strokeWeight(w / 240);
    ellipse(w/4*1,h/2,w/19.2);

    stroke("blue");
    fill("black");
    strokeWeight(w / 240);
    ellipse(w/4*3,h/2,w/19.2);
    pop();
  }


  teken() {
    background(186, 232, 232);
    if (this.level == 0) {
        this.beginScherm();
        }
    if (this.level >= 2) {
        this.levels();
    }
    if (this.level == 1) {
      this.tutorialScreen();
    }
  }
}