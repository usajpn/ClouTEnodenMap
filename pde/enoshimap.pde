/* @pjs preload="../ClouT/img/map.png, ../ClouT/img/sunny.png, ../ClouT/img/cloudy.png, ../ClouT/img/rainy.png, ../ClouT/img/enone.png, ../ClouT/img/enonex.png, ../ClouT/img/wave.png, ../ClouT/img/bubble.png, ../ClouT/img/weatherbubble.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean left = true;
String[] weather = ["../ClouT/img/sunny.png", "../ClouT/img/cloudy.png", "../ClouT/img/rainy.png"];

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
	//drawEnone();
	drawWeather();
	drawTemperature();
	drawHumidity();
	//drawWave();
}

void drawBackground() {
	background(0);
	//drawImage("../ClouT/img/map.png", 0, 0, document.body.offsetWidth, document.body.offsetHeight);
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
		drawImage("../ClouT/img/enonex.png", 800, 250, 100, 100);
		drawImage("../ClouT/img/bubble.png", 400, 240, 400, 150);
		textSize(30);
		fill(0, 0, 0);
		text("到着まであと2分!", 450, 320);
	} else {
		drawImage("../ClouT/img/enone.png", 790, 240, 120, 120);
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
	
	//drawImage("../ClouT/img/weatherbubble.png", 100, 100, 1200, 600);

	if (small) {
		drawImage(weather[getWeather()], 0, 0, 600, 600);
	} else {
		drawImage(weather[getWeather()], 0, 10, 600, 600);
	}
}

void drawTemperature() {
	int temp = getEnoshimaTemperature();
	fill(255, 255, 255);
	textSize(60);
	text("気温: " + temp + "°C", 800, 200);
}

void drawHumidity() {
	int hum = getEnoshimaHumidity();
	fill(255, 255, 255);
	textSize(60);
	text("湿度: " + hum + "%", 800, 400);
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
		drawImage("../ClouT/img/wave.png", 70, 550, 50, 50);
		drawImage("../ClouT/img/wave.png", 120, 600, 50, 50);
		drawImage("../ClouT/img/wave.png", 150, 500, 50, 50);
		drawImage("../ClouT/img/wave.png", 500, 700, 50, 50);
		drawImage("../ClouT/img/wave.png", 600, 650, 50, 50);
		drawImage("../ClouT/img/wave.png", 800, 750, 50, 50);
		drawImage("../ClouT/img/wave.png", 900, 700, 50, 50);
		drawImage("../ClouT/img/wave.png", 1250, 600, 50, 50);
		drawImage("../ClouT/img/wave.png", 1300, 700, 50, 50);
	} else {
		drawImage("../ClouT/img/wave.png", 60, 550, 50, 50);
		drawImage("../ClouT/img/wave.png", 110, 600, 50, 50);
		drawImage("../ClouT/img/wave.png", 140, 500, 50, 50);
		drawImage("../ClouT/img/wave.png", 490, 700, 50, 50);
		drawImage("../ClouT/img/wave.png", 590, 650, 50, 50);
		drawImage("../ClouT/img/wave.png", 790, 750, 50, 50);
		drawImage("../ClouT/img/wave.png", 890, 700, 50, 50);
		drawImage("../ClouT/img/wave.png", 1240, 600, 50, 50);
		drawImage("../ClouT/img/wave.png", 1290, 700, 50, 50);
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

