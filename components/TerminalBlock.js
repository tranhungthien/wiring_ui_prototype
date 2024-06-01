class TerminalBlock {
  constructor(x, y, spacing) {
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 120;
    this.spacing = spacing;
  }

  drawTerminals() {
    fill(255);
    circle(this.x, this.y - 8 * this.spacing, 14);
    circle(this.x, this.y + 8 * this.spacing, 14);
  }

  drawBlock() {
    fill(235);
    rect(this.x, this.y, 20, 210, 2);
    this.drawTerminals();
  }
}