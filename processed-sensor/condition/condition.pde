/* @pjs preload="../../img/happy_woman/happy_woman0.png, ../../img/happy_woman/happy_woman1.png, ../../img/happy_woman/happy_woman2.png" */

boolean small = false;
int timer = 0;
int condition = 0;
Stirng status = {"Good", "Great", "Wonderful"};

// Processing default function (1)
void setup() {
    size(window.screen.width, window.screen.height);
    background(0);
    fill(0);
    PFont fontA = loadFont("courier");
    textFont(fontA, 20);  
}

// Processing default function (2)
void draw(){
    timer++;
    drawBackground();
    condition = getEnoshimaCondition();
    drawWoman(condition);
    drawCondition(condition);
}

void drawBackground() {
    background(0);
}

void drawWoman(index) {
    if (timer % 20 == 0) {
        if (small) {
            small = false;
        }
        else {
            small = true;
        }
    }

    if (small) {
        drawImage("../../img/happy_woman/happy_woman" + index + ".png", 170, 60, 438, 576);
    }
    else {
        drawImage("../../img/happy_woman/happy_woman" + index + ".png", 150, 0, 480, 640);
    }

}

void drawCondition(index) {
    textSize(100);

    if (index == 0) {
        fill(67, 135, 233);
        text(status[index], 280, 700);
    }
    else if (index == 1) {
        fill(34, 195, 80);
        text(status[index], 260, 700);
    }
    else if (index == 2) {
        fill(228, 155, 15);
        text(status[index], 150, 700);
    }
    else {
        fill(34 ,195, 80);
        text(status[0], 280, 700);
    }
}

void drawImage(String imgPath, x, y) {
    PImage img = loadImage(imgPath);
    image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
    PImage img = loadImage(imgPath);
    image(img, x, y, w, h);
}


