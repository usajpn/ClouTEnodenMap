/* @pjs preload="../img/map.png, ../img/sunny.png, ../img/cloudy.png, ../img/rainy.png, ../img/enone.png, ../img/enonex.png, ../img/wave.png, ../img/bubble.png, ../img/weatherbubble.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean left = true;
String[] weather = ["../img/sunny.png", "../img/cloudy.png", "../img/rainy.png"];

// Processing default function (1)
void setup() {
	size(window.screen.width, window.screen.height);
	background(255);
	fill(0);
	PFont fontA = loadFont("courier");
	textFont(fontA, 20);  
}

// Processing default function (2)
void draw(){
	timer++;
	drawBackground();
	drawEnone();
	//drawWeather();
	//drawTemperature();
	//drawHumidity();
	//drawWave();
}

void drawBackground() {
	background(255);
	//drawImage("../img/map.png", 0, 0, document.body.offsetWidth, document.body.offsetHeight);
}

void drawEnone() {
	if (timer % 50 == 0) {
		if (smallE) {
			smallE = false;
		} else {
			smallE = true;	
		}
	}

	if (smallE) {
		drawImage("../img/enonex.png", 800, 100, 800, 800);
		drawImage("../img/bubble.png", 100, 240, 800, 300);
		textSize(30);
		text("到着まであと2分!", 450, 320);
	} else {
		drawImage("../img/enone.png", 790, 120, 800, 800);
	}
}

void drawWeather() {
	if (timer % 20 == 0) {
		if (small) {
			small = false;
		} else {
			small = true;	
		}
	}
	
	//drawImage("../img/weatherbubble.png", 100, 100, 1200, 600);

	if (small) {
		drawImage(weather[getWeather()], 100, 100, 800, 800);
	} else {
		drawImage(weather[getWeather()], 100, 90, 800, 800);
	}
}

void drawTemperature() {
	int temp = getEnoshimaTemperature();
	textSize(80);
	text("気温: " + temp + "°C", 1000, 400);
}

void drawHumidity() {
	int hum = getEnoshimaHumidity();
	textSize(80);
	text("湿度: " + hum + "%", 1000, 700);
}

void drawWave() {
	if (timer % 20 == 0) {
		if (left) {
			left = false;
		} else {
			left = true;	
		}
	}

	if (left) {
		drawImage("../img/wave.png", 70, 550, 50, 50);
		drawImage("../img/wave.png", 120, 600, 50, 50);
		drawImage("../img/wave.png", 150, 500, 50, 50);
		drawImage("../img/wave.png", 500, 700, 50, 50);
		drawImage("../img/wave.png", 600, 650, 50, 50);
		drawImage("../img/wave.png", 800, 750, 50, 50);
		drawImage("../img/wave.png", 900, 700, 50, 50);
		drawImage("../img/wave.png", 1250, 600, 50, 50);
		drawImage("../img/wave.png", 1300, 700, 50, 50);
	} else {
		drawImage("../img/wave.png", 60, 550, 50, 50);
		drawImage("../img/wave.png", 110, 600, 50, 50);
		drawImage("../img/wave.png", 140, 500, 50, 50);
		drawImage("../img/wave.png", 490, 700, 50, 50);
		drawImage("../img/wave.png", 590, 650, 50, 50);
		drawImage("../img/wave.png", 790, 750, 50, 50);
		drawImage("../img/wave.png", 890, 700, 50, 50);
		drawImage("../img/wave.png", 1240, 600, 50, 50);
		drawImage("../img/wave.png", 1290, 700, 50, 50);
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

void zigzag(int x, int y, int time) {}

void bounce(int x, int y, int time) {}

