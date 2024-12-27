let character;
let canyon;
let objects = [];
let mushrooms = []; // Массив для грибов
let gravity = 0.5;

let score = 0;
let music;

function preload()
{
  music = loadSound("Awake_and_Alive.mp3")
  music.volume = 0.5;
  music.play();
  music.loop();
  
}

function setup() {
  createCanvas(800, 600);
  music.loop();
  
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
    y: height - 250,
    width: 40,
    height: 60,
    color: 'red',
    velocityY: 0,
    isJumping: false,
    isFalling: false,
    facingLeft: false // Новая переменная для отслеживания направления
  };
  
  coin = {
    x: 500,
    y: height - 250,
    color: 'yellow',
    radius: 30
  }
  
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
  mushrooms.push(createMushroom(300, height - 100));
  mushrooms.push(createMushroom(500, height - 100));
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
  drawBackground(); 
  
  drawObjects();
  
  drawCoin();
  
  // Рисуем каньон
  fill(canyon.color);
  rect(canyon.x, canyon.y, canyon.width, canyon.height);
  
  // Обновляем и рисуем персонажа
  updateCharacter();
  drawCharacter();
  
  fill(0)
  textSize(30) // Рисуем счетчик очков
  text(`Score: ${score}`, 30, 30)
}

function drawBackground() 
{
  background(135, 206, 235);
  
  // Облака
  fill(255);
  ellipse(100, 100, 60, 30);
  ellipse(150, 90, 80, 40);
  ellipse(400, 80, 70, 35);
  
  // Гора на заднем плане
  fill(139, 69, 19);
  triangle(0, height, 400, 200, 800, height);
  
  noStroke(); // Земля
  fill(0, 155, 0);
  rect(0, 500, 1024, 144);
}

function drawObjects() 
{
  for (let obj of objects) 
  {
    fill(obj.color);
    
    if (obj.type === 'tree') 
    {
      rect(obj.x, obj.y, obj.width, obj.height);
    }
  }

  // Рисуем грибы
  for (let mushroom of mushrooms) 
  {
    if (mushroom.isActive) 
    {
      fill(mushroom.color);
      rect(mushroom.x, mushroom.y, mushroom.width, mushroom.height); // Стебель гриба
      fill('red');
      triangle(mushroom.x, mushroom.y, mushroom.x + mushroom.width / 2, mushroom.y - mushroom.height, mushroom.x + mushroom.width, mushroom.y); // Шляпка гриба
    }
  }
}

function drawCharacter() 
{
  // Рисуем персонажа в виде человека
  fill(character.color);
  // Голова
  ellipse(character.x + character.width / 2, character.y - 10, 20, 20);
  // Тело
  rect(character.x + 10, character.y, 20, character.height);
  
  // Руки
  if (character.facingLeft) 
  {
    rect(character.x - 10, character.y + 10, 10, 30); // Левая рука
    rect(character.x + character.width, character.y + 10, 10, 30); // Правая рука
  } 
  
  else 
  {
    rect(character.x, character.y + 10, 10, 30); // Левая рука
    rect(character.x + character.width - 10, character.y + 10, 10, 30); // Правая рука
  }
  
  // Ноги
  rect(character.x + 10, character.y + character.height, 10, 30);
  rect(character.x + 20, character.y + character.height, 10, 30);
}

function updateCharacter() 
{
  // Управление персонажем
  if (!character.isFalling) 
  {
    if (keyIsDown(LEFT_ARROW)) 
    {
      character.x -= 5;
      character.facingLeft = true; // Поворачиваем влево
    } 
    
    else if (keyIsDown(RIGHT_ARROW)) 
    {
      character.x += 5;
      character.facingLeft = false; // Поворачиваем вправо
    }
    
    if (keyIsDown(UP_ARROW) && !character.isJumping) 
    {
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
    if (character.x + character.width - 30 > canyon.x && character.x < canyon.x + canyon.width && character.y + character.height >= canyon.y) 
    {
      character.isFalling = true;
      score -= 5
    }

    // Проверка на столкновение с грибами
    for (let mushroom of mushrooms) {
      if (mushroom.isActive && character.x + character.width > mushroom.x && character.x < mushroom.x + mushroom.width && character.y + character.height >= mushroom.y) {
        if (character.velocityY > 0) { // Если персонаж прыгает
          mushroom.isActive = false; // Гриб исчезает
          character.velocityY = -10; // Отпрыгиваем от гриба
          score += 2
        } else {
          character.x = 100; // Если не прыгаем, возрождаемся
          score -= 5
        }
      }
    }
  }
  
  if(character.isFalling)
  {
    character.y += 5
  }
  
  if(character.y >= 600)
  {
    character.isFalling = false
    resetGame()
  }

  // Обновляем движение грибов
  for (let mushroom of mushrooms) {
    if (mushroom.isActive) {
      mushroom.x += mushroom.direction * mushroom.speed;
      if (mushroom.x - 200 < 0 || mushroom.x + mushroom.width + 200 > width) {
        mushroom.direction *= -1; // Меняем направление
      }
    }
  }
}

function drawCoin()
{
  fill(coin.color)
  circle(coin.x, coin.y, coin.radius)
  
  if((abs(character.x - coin.x) <= coin.radius) && (character.y - 50 <= coin.y))
  {
    coin.x = int(random(200, 500))
    coin.y = int(random(height - 100, height - 250))
    score += 1
  }
}

function resetGame() {
  character.x = 100
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