class Platform {
    constructor(x,y,l,kleur) {
      this.x = x;
      this.y = y;
      this.l = l;
      this.d = h / 21.6;
      this.kleur = kleur;
    }
    
    teken() {
      push();
      strokeWeight(w / 194);
      fill(this.kleur);
      rect(this.x,this.y,this.l,this.d);
      pop();
    }
  }