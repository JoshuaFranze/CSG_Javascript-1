class Kogel {
  constructor(x,y,left,frame) {
    this.x = x;
    this.y = y;
    this.diameter = w / 96;
    this.v = w / 64;
    this.kleur = 'yellow';
    this.left = left;
    this.frame = frame;
  }

  kogelBeweeg() {
    if (this.left == 1) {
      this.x -= this.v;
    }
    if (this.left == 0) {
      this.x += this.v;
    }
  }



  kogelTeken() {
    if (frameCount < (this.frame + 150)) {
    push();
    stroke('black');
    fill(this.kleur);
    ellipse(this.x,this.y,this.diameter);
    pop();
    }
  }
}