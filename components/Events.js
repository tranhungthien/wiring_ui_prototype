function mousePressed() {
  // may need to add states here
  if (currentWire != null) currentWire.addWirePoint();
  for (let i = 0; i < wires.length; i++) {
    if (currentWire == null) wires[i].selectSegment();
  }

  for (let relay of relays) {
    if (relay.isMouseOver(mouseX, mouseY) && currentWire == null) {
      currentRelay = relay;
      if (currentRelay.isPlaced()) currentRelay.toggleSelection();
      break;
    }
  }

  for (let contactor of contactors) {
    if (contactor.isMouseOver(mouseX, mouseY) && currentWire == null) {
      currentContactor = contactor;
      if (currentContactor.isPlaced()) currentContactor.toggleSelection(); 
      break;
    }
  }

  if (currentRelay && !currentRelay.isPlaced()) {
    currentRelay.snapToGrid(spacing);
    currentRelay = null;
  }

  if (currentContactor && !currentContactor.isPlaced()) {
    currentContactor.snapToGrid(spacing);
    currentContactor = null;
  }
}

function doubleClicked() {
  for (let i = 0; i < wires.length; i++) {
    wires[i].selectSegment();
  }
}

function keyPressed() {
  if (key == "r" || key == "R") createRelay();
  if (key == "c" || key == "C") createContactor();
  if (key == "w" || key == "W") createNewWire();
  if (key == "e" || key == "E")
    for (let i = 0; i < wires.length; i++) wires[i].removeLastWirePoint();
  if (key == "t" || key == "T") {
    for (let i = 0; i < wires.length; i++) {
      wires[i].terminateWire();
      wires[i].showVectors();
      currentWire = null;
    }
  }
  if (key == "d" || key == "D") {
    deleteRelay();
    deleteContactor();
    for (let i = 0; i < wires.length; i++) {
      if (wires[i].selected) {
        wires[i].remove();
        wires.splice(i, 1);
      }
    }
  }
}
