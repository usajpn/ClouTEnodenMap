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
	textFont(fontA, 20);  
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
	if (timer % 50 == 0) {
		if (smallE) {
			smallE = false;
		} else {
			smallE = true;	
		}
	}

	int isDelayed = getIsDelayed();

	if (smallE) {
		String minTilDep = getMinutesTilDeparture();
		if (minTilDep <= 5) {
			drawImage("../../img/enonex.png", 600, 10, 480, 480);
		} else {
			drawImage("../../img/enone.png", 600, 10, 480, 480);
		}

		drawImage("../../img/bubble.png", 0, 100, 600, 300);
		textSize(64);
		fill(0, 0, 0);
		if (isDelayed == 1) {
			fill(255, 0, 0);
			text("江ノ電は", 60, 220);
			text("現在遅延しています", 150, 320);			
		} 
		// else if (minTilDep == "0") {
		// 	fill(255, 0, 0);
		// 	text("江ノ電の", 60, 220);
		// 	text("終電は終わりました。", 150, 320);
		// }
		else {
			text("江ノ電発車まで", 60, 220);
			if (minTilDep <= 5) {
				fill(255, 0, 0);
			}
			text("あと" + minTilDep + "分", 150, 320);
		}

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
