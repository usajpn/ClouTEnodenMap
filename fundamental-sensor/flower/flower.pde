/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png, ../../img/flowerC.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean flower1 = true;
boolean left = true;
String flower = "../../img/flowerC.png";

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
	drawFlower();
	drawTitle();
	drawFlowerName();
	drawFlowerWord();
}

void drawBackground() {
	background(0);
}

void drawFlower() {
	if (timer % 40 == 0) {
		if (small) {
			small = false;
		} else {
			small = true;	
		}
	}

	String w = flower;

	if (small) {
		drawImage(w, 0, 0, 600, 600);
	} else {
		drawImage(w, 0, 10, 600, 600);
	}
}

void drawTitle() {
	fill(255, 255, 255);
	textSize(70);
	text("今日の花", 630, 150);
}

void drawFlowerName() {
	int maxTemp = getFlowerName();
	fill(255, 255, 255);
	textSize(60);
	text("誕生花", 670 ,280);
	text(maxTemp, 670 ,380);
}

void drawFlowerWord() {
	int minTemp = getFlowerWord();
	fill(255, 255, 255);
	textSize(60);
	text("花言葉", 670, 500);
	text(minTemp, 670, 600);
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}


