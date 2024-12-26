let character;
let canyon;
let objects = [];
let gravity = 0.5;

function setup() {
  createCanvas(800, 600);
  
  // Создаем каньон
  canyon = {
    x: 600,
    y: height - 100,
    width: 200,
    height: 100,
    color: 'black'
  };
  
  // Создаем персонажа
  character = {
    x: 100,
    y: height - 150,
    width: 40,
    height: 60,
    color: 'red',
    velocityY: 0,
    isJumping: false,
    isFalling: false,
    facingLeft: false // Новая переменная для отслеживания направления
  };
  
  // Создаем объекты на сцене
  objects.push({
    type: 'tree',
    x: 50,
    y: height - 150,
    width: 30,
    height: 60,
    color: 'green'
  });
  
 
}

function draw() {
  drawBackground(); // Рисуем фон
  
  // Рисуем объекты
  drawObjects();
  
  // Рисуем каньон
  fill(canyon.color);
  rect(canyon.x, canyon.y, canyon.width, canyon.height);
  
  // Обновляем и рисуем персонажа
  updateCharacter();
  drawCharacter();
}

function drawBackground() {
  // Небо
  background(135, 206, 235);
  
  // Облака
  fill(255);
  ellipse(100, 100, 60, 30);
  ellipse(150, 90, 80, 40);
  ellipse(400, 80, 70, 35);
  
  
    noStroke();
    fill(0, 155, 0);
    rect(0, 432, 1024, 144);

    fill(255);
    ellipse(200, 100, 80, 50);
    ellipse(230, 90, 60, 40);
    ellipse(170, 90, 60, 40);
    ellipse(210, 120, 80, 50);
    
    noStroke();
    fill(255);

    fill(139, 69, 19);
    triangle(450, 256, 600, 432, 300, 432); // creating a mountain shape

    noStroke();
    fill(255);

    fill(139, 69, 19);
    rect(780, 300, 20, 60);
    fill(34, 139, 34);
    ellipse(790, 290, 70, 70); 

    noStroke();
    fill(255);

    fill(176, 224, 230);
    beginShape();
    vertex(0, 432);
    vertex(200, 300);
    vertex(350, 440);
    vertex(600, 300);
    vertex(800, 432);
    vertex(1024, 432);
    vertex(1024, 576);
    vertex(0, 576);
    endShape(CLOSE);

    noStroke();
    fill(255);

    fill(255, 215, 0); // golden color for the token
    ellipse(400, 400, 30, 30); // main body of the collectable item
    fill(255, 0, 0);
    ellipse(400, 395, 10, 10); // sparkle on the token

    noStroke();
    fill(255);
    
}

function drawObjects() {
  for (let obj of objects) {
    fill(obj.color);
    if (obj.type === 'tree') {
      rect(obj.x, obj.y, obj.width, obj.height);
    } else if (obj.type === 'mountain') {
      triangle(obj.x, obj.y, obj.x + obj.width, obj.y, obj.x + obj.width / 2, obj.y - obj.height);
    }
  }
}

function drawCharacter() {
  // Рисуем персонажа в виде человека
  fill(character.color);
  // Голова
  ellipse(character.x + character.width / 2, character.y - 10, 20, 20);
  // Тело
  rect(character.x + 10, character.y, 20, character.height);
  
  // Руки
  if (character.facingLeft) {
    rect(character.x - 10, character.y + 10, 10, 30); // Левая рука
    rect(character.x + character.width, character.y + 10, 10, 30); // Правая рука
  } else {
    rect(character.x, character.y + 10, 10, 30); // Левая рука
    rect(character.x + character.width - 10, character.y + 10, 10, 30); // Правая рука
  }
  
  // Ноги
  rect(character.x + 10, character.y + character.height, 10, 30);
  rect(character.x + 20, character.y + character.height, 10, 30);
}


function updateCharacter() {
  // Управление персонажем
  if (!character.isFalling) {
    if (keyIsDown(LEFT_ARROW)) {
      character.x -= 5;
      character.facingLeft = true; // Поворачиваем влево
    } else if (keyIsDown(RIGHT_ARROW)) {
      character.x += 5;
      character.facingLeft = false; // Поворачиваем вправо
    }
    if (keyIsDown(UP_ARROW) && !character.isJumping) {
      character.velocityY = -10;
      character.isJumping = true;
    }
    
    // Применяем гравитацию
    character.velocityY += gravity;
    character.y += character.velocityY;
    
    // Проверка на приземление
    if (character.y >= height - 150) {
      character.y = height - 150;
      character.isJumping = false;
      character.velocityY = 0;
    }
    
    // Проверка на столкновение с каньоном
    if (character.x + character.width > canyon.x && character.x < canyon.x + canyon.width && character.y + character.height >= canyon.y) {
      character.isFalling = true;
      character.velocityY = 130
      character.velocityY += gravity;
      character.y += character.velocityY;
      setTimeout(resetGame, 2000); // Падает в пропасть через 1 секунду
    }
  }
}

function resetGame() {
  character.x = width / 2 - character.width / 2; // Респавн в центре
  character.y = height - 150;
  character.isFalling = false;
  character.isJumping = false;
  character.velocityY = 0;
}

function keyPressed() {
  if (character.isFalling) {
    return; // Игрок не может управлять персонажем, когда он падает
  }
}