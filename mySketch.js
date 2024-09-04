function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	colorMode(HSB);
	textAlign(CENTER);
	background("#222");
	textFont('Times New Roman', 500);
	//audio1();
}

function keyPressed(){
	if(key=='s' || key=='S'){
		saveFrames('audio','jpg',1,1);
	}
}

function draw() {
	blendMode(BLEND);	
	let bac_color=color("#222");
	background(bac_color);
	noStroke();
	//stroke("white");
	frameRate(0.5);	
	
	if(random()<0.5){
		blendMode(DIFFERENCE);
	}
	else{
		blendMode(SCREEN);	
	}
	
	let shapeCount=6;
	let points = [{x: 0, y: 0}];
	let tmpx,tmpy;
	for(let i=1;i<=shapeCount/2;i++){		
		tmpx=windowWidth/2
		tmpy=map(i,1,shapeCount/2,windowHeight*0.15,windowHeight*0.45)+random(-windowHeight*0.1,windowHeight*0.1);
		//random(windowHeight*0.1,windowHeight*0.5);
		points.push({x: tmpx, y: tmpy});
	}
	for(let i=shapeCount/2+1;i<=shapeCount;i++){
		tmpx=windowWidth/2//random(0,windowWidth);
		tmpy=points[i-shapeCount/2].y;
		points.push({x: tmpx, y: tmpy});
	}
		
	for(let i=1;i<=shapeCount;i++){
		let r=10;		
		let x=points[i].x;
		let y1=points[i].y;
		let y2=points[i].y*2;
		let rrate=1.005;		//r成長速度(階層)		
		let irate=random(0.05,0.5);		//彎的幅度
		let iloop=10;	//迴圈次數
		
		if(rrate>1){				
			let clr1=color(random(0,360),80,100);
			let clr2=color(random(0,360),80,100);	
			let rtmp=140;//長度
			while(r<=rtmp){
				let ratio=map(r,rtmp,10,1,0);
				let r2=map(r,150,200,10,50);
				let midclr=lerpColor(clr1,clr2,ratio);
				fill(midclr);				
				rect(x,y1,r,r2);			
				rect(x,y2,r,r2);
				r*=rrate;
				
				let subx=map(irate,0.05,0.5,20,35);
				//間隔距離
				//random(-10,10);
				
				if(i<=shapeCount/2){
					x+=subx;
					//+:往右彎
				}
				else{
					x-=subx;
					//-:往左彎
				}				
				y1+=iloop*irate;
				y2-=iloop*irate;				
				iloop+=1;			
			}		
		}		
	}
	
	blendMode(BLEND);
	fill("#fff");
	rect(windowWidth/2,0,10,windowHeight*2);	
	// if(random()<0.5){
	// 	blendMode(DIFFERENCE);
	// 	fill("#f3f3f3");	
	// }
	// else{
	// 	blendMode(DARKEST);
	// 	fill("#222");
	// }
	//text("AUDIO",windowWidth/2,windowHeight/1.4);
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}