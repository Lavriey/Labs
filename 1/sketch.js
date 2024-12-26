function setup() {
    createCanvas(1024, 576);
}

function draw() {
    background(100, 155, 255); // fill the sky blue

    noStroke();
    fill(0, 155, 0);
    rect(0, 432, 1024, 144); // draw some green ground

    // 1. a cloud in the sky
    fill(255); // white color for the cloud
    ellipse(200, 100, 80, 50); // main body of the cloud
    ellipse(230, 90, 60, 40); // left puff of the cloud
    ellipse(170, 90, 60, 40); // right puff of the cloud
    ellipse(210, 120, 80, 50); // bottom puff of the cloud
    
    noStroke();
    fill(255);

    // 2. a mountain in the distance
    fill(139, 69, 19); // brown color for the mountain
    triangle(450, 256, 600, 432, 300, 432); // creating a mountain shape

    noStroke();
    fill(255);

    // 3. a tree
    fill(139, 69, 19); // brown color for the trunk
    rect(780, 300, 20, 60); // trunk of the tree
    fill(34, 139, 34); // green color for the leaves
    ellipse(790, 290, 70, 70); // top foliage

    noStroke();
    fill(255);

    // 4. a canyon
    fill(176, 224, 230); // lighter color to represent the canyon
    beginShape();
    vertex(0, 432);
    vertex(200, 300); // left side of the canyon
    vertex(350, 440); // middle depth
    vertex(600, 300); // right side of the canyon
    vertex(800, 432);
    vertex(1024, 432);
    vertex(1024, 576);
    vertex(0, 576);
    endShape(CLOSE);

    noStroke();
    fill(255);

    // 5. a collectable token - eg. a jewel, fruit, coins
    fill(255, 215, 0); // golden color for the token
    ellipse(400, 400, 30, 30); // main body of the collectable item
    fill(255, 0, 0); // red color for the gem sparkle
    ellipse(400, 395, 10, 10); // sparkle on the token

    noStroke();
    fill(255);
}