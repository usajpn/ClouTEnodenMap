/* @pjs preload="../../img/flowerC.png" */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean flower1 = true;
int flower_color = 1;
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

void drawFlower(){
	if (timer % 40 == 0){
		if (small){
			small = false;		
		}else{
			small = true;		
		}
	}
	/*
	if (timer % 240 == 0){
		if (flower_color == 1){
			flower_color = 0;		
		} else {
			flower_color = 1;		
		}		
	}
	*/
	w = flower;
	if (small) {
		drawImage(w, 0, 0, 600, 600);		
	} else {
		drawImage(w, 0, 10, 600, 600);		
	}
}

void drawTitle() {
	fill(255, 255, 255);
	textSize(80);
	text("今日の花", 700, 150);
}

void drawFlowerName() {
	int maxTemp = getFlowerName();
	fill(255, 255, 255);
	textSize(60);
	//text("最高気温: " + maxTemp + "°C", 700, 350);
	text("誕生花:" + maxTemp, 700 ,350);
}

void drawFlowerWord() {
	int minTemp = getFlowerWord();
	fill(255, 255, 255);
	textSize(60);
	//text("最低気温: " + minTemp + "°C", 700, 450);
	text("花言葉:" + minTemp, 700, 450);
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}


