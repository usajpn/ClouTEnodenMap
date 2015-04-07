/* @pjs preload="../../img/train/shonan_mono.png, ../../img/train/shonanshinjuku.png, ../../img/train/tokaido.png, ../../img/train/yokosuka.png, ../../img/train/odakyu.png, ../../img/train/staff0.png, ../../img/train/staff1.png" */
// You have to declare which images you are going to use in above
// declare them in comma separeted style

int timer = 0;
int current = 0;
int trainStatus = 0;
String trainType = {
    "湘南新宿ライン",
    "小田急線",
    "湘南モノレール"
    /*
    "東海道本線",
    "横須賀線",
    */
};
String trainImg = {
    "shonanshinjuku",
    "odakyu",
    "shonan_mono"
    /*
    "tokaido",
    "yokosuka",
    */
};
String infoText = {"平常運転です", "遅延しております"};
int next = 0;

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

    if (timer % 200 == 0) {
        current = timer;
        next++;

        if (next == 0) {
            trainStatus = getShonanShinjukuStatus();
        }
        /*
        else if (next == 1) {
            trainStatus = getTokaidoStatus();
        }
        else if (next == 2) {
            trainStatus = getYokosukaStatus();
        }
        */
        else if (next == 1) {
            trainStatus = getOdakyuStatus();
        }
        else if (next == 2) {
            trainStatus = getShonanMonoStatus();
        }
        else {
            trainStatus = getShonanShinjukuStatus();
        }

        if (next > 2) {
            next = 0;
        }
    }

    if (timer - current > 10) {
        drawStaff();
        drawTrain();
        drawTrainInfo();
    }

}

void drawBackground() {
    background(0);
}

void drawStaff() {
    drawImage("../../img/train/staff" + trainStatus + ".png", 0, 0, 480, 640);
}

void drawTrain() {
    if (timer % 20 == 0) {
        drawImage("../../img/train/" + trainImg[next] + ".png", 475, 110, 400, 200);
    }
    else {
        drawImage("../../img/train/" + trainImg[next] + ".png", 475, 100, 400, 200);
    }
}

void drawTrainInfo() {
    fill(255, 255, 255);

    textSize(80);
    text(trainType[next], 450, 400);
    text(infoText[trainStatus], 450, 500);

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


