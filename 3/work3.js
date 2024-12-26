const ball = document.querySelector('.ball');
const container = document.querySelector('.container');

let posX = Math.random() * (container.clientWidth - 30); // начальная позиция по X
let posY = Math.random() * (container.clientHeight - 30); // начальная позиция по Y
let speedX = (Math.random() * 1) + 2; // скорость по X
let speedY = (Math.random() * 1) + 2; // скорость по Y

function updateBallPosition() {
    // Обновляем позицию мяча
    posX += speedX;
    posY += speedY;

    // Проверяем столкновение с стенками
    if (posX + 30 > container.clientWidth || posX < 0) {
        speedX = -speedX; // меняем направление по X
    }
    if (posY + 30 > container.clientHeight || posY < 0) {
        speedY = -speedY; // меняем направление по Y
    }

    // Устанавливаем новую позицию мяча
    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';

    // Запускаем следующий кадр анимации
    requestAnimationFrame(updateBallPosition);
}

// Устанавливаем начальную позицию мяча
ball.style.left = posX + 'px';
ball.style.top = posY + 'px';

// Запускаем анимацию
updateBallPosition();