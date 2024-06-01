function initializeGrid() {
  cols = Math.floor(width / spacing);
  rows = Math.floor(height / spacing);
}

function drawGrid() {
  background(220);
  stroke(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      point(i * spacing, j * spacing);
    }
  }
}