/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean weather1 = true;
boolean left = true;
String[] weather = ["../../img/sunny.png", "../../img/cloudy.png", "../../img/rainy.png", ["../../img/sunny.png", "../../img/cloudy.png"], ["../../img/cloudy.png", "../../img/rainy.png"]];

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
	drawWeather();
	drawTitle();
	drawTemperature();
	drawHumidity();
}

void drawBackground() {
	background(0);
}

void drawWeather() {
	if (timer % 20 == 0) {
		if (small) {
			small = false;
		} else {
			small = true;	
		}
	}

	if (timer % 60 == 0) {
		if (weather1) {
			weather1 = false;
		} else {
			weather1 = true;
		}
	}

	String w;
	if (weather[getWeather()] instanceof String) {
		w = weather[getWeather()];
	}
	else {
		if (weather1) {
			w = weather[getWeather()][0];
		} else {
			w = weather[getWeather()][1];
		}
	}	

	if (small) {
		drawImage(w, 0, 0, 600, 600);
	} else {
		drawImage(w, 0, 10, 600, 600);
	}
}

void drawTitle() {
	fill(255, 255, 255);
	textSize(60);
	text("現在の江の島", 700, 150);
}

void drawTemperature() {
	int temp = getEnoshimaTemperature();
	fill(255, 255, 255);
	textSize(60);
	text("気温: " + temp + "°C", 700, 350);
}

void drawHumidity() {
	int humidity = getEnoshimaHumidity();
	fill(255, 255, 255);
	textSize(60);
	text("湿度: " + humidity + "%", 700, 450);
	textSize(20);
	text("出典：一般財団法人日本気象協会（tenki.jp）", 700, 510);
	text("江ノ島ヨットハーバー 気象情報", 760, 540);
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}


