class allelevels {

    level1() {
        push();
            fill('black');
            this.grond = new Platform(200,1030,1500,);
            this.grond.teken();
            if (this.speler1 == null && this.speler2 == null) {
              this.nieuwespelers();
            }
            this.speler1.update();
            this.speler1.teken();
            this.speler2.update();
            this.speler2.teken();
        pop();
      }
}