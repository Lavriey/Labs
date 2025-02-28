let character; // Гриб
let canyon;
let objects = [];
let mushrooms = []; // Массив для грибов
let gravity = 0.5;

function setup() {
  createCanvas(800, 600);
  
  // Создаем каньон
  canyon = {
    x: 600,
    y: height - 120,
    width: 200,
    height: 100,
    color: 'black'
  };
  
  // Создаем персонажа (гриб)
  character = {
    x: 100,
    y: height - 150,
    width: 30, // Ширина гриба
    height: 30, // Высота гриба
    color: 'gray',
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

  // Создаем грибы
  mushrooms.push(createMushroom(300, height - 150));
  mushrooms.push(createMushroom(500, height - 150));
}

function createMushroom(x, y) {
  return {
    x: x,
    y: y,
    width: 30,
    height: 30,
    color: 'gray',
    direction: 1, // 1 для движения вправо, -1 для движения влево
    speed: 2,
    isActive: true
  };
}

function draw() {
  drawBackground(); // Рисуем фон
  
  // Рисуем объекты
  drawObjects();
  
  // Рисуем каньон
  fill(canyon.color);
  rect(canyon.x, canyon.y, canyon.width, canyon.height);
  
  // Обновляем и рисуем персонажа (гриб)
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
  
  // Гора на заднем плане
  fill(139, 69, 19); // Цвет горы (коричневый)
  triangle(0, height, 400, 200, 800, height); // Гора
  
  noStroke();
  fill(0, 155, 0);
  rect(0, 432, 1024, 144);
}

function drawObjects() {
  for (let obj of objects) {
    fill(obj.color);
    if (obj.type === 'tree') {
      rect(obj.x, obj.y, obj.width, obj.height);
    }
  }

  // Рисуем грибы
  for (let mushroom of mushrooms) {
    if (mushroom.isActive) {
      fill(mushroom.color);
      rect(mushroom.x, mushroom.y, mushroom.width, mushroom.height); // Стебель гриба
      fill('red');
      triangle(mushroom.x, mushroom.y, mushroom.x + mushroom.width / 2, mushroom.y - mushroom.height, mushroom.x + mushroom.width, mushroom.y); // Шляпка гриба
    }
  }
}

function drawCharacter() {
  // Рисуем гриб в виде серого квадрата с красным треугольником
  fill(character.color);
  rect(character.x, character.y, character.width, character.height); // Стебель гриба
  
  // Шляпка гриба
  fill('red');
  triangle(character.x, character.y, character.x + character.width / 2, character.y - character.height, character.x + character.width, character.y); // Шляпка гриба

  // Белые точки на шляпке гриба
  fill('white');
  ellipse(character.x + character.width / 4, character.y - character.height / 2 + 5, 5, 5); // Первая точка
  ellipse(character.x + (3 * character.width) / 4, character.y - character.height / 2 + 5, 5, 5); // Вторая точка
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
      character.velocityY = 130;
      character.velocityY += gravity;
      character.y += character.velocityY;
      setTimeout(resetGame, 2000); // Падает в пропасть через 2 секунды
    }

    // Проверка на столкновение с грибами
    for (let mushroom of mushrooms) {
      if (mushroom.isActive && character.x + character.width > mushroom.x && character.x < mushroom.x + mushroom.width && character.y + character.height >= mushroom.y) {
        if (character.velocityY > 0) { // Если персонаж прыгает
          mushroom.isActive = false; // Гриб исчезает
          character.velocityY = -10; // Отпрыгиваем от гриба
        } else {
          character.isFalling = true; // Если не прыгаем, падаем
        }
      }
    }
  }

  // Обновляем движение грибов
  for (let mushroom of mushrooms) {
    if (mushroom.isActive) {
      mushroom.x += mushroom.direction * mushroom.speed;
      if (mushroom.x < 0 || mushroom.x + mushroom.width > width) {
        mushroom.direction *= -1; // Меняем направление
      }
    }
  }
}

function resetGame() {
  character.x = width / 2 - character.width / 2; // Респавн в центре
  character.y = height - 150;
  character.isFalling = false;
  character.isJumping = false;
  character.velocityY = 0;

  // Сбрасываем грибы
  for (let mushroom of mushrooms) {
    mushroom.isActive = true; // Возвращаем грибы в активное состояние
  }
}

function keyPressed() {
  if (character.isFalling) {
    return; // Игрок не может управлять персонажем, когда он падает
  }
}
