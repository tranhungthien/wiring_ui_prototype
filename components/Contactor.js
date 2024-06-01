class Contactor {
  constructor(x, y, spacing) {
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 220;

    this.placed = false;
    this.selected = false;
    this.spacing = spacing;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(255);
      else fill(245, 245, 245, 255);
    } else {
      fill(245, 245, 245, 80);
    }
    this.drawModule();
  }

  drawModule() {
    //fill(245);
    stroke(1);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    //Coils

    rect(this.x, this.y - 130, 100, 40, 3, 3, 0, 0);
    rect(this.x, this.y - 120, 30, 20);
    fill(0);
    rect(this.x, this.y - 114, 30, 8);
    noFill();
    //Top terminals
    circle(this.x - 30, this.y - 130, 20);
    circle(this.x + 30, this.y - 130, 20);
    fill(255);
    circle(this.x - 30, this.y - 130, 18);
    circle(this.x + 30, this.y - 130, 18);

    //Coil labels
    noStroke();
    fill(0);
    textSize(10);
    textAlign(LEFT);
    text("A1", this.x - 48, this.y - 140);
    text("A2", this.x + 36, this.y - 140);

    //noStroke();
    //Top labels
    text(1, this.x - 75, this.y - 80);
    text(3, this.x - 35, this.y - 80);
    text(5, this.x + 5, this.y - 80);
    text("NO", this.x + 62, this.y - 80);

    //Bottom labels
    text(2, this.x - 75, this.y + 88);
    text(4, this.x - 35, this.y + 88);
    text(6, this.x + 5, this.y + 88);
    text("NO", this.x + 62, this.y + 88);
    noFill();
    stroke(1);
    textAlign(CENTER);

    //Top and bottom details
    rect(this.x, this.y - 100, this.width, 20);
    rect(this.x, this.y + 100, this.width, 20);

    rectMode(CORNER);
    //Top
    rect(this.x - 80, this.y - 110, 5, 20);
    rect(this.x + 75, this.y - 110, 5, 20);
    //Bottom
    rect(this.x - 80, this.y + 90, 5, 20);
    rect(this.x + 75, this.y + 90, 5, 20);

    rectMode(CENTER);
    //Top
    rect(this.x - 40, this.y - 98, 4, 15);
    rect(this.x, this.y - 98, 4, 15);
    rect(this.x + 40, this.y - 98, 4, 15);
    //Bottom
    rect(this.x - 40, this.y + 98, 4, 15);
    rect(this.x, this.y + 98, 4, 15);
    rect(this.x + 40, this.y + 98, 4, 15);

    //Top Terminals
    fill(255);
    circle(this.x - 60, this.y - 70, 20);
    circle(this.x - 20, this.y - 70, 20);
    circle(this.x + 20, this.y - 70, 20);
    circle(this.x + 60, this.y - 70, 20);
    circle(this.x - 60, this.y - 70, 18);
    circle(this.x - 20, this.y - 70, 18);
    circle(this.x + 20, this.y - 70, 18);
    circle(this.x + 60, this.y - 70, 18);

    //Bottom Terminals
    circle(this.x - 60, this.y + 70, 20);
    circle(this.x - 20, this.y + 70, 20);
    circle(this.x + 20, this.y + 70, 20);
    circle(this.x + 60, this.y + 70, 20);
    circle(this.x - 60, this.y + 70, 18);
    circle(this.x - 20, this.y + 70, 18);
    circle(this.x + 20, this.y + 70, 18);
    circle(this.x + 60, this.y + 70, 18);
    noFill();

    //Center details
    rect(this.x, this.y, this.width - 80, this.height - 120);
    fill(150);
    rect(this.x, this.y, this.width - 90, this.height - 190);
    fill(255);
    rect(this.x - 17, this.y, 30, 28, 2);
    rect(this.x + 17, this.y, 30, 28, 2);
    rect(this.x - 10, this.y, 10, 28);
    rect(this.x + 10, this.y, 10, 28);

    rect(this.x - 20, this.y - 33, 12, 28, 2);
    rect(this.x + 20, this.y - 33, 12, 28, 2);
    rect(this.x - 20, this.y + 33, 12, 28, 2);
    rect(this.x + 20, this.y + 33, 12, 28, 2);
  }

  update(x, y) {
    if (!this.placed) {
      this.x = x;
      this.y = y;
    }
  }

  isPlaced() {
    return this.placed;
  }

  toggleSelection() {
    this.selected = !this.selected;
  }

  setSelected() {
    this.selected = true;
  }

  isSelected() {
    return this.selected;
  }

  isMouseOver(mx, my) {
    return (
      mx > this.x - this.width / 2 &&
      mx < this.x + this.width / 2 &&
      my > this.y - this.height / 2 &&
      my < this.y + this.height / 2
    );
  }

  snapToGrid() {
    this.x = round(this.x / this.spacing) * this.spacing;
    this.y = round(this.y / this.spacing) * this.spacing;
    this.placed = true;
  }
}
