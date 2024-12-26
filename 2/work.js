function setup() {
  createCanvas(1800, 1000);
  noLoop(); // We only need to draw once
}

function draw() {
  background(255);

  let posY = 100; // Base Y position for character display
  let spacing = 120; // Spacing between each position

  // Standing front facing
  drawFrontFacing(posY);
  posY += spacing;

  // Jumping facing forwards
  drawJumpingForward(posY);
  posY += spacing;

  // Walking left and turn left
  drawWalkingLeft(posY);
  posY += spacing;

  // Walking right and turn right
  drawWalkingRight(posY);
  posY += spacing;

  // Jumping left
  drawJumpingLeft(posY);
  posY += spacing;

  // Jumping right
  drawJumpingRight(posY);
}

function drawFrontFacing(y) {
  // Draw head
  ellipse(100, y, 40, 40); // Head
  // Draw body
  rect(85, y + 20, 30, 60); // Body
  // Draw arms
  rect(60, y + 20, 25, 10); // Left arm
  rect(115, y + 20, 25, 10); // Right arm
  // Draw legs
  rect(85, y + 80, 10, 30); // Left leg
  rect(105, y + 80, 10, 30); // Right leg
}

function drawJumpingForward(y) {
  // Draw head
  ellipse(100, y, 40, 40);
  // Draw body in a jumping pose (slightly tilted)
  rect(85, y + 10, 30, 50); 
  // Draw arms raised
  rect(60, y + 10, 25, 10); 
  rect(115, y + 10, 25, 10);
  // Draw legs in a jumping pose
  rect(80, y + 55, 10, 25); 
  rect(110, y + 55, 10, 25); 
}

function drawWalkingLeft(y) {
  // Draw head
  ellipse(100, y, 40, 40);
  // Draw body turned left
  rect(85, y + 20, 30, 60);
  // Draw arms
  rect(50, y + 20, 25, 10); // Left arm
  rect(115, y + 20, 25, 10); // Right arm 
  // Draw legs
  rect(85, y + 80, 10, 30); 
  rect(95, y + 80, 10, 30); 
}

function drawWalkingRight(y) {
  // Draw head
  ellipse(100, y, 40, 40);
  // Draw body turned right
  rect(85, y + 20, 30, 60);
  // Draw arms
  rect(60, y + 20, 25, 10);
  rect(130, y + 20, 25, 10); // Right arm further out
  // Draw legs
  rect(85, y + 80, 10, 30); 
  rect(105, y + 80, 10, 30); 
}

function drawJumpingLeft(y) {
  // Draw head
  ellipse(100, y, 40, 40);
  // Draw body in a jumping pose (slightly tilted left)
  rect(85, y + 10, 30, 50);
  // Draw arms 
  rect(60, y + 10, 25, 10); 
  rect(115, y + 10, 10, 10); // Right arm up
  // Legs together in a jump
  rect(80, y + 55, 15, 25); 
}

function drawJumpingRight(y) {
  // Draw head
  ellipse(100, y, 40, 40);
  // Draw body in a jumping pose (slightly tilted right)
  rect(85, y + 10, 30, 50); 
  // Draw arms 
  rect(60, y + 10, 10, 10); // Left arm up
  rect(115, y + 10, 25, 10); 
  // Legs together in a jump
  rect(90, y + 55, 15, 25); 
}