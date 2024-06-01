class Lamp {
  constructor(x, y, spacing, color) {
    this.x = x;
    this.y= y;
    this.width = 90;
    this.height = 120;
    this.color = color
    this.spacing = spacing;
  }

  drawLamp() {
    // terminal blocks
    let terminalBlock1 = new TerminalBlock(this.x-10, this.y, this.spacing);
    let terminalBlock2 = new TerminalBlock(this.x+10, this.y, this.spacing);
    terminalBlock1.drawBlock();
    terminalBlock2.drawBlock();
    
    let buttonHeight = 90;
    let buttonWidth = 90;
    //Push button
    fill(80);
    rectMode(CENTER);
    rect(this.x, this.y, buttonHeight, buttonWidth, 5);
    circle(this.x, this.y, 80);
    fill(this.color);
    //fill(0, 153, 51);
    circle(this.x, this.y, 70);
  }
}