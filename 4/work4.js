class Collectible {
    constructor(x, y, color, size) {
        this.x = x; // Координата х
        this.y = y; // Координата y
        this.color = color; // Цвет объекта
        this.size = size; // Размер объекта
    }

    // Метод для отрисовки collectible
    draw() {
        fill(this.color); // Устанавливаем цвет
        ellipse(this.x, this.y, this.size, this.size); // Рисуем кружок
    }
}
let collectibles = []; // Массив для хранения подбираемых объектов

function setup() {
    createCanvas(1024, 576);

    // Создаем несколько collectibles и добавляем их в массив
    collectibles.push(new Collectible(400, 400, color(255, 215, 0), 30)); // Золото
    collectibles.push(new Collectible(450, 350, color(255, 0, 0), 25)); // Красное
    collectibles.push(new Collectible(300, 450, color(0, 255, 0), 20)); // Зеленое
}

function draw() {
    background(100, 155, 255); // Заполняем фон небом голубым

    noStroke();
    fill(0, 155, 0);
    rect(0, 432, 1024, 144); // Рисуем зеленую землю

    // Отрисовываем облако
    drawCloud();
    
    // Отрисовываем гору
    drawMountain();

    // Отрисовываем дерево
    drawTree();

    // Отрисовываем каньон
    drawCanyon();
    
    // Отрисовываем collectibles из массива
    for (let collectible of collectibles) {
        collectible.draw(); // Вызов метода draw для каждого объекта
    }

    noStroke();
}

function drawCloud() {
    fill(255);
    ellipse(200, 100, 80, 50);
    ellipse(230, 90, 60, 40);
    ellipse(170, 90, 60, 40);
    ellipse(210, 120, 80, 50);
}

function drawMountain() {
    fill(139, 69, 19);
    triangle(450, 256, 600, 432, 300, 432);
}

function drawTree() {
    fill(139, 69, 19);
    rect(780, 300, 20, 60);
    fill(34, 139, 34);
    ellipse(790, 290, 70, 70);
}

function drawCanyon() {
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
}