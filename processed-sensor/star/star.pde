/* @pjs preload="../../img/star/star.png, ../../img/star/starwatching.png" */

int timer = 0;
int starStatus = 0;
int width = 0; 
int pos = 0;

// Processing default function (1)
void setup() {
    size(window.screen.width, window.screen.height);
    background(0);
    fill(0);
    //PFont fontA = loadFont("courier");
    //textFont(fontA, 20);  
    textFont(createFont("Hiragino Maru Gothic Pro",20));
}

// Processing default function (2)
void draw(){
    timer++;
    drawBackground();
    starStatus = getEnoshimaStarStatus();
    starStatus = 0; 
    drawStar();
    drawStarStatus();
}

void drawBackground() {
    background(0);
}

void drawStar() {
    drawImage("../../img/star/starwatching.png", 150, 150, 640, 480);

    if (starStatus == 1) {
        drawImage("../../img/star/star.png", 600 - 5 * (timer % 100), 100 + 1 * (timer % 100), 64, 48);
        drawImage("../../img/star/star.png", 500 - 4 * (timer % 80), 80 + 1 * (timer % 80), 64, 48);
        drawImage("../../img/star/star.png", 700 - 3 * (timer % 200), 150 + 1 * (timer % 200), 64, 48);
    }
    else if (starStatus == 0) {
        drawImage("../../img/star/star.png", 600 - 5 * (timer % 100), 100 + 1 * (timer % 100), 64, 48);
    }
    else {
        drawImage("../../img/star/star.png", 600, 150, 64, 48);
    }
}

void drawStarStatus() {
    textSize(70);
    fill(255, 255, 255);
    String txt = getEnoshimaStarInfo();

    text(txt, 0, 80);

    textSize(20);
    text("出典: excite 天気", 20, 160);
}


void drawImage(String imgPath, x, y) {
    PImage img = loadImage(imgPath);
    image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
    PImage img = loadImage(imgPath);
    image(img, x, y, w, h);
}

