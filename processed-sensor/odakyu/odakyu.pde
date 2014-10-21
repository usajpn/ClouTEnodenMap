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

    if (timer % 20 == 0) {
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
        drawImage("../../img/odakyu/odakyu.png", 475, 110, 400, 150);
    }
    else {
        drawImage("../../img/odakyu/odakyu.png", 475, 100, 400, 150);
    }
}

void drawOdakyuInfo() {
    fill(255, 255, 255);

    textSize(100);
    text(info[odakyuStatus], 450, 400);
    textSize(20);
    text("（各社ホームページより。実際の運行状況と異なる可能性があります）", 450, 560);
}

void drawImage(String imgPath, x, y) {
    PImage img = loadImage(imgPath);
    image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
    PImage img = loadImage(imgPath);
    image(img, x, y, w, h);
}


