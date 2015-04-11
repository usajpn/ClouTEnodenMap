/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean left = true;
String[] weather = ["../../img/sunny.png", "../../img/cloudy.png", "../../img/rainy.png"];

// Processing default function (1)
void setup() {
	size(window.screen.width, window.screen.height);
	background(0);
	fill(0);
	PFont fontA = loadFont("courier");
	textFont(createFont("Hiragino Maru Gothic Pro",20));
}

// Processing default function (2)
void draw(){
	timer++;
	drawBackground();
	drawEnone();
}

void drawBackground() {
	background(0);
}

void drawEnone() {
	if (timer % 80 == 0) {
		if (smallE) {
			smallE = false;
		} else {
			smallE = true;	
		}
	}

	if (smallE) {
		drawImage("../../img/enonex.png", 600, 10, 480, 480);

		drawImage("../../img/bubble.png", 0, 50, 600, 400);
		textSize(64);
		fill(0, 0, 0);
		textSize(50);
		text("今日は", 50, 170);
		textSize(70);
		fill(0, 200, 0);
		String specialDay = getSpecialDay();
		// String specialDay = "おなかすいただのんこ";
		int wordCount = int(getWordCount()) - 1;
		// int wordCount = 10;
		int margin = 0;

		if (wordCount <= 4) {
			margin = 70;
			textSize(80);
		} else if (wordCount == 5) {
			margin = 30;
			textSize(80);
		} else if (wordCount == 6) {
			margin = 20;
		} else if (wordCount == 7) {
			margin = 0;
		} else {
			margin = 0;
			textSize(60 - ((wordCount - 7) * 5));
		}
		text(specialDay, margin + 50, 280);


		textSize(50);
		fill(0, 0, 0);
		text("だのん♪", 350, 370);

	} else {
		drawImage("../../img/enone.png", 590, 0, 500, 500);
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
