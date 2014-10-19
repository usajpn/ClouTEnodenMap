/* @pjs preload="../../img/odakyu/odakyu.png, ../../img/odakyu/staff0.png, ../../img/odakyu/staff1.png" */

boolean small = false;
int timer = 0;
int odakyuStatus = 0;
String info = {"平常運転", "只今遅延\nしております"};

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
}

void drawBackground() {
    background(0);
}

void drawStaff() {
    if (timer % 20 == 0) {
        if (small) {
            small = false;
        }
        else {
            small = true;
        }
    }

    if (small) {
        drawImage("../../img/odakyu/staff" + odakyuStatus + ".png", 25, 25, 430, 600);
    }
    else {
        drawImage("../../img/odakyu/staff" + odakyuStatus + ".png", 0, 0, 480, 640);
    }
}

void drawOdakyu() {
    drawImage("../../img/odakyu/odakyu.png", 450, 0, 320, 350);
}

void drawOdakyuInfo() {
    fill(255, 255, 255);

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


