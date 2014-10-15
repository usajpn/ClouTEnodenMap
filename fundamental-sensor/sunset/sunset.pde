/* @pjs preload="../../img/sunset.jpg" */

int timer = 0;

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
	drawSunset();
	drawSetTime();
}

void drawBackground() {
	background(0);
}

void drawSunset() {
	drawImage("../../img/sunset.jpg", 0, 0, 640, 480);
}

void drawSetTime() {
	fill(255, 255, 255);
	textSize(30);
	text("日の入り時刻", 20, 380);
	textSize(80);
	text(getEnoshimaSunsetTime(), 0, 450);
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}


