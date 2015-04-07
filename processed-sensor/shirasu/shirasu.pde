/* @pjs preload="../../img/shirasu.png, ../../img/batsu.png" */
// You have to declare which images you are going to use in above
// declare them in comma separeted style

boolean small = false;
int timer = 0;
int amount = 2;
String txt = {"しらす 入荷あり!\n食べに行こう！", "しらす 本日わずか"};

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
            drawImage("../../img/shirasu.png", 150, 270, 640, 460);
            drawImage("../../img/shirasu.png", 250, 270, 640, 460);
            drawImage("../../img/shirasu.png", 150, 170, 640, 460);
            drawImage("../../img/shirasu.png", 250, 170, 640, 460);
        }
        else {
            drawImage("../../img/shirasu.png", 160, 290, 640, 460);
            drawImage("../../img/shirasu.png", 260, 290, 640, 460);
            drawImage("../../img/shirasu.png", 200, 190, 640, 460);
            drawImage("../../img/shirasu.png", 300, 190, 640, 460);
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
            text(txt[0], 250, 60);
        }
        else {
            textSize(70);
            text(txt[0], 240, 80);
        }
    }
    // 入荷僅か
    else if (amount == 1) {
        textSize(70);
        text(txt[1], 270, 60);
    }
    else {
        textSize(70);
        text("", 540, 60);
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

