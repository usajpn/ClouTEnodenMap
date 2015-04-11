/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png */
/* @pjs font="chalk.vlw"; */

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
	// PFont fontA = loadFont("../../font/chalk.vlw");
	// textFont(fontA, 20);
	 // textFont(createFont("Franklin Gothic Book",20));
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
	// console.log(PFont.list());
	smallE = true;
	if (timer % 200 < 50 && 0 < timer % 200) {
		if (smallE) {
			smallE = false;
		} else {
			smallE = true;	
		}
	}

	int isDelayed = getIsDelayed();

	if (smallE) {
		String[] times;
		times = getTimeArray();
		// console.log(times);
		drawImage("../../img/enonex.png", 600, 10, 480, 480);
		drawImage("../../img/bubble.png", 0, 50, 600, 400);
		textSize(64);
		fill(0, 0, 0);
		// times = ["12:00", "12:12", "12:24", "12:36", "12:48"]
		// times = ["12:00", "12:12", "12:24", "12:36"];
		// times = ["12:00", "12:12", "12:24"];
		// times = ["12:00", "12:12"];
		if (isDelayed == 1 || times.length == 0) {
			fill(0, 200, 0);
			textSize(60);
			text("えのんくんの…", 60, 150);
			textSize(40);
			if (getMinuteNow() % 3 == 0) {
				fill(0, 0, 0);
				text("好きな言葉は", 60, 220);			
				textSize(80);
				text("ありがとう", 80, 320);			
			} else if (getMinuteNow() % 2 == 0) {
				fill(0, 0, 0);
				text("好きなスポーツは", 60, 220);			
				textSize(80);
				text("フットサル", 80, 320);			
			} else {
				fill(0, 0, 0);
				text("好きな色は", 60, 220);
				textSize(80);
				text("幸せの黄色", 70, 320);			
			}
		textSize(40);
		text("だのん♪", 400, 400);			

		} else {
			textSize(36);
			fill(0, 200, 0);
			text("江ノ電: 現在時刻 前後の時刻表", 34, 140);

			if (times.length == 5) {
				textSize(70);
				int timeHeightDefault = 210;
				int timeHeight = timeHeightDefault;
				for (int i=0; i<times.length; i++) {
					fill(0, 0, 0);
					if (i < 3) {
						text(times[i], 50, timeHeight);
					} else {
						if (i == 3) {
							timeHeight = timeHeightDefault;	
						}
						text(times[i], 300, timeHeight);
					}
					timeHeight = timeHeight + 80;
				}
			} else if (times.length == 4 || times.length == 3) {
				textSize(75);
				int timeHeightDefault = 240;
				int timeHeight = timeHeightDefault;	
				for (int i=0; i<times.length; i++) {
					fill(0, 0, 0);
					if (i < 2) {
						text(times[i], 50, timeHeight);
					} else {
						if (i == 2) {
							timeHeight = timeHeightDefault;	
						}
						text(times[i], 300, timeHeight);
					}
					timeHeight = timeHeight + 100;
				}
			} else {
				textSize(80);
				int timeHeightDefault = 230;
				int timeHeight = timeHeightDefault;	
				for (int i=0; i<times.length; i++) {
					fill(0, 0, 0);
					text(times[i], 160, timeHeight);
					timeHeight = timeHeight + 120;
				}	
			}
			textSize(18);
			text("(実際の発車時刻は運行状況によって変わる可能性があります)", 38, 410);
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
