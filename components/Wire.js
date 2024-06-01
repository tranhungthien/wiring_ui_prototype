class Wire {
  constructor(spacing) {
    this.spacing = spacing;
    this.wire = [];
    this.wiring = true;
    this.selected = false;
  }

  drawWire() {
    if (this.wire.length < 2) return;
    
    stroke(this.selected ? color(255, 0, 0) : color(0)); // Red if selected, otherwise black
    
    for (let i = 1; i < this.wire.length; i++) {
      const p1 = this.wire[i - 1];
      const p2 = this.wire[i];
      line(
        this.spacing * p1.x,
        this.spacing * p1.y,
        this.spacing * p2.x,
        this.spacing * p2.y
      );
    }
  }

  drawGuide() {
    if (
      !this.wiring ||
      mouseX < 0 ||
      mouseX > width ||
      mouseY < 0 ||
      mouseY > height
    )
      return;
    if (this.wire.length == 0) return;
    
    //push();  // Save the current drawing state
    
    const last = this.wire.length - 1;
    const x1 = this.spacing * this.wire[last].x;
    const y1 = this.spacing * this.wire[last].y;
    const test1 = abs(mouseX - x1);
    const test2 = abs(mouseY - y1);
    let x2, y2;
    if (test1 > test2) {
      x2 = mouseX;
      y2 = y1;
    } else {
      x2 = x1;
      y2 = mouseY;
    }
    line(x1, y1, x2, y2);
    
    //pop();  // Restore the previous drawing state
  }

  addWirePoint() {
    if (!this.wiring) return;
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
    const closestX = Math.round(mouseX / this.spacing) * this.spacing;
    const closestY = Math.round(mouseY / this.spacing) * this.spacing;
    const col = closestX / this.spacing;
    const row = closestY / this.spacing;
    if (col < cols && row < rows) {
      this.wire.push(createVector(col, row));
      this.wiring = true;
    }
  }

  removeLastWirePoint() {
    if (this.wire.length > 0 && this.wiring) {
      this.wire.pop();
      if (this.wire.length === 0) {
        this.wiring = false;
      }
    }
  }

  selectSegment() {
    if (this.wire.length < 2) return;
    for (let i = 1; i < this.wire.length; i++) {
      const p1 = this.wire[i - 1];
      const p2 = this.wire[i];
      const d = distToSegment(
        createVector(mouseX, mouseY),
        createVector(this.spacing * p1.x, this.spacing * p1.y),
        createVector(this.spacing * p2.x, this.spacing * p2.y)
      );
      if (d < 5) {  // Threshold for selection
        this.selected = true;
        return;
      }
    }
    this.selected = false;
  }

  deselectSegment() {
    this.selected = false;
  }

  terminateWire() {
    this.wiring = false;
  }

  remove() {
    if (this.selected) {
      this.selected = false;
      this.wiring = false;
      this.wire = [];
    }
  }

  isWiring() {
    return this.wiring;
  }

  showVectors() {
    let l = this.wire.length - 1;
    if (this.wire.length > 1) {
      console.log("beginning x:", this.wire[0].x, " y:", this.wire[0].y);
      console.log("ending x:", this.wire[l].x, " y:", this.wire[l].y);
    }
  }
}

// Utility function to calculate the distance from a point to a line segment
function distToSegment(p, v, w) {
  const l2 = p5.Vector.dist(v, w) ** 2;
  if (l2 === 0) return p5.Vector.dist(p, v);
  const t = max(0, min(1, p5.Vector.sub(p, v).dot(p5.Vector.sub(w, v)) / l2));
  const projection = p5.Vector.add(v, p5.Vector.mult(p5.Vector.sub(w, v), t));
  return p5.Vector.dist(p, projection);
}
