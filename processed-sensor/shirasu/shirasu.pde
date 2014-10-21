/* @pjs preload="../../img/shirasu.png, ../../img/batsu.png" */

boolean small = false;
int timer = 0;
int amount = 2;
String txt = {"しらす 入荷あり!\n食べに行こう！", "しらす 本日わずか"};

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
            drawImage("../../img/shirasu.png", 150, 250, 640, 480);
            drawImage("../../img/shirasu.png", 250, 250, 640, 480);
            drawImage("../../img/shirasu.png", 150, 150, 640, 480);
            drawImage("../../img/shirasu.png", 250, 150, 640, 480);
        }
        else {
            drawImage("../../img/shirasu.png", 160, 270, 640, 480);
            drawImage("../../img/shirasu.png", 260, 270, 640, 480);
            drawImage("../../img/shirasu.png", 200, 170, 640, 480);
            drawImage("../../img/shirasu.png", 300, 170, 640, 480);
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

    // 大漁
    if (amount == 0) {
        if (small) {
            textSize(70);
            text(txt[0], 250, 80);
        }
        else {
            textSize(70);
            text(txt[0], 240, 100);
        }
    }
    // 入荷僅か
    else if (amount == 1) {
        textSize(70);
        text(txt[1], 270, 80);
    }
    else {
        textSize(70);
        text("", 540, 80);
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

