/* @pjs preload="../../img/shirasu.png, ../../img/batsu.png" */

boolean small = false;
int timer = 0;
int amount = 0;

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
    amount = getEnoshimaShirasuAmount();
    drawShirasu();
    drawAmount();
}

void drawBackground() {
    background(0);
}

void drawShirasu() {
    if (timer % 20 == 0) {
        if (small) {
            small = false;
        }
        else {
            small = true;
        }
    }

    if (amount == 1) {
        drawImage("../../img/shirasu.png", 50, 100, 640, 480);
        drawImage("../../img/shirasu.png", 50, 2000, 640, 480);
        drawImage("../../img/shirasu.png", 150, 100, 640, 480);
        drawImage("../../img/shirasu.png", 150, 200, 640, 480);
    }
    else if (amount == 2) {
        drawImage("../../img/shirasu.png", 150, 150, 640, 480);
    }
    else {
        drawImage("../../img/shirasu.png", 150, 150, 640, 480);
    }
}

void drawAmount() {
    fill(255, 255, 255);

    if (amount == 1) {
        fill(204, 0, 0);

        if (small) {
            textSize(80);
            text("本日大漁!", 220, 80);
        }
        else {
            textSize(100);
            text("本日大漁!", 180, 100);
        }
    }
    else if (amount == 2) {
        fill(34, 195, 80);
        if (small) {
            textSize(80);
            text("おいしいよ!", 200, 80);
        }
        else {
            textSize(100);
            text("おいしいよ!", 160, 100);
        }
    }
    else {
        drawImage("../../img/batsu.png", 150, 150, 640, 480);
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

