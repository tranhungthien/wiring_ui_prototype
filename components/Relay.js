class Relay {
  constructor(x, y, spacing) {
    this.height = 210;
    this.width = 120;
    this.spacing = spacing;
    this.x = x;
    this.y = y;
    this.placed = false;
    this.selected = false;
  }

  display() {
    if (this.placed) {
      if (this.selected) fill(255);
      else fill(153, 204, 255, 255);
    } else {
      fill(153, 204, 255, 150);
    }
    this.drawModule();
    this.drawTerminals();
  }

  drawModule() {
    stroke(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 3);
    this.drawCenterConnector();
  }

  drawCenterConnector() {
    let centerRadius = 15;
    let smallRadius = 5;
    let numSmallCircles = 11;
    let distanceFromCenter = 30;

    fill(0);
    strokeWeight(1);
    circle(this.x, this.y, 2 * centerRadius);
    circle(this.x, this.y + 15, 6);
    fill(200);
    noStroke();
    circle(this.x, this.y, 2 * centerRadius);
    circle(this.x, this.y + 15, 6);
    stroke(0);
    strokeWeight(2);

    fill(200);
    // Draw surrounding circles
    for (let i = 0; i < numSmallCircles; i++) {
      let angle = (TWO_PI / numSmallCircles) * i;
      let x = this.x + cos(angle) * distanceFromCenter;
      let y = this.y + sin(angle) * distanceFromCenter;
      fill(150);
      circle(x, y, 2 * smallRadius);
    }
  }

  drawTerminals() {
    fill(255);

    let j = 0;
    let k = 0;
    let l = 0;
    // Top terminals
    for (let i = -5; i < 6; i += 2) {
      if (j % 2 == 1) {
        k = 8;
        l = 6;
      } else {
        k = 7;
        l = 8;
      }
      let label = [9, 8, 7, 5, 3, 4];
      noStroke();
      text(label[j], this.x + i * this.spacing, this.y - l * this.spacing);
      stroke(0);
      strokeWeight(1);
      circle(this.x + i * this.spacing, this.y - k * this.spacing, 14);
      j++;
    }
    // Bottom terminals
    circle(this.x, this.y + 8 * this.spacing, 14);
    circle(this.x - 4 * spacing, this.y + 7 * this.spacing, 14);
    circle(this.x - 2 * spacing, this.y + 8 * this.spacing, 14);
    circle(this.x + 2 * spacing, this.y + 8 * this.spacing, 14);
    circle(this.x + 4 * spacing, this.y + 7 * this.spacing, 14);

    noStroke();
    textSize(12);
    textAlign(CENTER);
    text("A1", this.x - 4 * spacing, this.y + 9 * spacing);
    text("A2", this.x + 4 * spacing, this.y + 9 * spacing);
    text(11, this.x - 2 * spacing, this.y + 10 * spacing);
    text(6, this.x + 0 * spacing, this.y + 10 * spacing);
    text(1, this.x + 2 * spacing, this.y + 10 * spacing);
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
