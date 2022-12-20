class speler {
    constructor(x,y,up,left,right,kleur) {
        this.l = w / 19.2;
        this.x = x;
        this.y = y;
        this.kleur = kleur;
        this.snelheid = 0;
        this.aanHetSpringen = false;
        this.stap = w / 384;
        this.g = h / 2160;
        this.springSnelheid = h / 60; 
        this.up = up;
        this.left = left;
        this.right = right;
        this.kogels = null;
        this.levens = 4;
        this.vnrLijst = null;
        this.kogellijst = null;
        this.test = 0;
    }

    verwerkInvoer() {
        if (keyIsDown(this.left))
        {
          this.x -= this.stap;
        }
        if (keyIsDown(this.right))
        {
          this.x += this.stap;
        }    
      
        if (keyIsDown(this.up)) {
          this.spring();
        }
      }

    

    update(pf) {
        this.verwerkInvoer();
        this.beweeg(pf);
        this.raakt(pf);
        this.grondRaak();
    }

    updateKogel(k) {
        this.wordtGeraakt(k);
        this.wordtGeraakt(k);
    }

    spring() {
        if (!this.aanHetSpringen) {
          this.aanHetSpringen = true;
          this.snelheid = -this.springSnelheid;
        }
      }
    
      beweeg(pf) {
        this.verwerkInvoer();
        if (this.aanHetSpringen) {
          this.snelheid += this.g;
          this.y += this.snelheid;      
          if (this.raakt(pf) && this.snelheid > 0) {
            this.snelheid = 0;
            this.aanHetSpringen = false;
          }      
          if (this.y >= canvas.height - this.l) {
            this.y = canvas.height - this.l;
            this.snelheid = 0;
            this.aanHetSpringen = false;
          }
        } else {
            if (!this.raakt(pf) && this.y != canvas.height - this.l) {
              this.aanHetSpringen = true;
            }
        }    
        this.x = constrain(this.x,0,canvas.width - this.l);
        this.y = constrain(this.y,0,canvas.height);
        if (this.y >= canvas.height - 2* this.l) {
          
        }
      }

      raakt(pf) {
        this.vnrLijst = pf;
        var raak = false;
        for (var p = 0; p < pf.length; p++) {
          if (  (this.x + this.l/2) > pf[p].x && 
          (this.x + this.l/2) < (pf[p].x + pf[p].l) && 
          (this.y + this.l) >= pf[p].y && 
          (this.y + this.l) < (pf[p].y + pf[p].d / 2) ) {
            this.y = pf[p].y - this.l;
            raak = true;
          }
        }
        return raak;
      }

    wordtGeraakt(k) {
      if (
        (k.x + k.diameter) < (this.x + this.l) &&
        k.x > this.x &&
        (k.y + k.diameter) < (this.y + this.l) &&
        k.y > this.y
      ) {
        k.y = -100;
        this.levens--;
        hitsound.play();
      }
    }

    grondRaak() {
      if (
        (this.y + this.l) >= (h - (h / 54))
      ) {
        this.x = (w / 2) - this.l;
        this.y = h / 2;
        this.levens--;
      }
      else {

      }
    }
    
    teken() {
        push();
        stroke(this.kleur);
        fill("black");
        strokeWeight(w / 240);
        ellipse(this.x+this.l/2,this.y+this.l/2,this.l);
        for (var l = 0; l < this.levens; l++) {
          image(heart,this.x - w / 128, this.y - h / 21.6,w / 48,h / 27)
          translate(w / 64,0);
        }
        pop();
      }
}


