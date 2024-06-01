let wires = [];
let relays = [];
let contactors = [];
let currentContactor = null;
let currentRelay = null;
let currentWire = null;

let startPushButton;
let stopPushButton;
let greenLamp;
let redLamp;

let cols, rows;
const spacing = 10;

function setup() {
  createCanvas(1100, 1000);
  initializeGrid();

  let green = color(0, 153, 51);
  let red = color(204, 51, 0);
  let lampGreen = color(102, 255, 102);
  let lampRed = color(255, 0, 0);

  startButton = new PushButton(80, height - 0.11 * height, spacing, green);
  stopButton = new PushButton(220, height - 0.11 * height, spacing, red);
  greenLamp = new Lamp(440, height - 0.11 * height, spacing, lampGreen);
  redLamp = new Lamp(560, height - 0.11 * height, spacing, lampRed);
}

function draw() {
  drawGrid();
  startButton.drawButton();
  stopButton.drawButton();
  greenLamp.drawLamp();
  redLamp.drawLamp();

  for (let relay of relays) {
    relay.display();
  }
  
  for (let contactor of contactors) {
    contactor.display();
  }

  if (currentRelay) {
    currentRelay.update(mouseX, mouseY);
  }

  if (currentContactor) {
    currentContactor.update(mouseX, mouseY);
  }

  // Wire
  for (let i = 0; i < wires.length; i++) {
    wires[i].drawWire();
    wires[i].drawGuide();
  }
}

function createRelay() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    currentRelay = new Relay(mouseX, mouseY, spacing);
    relays.push(currentRelay);
  }
}

function createContactor() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    currentContactor = new Contactor(mouseX, mouseY, spacing);
    contactors.push(currentContactor);
  }
}

function createNewWire() {
  currentWire = new Wire(spacing);
  wires.push(currentWire); // Add a new wire to the array
}

function deleteRelay() {
  for (let i = relays.length - 1; i >= 0; i--) {
    if (relays[i].isSelected()) {
      relays.splice(i, 1);
    }
  }
}

function deleteContactor() {
  for (let i = contactors.length - 1; i >= 0; i--) {
    if (contactors[i].isSelected()) {
      contactors.splice(i, 1);
    }
  }
}
