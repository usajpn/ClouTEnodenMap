/* @pjs preload="../../img/aquariam.png, ../../img/camera.png, ../../img/scuba.gif, ../../img/happy_woman/happy_woman0.png, ../../img/happy_woman/happy_woman1.png, ../../img/happy_woman/happy_woman2.png" */

boolean small = false;
int timer = 0;
int condition = 0;
int glow = 150;
int prefix = 1;
Stirng status = {"江の島へGo!", "今 江の島は心地いいよ!", "今 江の島が快適だよ！"};

// Processing default function (1)
void setup() {
    size(window.screen.width, window.screen.height);
    background(0);
    fill(0);
    PFont fontA = loadFont("courier");
    textFont(createFont("Hiragino Maru Gothic Pro",20));
    //textFont(fontA, 20);  
}

// Processing default function (2)
void draw(){
    timer++;
    drawBackground();
    condition = getEnoshimaCondition();
    drawWoman(condition);
    drawMarine();
    drawCondition(condition);
    drawScuba(condition);
    drawCamera(condition);
}

void drawBackground() {
    background(0);
}

void drawWoman(index) {
    if (timer % 25 == 0) {
        if (small) {
            small = false;
        }
        else {
            small = true;
        }
    }

    if (small) {
        drawImage("../../img/happy_woman/happy_woman" + index + ".png", 470, 60, 324, 432);
    }
    else {
        drawImage("../../img/happy_woman/happy_woman" + index + ".png", 450, 0, 360, 480);
    }

}

void drawMarine() {
    if (small) {
        drawImage("../../img/aquariam.png", 900, 200, 320, 255);
    }
    else {
        drawImage("../../img/aquariam.png", 900, 220, 320, 255);
    }
}

void drawCondition(index) {
    textSize(100);
    fill(255, 255, 255);

    if (index == 0) {
        //fill(67, 135, 233);
        text(status[0], 350, 575);
    }
    else if (index == 1) {
        //fill(34, 195, 80);
        text(status[index], 130, 575);
    }
    else if (index == 2) {
        //fill(228, 155, 15);
        text(status[index], 150, 575);
    }
    else {
        //fill(34 ,195, 80);
        text(status[0], 350, 575);
    }
}

void drawScuba(condition) {
    if (condition > 0) {
        drawGlowingImage("../../img/scuba.gif", 250, 250, 180, 180);
    }
}


void drawCamera(condition) {
    translate(300, 25);

    if (condition == 2) {
        if (small) {
            rotate(PI/6);
        }
        else {
            scale(-1, 1);
            rotate(PI/6);
        }
        drawImage("../../img/camera.png", 0, 0, 180, 180);
    }
}

void drawImage(String imgPath, x, y) {
    tint(255);
    PImage img = loadImage(imgPath);
    image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
    tint(255);
    PImage img = loadImage(imgPath);
    image(img, x, y, w, h);
}


void drawGlowingImage(String imgPath, x, y, w, h) {
    glow = glow + 4 * prefix;

    if (glow >= 250 && prefix == 1) {
        prefix = -1;
    }
    else if (glow <= 150 && prefix == -1) {
        prefix = 1;
    }

    tint(glow);
    PImage img = loadImage(imgPath);
    image(img, x, y, w, h);
}
