/* @pjs preload="../../img/shirasu.png, ../../img/batsu.png" */

boolean small = false;
int timer = 0;
int amount = 0;
String txt = {"しらす 本日大漁!", "しらす おいしいよ！", "しらす 本日わずか"};

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
    drawAmount();
    drawShirasu();
}

void drawBackground() {
    background(0);
}

void drawShirasu() {
    if (timer % 40 == 0) {
        if (small) {
            small = false;
        }
        else {
            small = true;
        }
    }

    if (amount == 0) {
        if (small) {
            drawImage("../../img/shirasu.png", 150, 200, 640, 480);
            drawImage("../../img/shirasu.png", 250, 200, 640, 480);
            drawImage("../../img/shirasu.png", 150, 100, 640, 480);
            drawImage("../../img/shirasu.png", 250, 100, 640, 480);
        }
        else {
            drawImage("../../img/shirasu.png", 160, 210, 640, 480);
            drawImage("../../img/shirasu.png", 260, 210, 640, 480);
            drawImage("../../img/shirasu.png", 200, 110, 640, 480);
            drawImage("../../img/shirasu.png", 300, 110, 640, 480);
        }
    }
    else if (amount == 1) {
        if (small) {
            drawImage("../../img/shirasu.png", 250, 150, 640, 480);
        }
        else {
            drawImage("../../img/shirasu.png", 250, 130, 640, 480);
        }
    }
    else {
        if (small) {
            drawImage("../../img/shirasu.png", 250, 150, 640, 480);
        }
        else {
            drawImage("../../img/shirasu.png", 250, 130, 640, 480);
        }
    }
}

void drawAmount() {
    fill(255, 255, 255);

    if (amount == 0) {
        fill(204, 0, 0);

        if (small) {
            textSize(80);
            text(txt[0], 220, 80);
        }
        else {
            textSize(100);
            text(txt[0], 160, 100);
        }
    }
    else if (amount == 1) {
        fill(34, 195, 80);
        if (small) {
            textSize(80);
            text(txt[1], 220, 80);
        }
        else {
            textSize(100);
            text(txt[1], 160, 100);
        }
    }
    else {
        textSize(100);
        text(txt[2], 160, 100);
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

