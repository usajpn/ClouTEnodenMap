/* @pjs preload="../../img/odakyu/odakyu.png, ../../img/odakyu/staff0.png, ../../img/odakyu/staff1.png" */

boolean small = false;
int timer = 0;
int odakyuStatus = 0;
String info = {"小田急線は\n平常運転です", "只今遅延\nしております"};

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
    odakyuStatus = getOdakyuStatus();
    drawStaff();
    drawOdakyu();
    drawOdakyuInfo();

    if (timer % 40 == 0) {
        small = true;
    }
    else {
        small = false;
    }
}

void drawBackground() {
    background(0);
}

void drawStaff() {
    drawImage("../../img/odakyu/staff" + odakyuStatus + ".png", 0, 0, 480, 640);
}

void drawOdakyu() {
    if (small) {
        drawImage("../../img/odakyu/odakyu.png", 475, 110, 400, 200);
    }
    else {
        drawImage("../../img/odakyu/odakyu.png", 475, 100, 400, 200);
    }
}

void drawOdakyuInfo() {
    if (odakyuStatus == 0) {
        fill(71, 234, 126);
    }
    else {
        fill(255, 129, 25);
    }

    textSize(100);
    text(info[odakyuStatus], 450, 450);
}

void drawImage(String imgPath, x, y) {
    PImage img = loadImage(imgPath);
    image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
    PImage img = loadImage(imgPath);
    image(img, x, y, w, h);
}


