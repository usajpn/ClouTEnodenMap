/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png */
/* @pjs font="chalk.vlw"; */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean left = true;
String[] weather = ["../../img/sunny.png", "../../img/cloudy.png", "../../img/rainy.png"];

Clock clock = new Clock();
int MARGIN = 20;

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
	clock.getTime();
	clock.draw(200, 200);	
}

void drawBackground() {
	background(0);
}

void drawEnone() {
	// console.log(PFont.list());
	if (timer % 50 == 0) {
		if (smallE) {
			smallE = false;
		} else {
			smallE = true;	
		}
	}

	int isDelayed = getIsDelayed();

	if (smallE) {
		drawImage("../../img/enonex.png", 600, 30, 480, 480);
	} else {
		drawImage("../../img/enone.png", 590, 20, 500, 500);
	}
	drawImage("../../img/bubble.png", 0, 70, 600, 400);
	String[] times;
	times = getTimeArrayWithPast();
	// console.log(times);
	textSize(64);
	fill(0, 0, 0);
	// times = ["12:00", "12:12", "12:24", "12:36", "12:48"]
	// times = ["12:00", "12:12", "12:24", "12:36"];
	// times = ["12:00", "12:12", "12:24"];
	// times = ["12:00", "12:12"];
	if (isDelayed == 1 || times.length == 0) {
		fill(0, 200, 0);
		textSize(60);
		text("えのんくんの…", 60, 170);
		textSize(40);
		if (getMinuteNow() % 3 == 0) {
			fill(0, 0, 0);
			text("好きな言葉は", 60, 240);			
			textSize(80);
			text("ありがとう", 80, 340);			
		} else if (getMinuteNow() % 2 == 0) {
			fill(0, 0, 0);
			text("好きなスポーツは", 60, 240);			
			textSize(80);
			text("フットサル", 80, 340);			
		} else {
			fill(0, 0, 0);
			text("好きな色は", 60, 240);
			textSize(80);
			text("幸せの黄色", 70, 340);			
		}
	textSize(40);
	text("だのん♪", 400, 420);			

	} else {
		// textSize(48);
		// fill(255,255,255);
		// text("現在時刻: " + getTimeNow(), 90, 60);

		textSize(46);
		fill(0, 200, 0);
		text("江ノ電の時刻表だのん♪", 36, 155);

		textSize(60);
		int timeHeightDefault = 230;
		int timeHeight = timeHeightDefault;


		for (int i=0; i<times.length; i++) {
			if (i == 0) {
				fill(160,160,160);
			} else {
				fill(0, 0, 0);
			}
			text(times[i] + " 発", 280, timeHeight);
			timeHeight = timeHeight + 80;
		}	


		// if (times.length == 5) {
		// 	textSize(70);
		// 	int timeHeightDefault = 230;
		// 	int timeHeight = timeHeightDefault;
		// 	for (int i=1; i<times.length; i++) {
		// 		fill(0, 0, 0);
		// 		if (i < 3) {
		// 			text(times[i] + "発", 50, timeHeight);
		// 		} else {
		// 			if (i == 3) {
		// 				timeHeight = timeHeightDefault;	
		// 			}
		// 			text(times[i], 300, timeHeight);
		// 		}
		// 		timeHeight = timeHeight + 80;
		// 	}
		// } else if (times.length == 4 || times.length == 3) {
		// 	textSize(75);
		// 	int timeHeightDefault = 260;
		// 	int timeHeight = timeHeightDefault;	
		// 	for (int i=1; i<times.length; i++) {
		// 		fill(0, 0, 0);
		// 		if (i < 2) {
		// 			text(times[i] + "発", 50, timeHeight);
		// 		} else {
		// 			if (i == 2) {
		// 				timeHeight = timeHeightDefault;	
		// 			}
		// 			text(times[i] + "発", 300, timeHeight);
		// 		}
		// 		timeHeight = timeHeight + 100;
		// 	}
		// } else {
		// 	textSize(80);
		// 	int timeHeightDefault = 250;
		// 	int timeHeight = timeHeightDefault;	
		// 	for (int i=1; i<times.length; i++) {
		// 		fill(0, 0, 0);
		// 		text(times[i] + "発", 160, timeHeight);
		// 		timeHeight = timeHeight + 120;
		// 	}	
		// }
		textSize(18);
			text("(実際の発車時刻は運行状況によって変わる可能性があります)", 38, 430);
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

class Clock {
  float s, m, h;
  Clock(){
  }
 
  void getTime(){
    s = second();
    m = minute() + (s/60.0);
    h = hour()%12 + (m/60.0);
  }
 
  void draw(wid, hei){


    translate(140, 286);
    rotate(radians(180));
    pushMatrix();
    fill(255);
    strokeWeight(14);
    stroke(128);
    ellipse(0, 0, wid, hei);


    fill(128);
    noStroke();
    // for(int i=0; i<60; i++){
    //   rotate(radians(6));
    //   ellipse(wid/2-MARGIN,0,3,3);
    // }
    for(int i=0; i<12; i++){
      rotate(radians(30));
      ellipse(wid/2-MARGIN,0,10,10);
    }



    popMatrix();
    noFill();
    stroke(0);
    pushMatrix();
    // rotate(radians(s*(360/60)));
    // strokeWeight(1);
    // line(0,0,0,wid/2-MARGIN);
    stroke(60);
    popMatrix();
    pushMatrix();
    rotate(radians(m*(360/60)));
    strokeWeight(6);
    line(0,0,0,wid/2-MARGIN);
    popMatrix();
    pushMatrix();
    rotate(radians(h*(360/12)));
    strokeWeight(8);
    line(0,0,0,wid/3-MARGIN);
    popMatrix();
  }
}
