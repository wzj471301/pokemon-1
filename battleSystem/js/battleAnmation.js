var pokeballCatch = {
	source: [{
			id: "0",
			url: "battleSystem/pokeball/pokeball_throw.png"
		}],
	framesLength: 20,
	currentFrame: 0,
	framesLine: [{
			0: {
				draw: [0, 8, 8, 31, 31],
				pos: [29, 338]
			},
			1: {
				draw: [0, 8, 48, 31, 71],
				pos: [62, 309]
			},
			2: {
				draw: [0, 8, 88, 31, 111],
				pos: [85, 292]
			},
			3: {
				draw: [0, 8, 128, 31, 151],
				pos: [101, 280]
			},
			4: {
				draw: [0, 8, 128, 31, 151],
				pos: [122, 268]
			},
			5: {
				draw: [0, 8, 128, 31, 151],
				pos: [143, 254]
			},
			6: {
				draw: [0, 8, 168, 31, 191],
				pos: [159, 244]
			},
			7: {
				draw: [0, 8, 208, 31, 231],
				pos: [175, 234]
			},
			8: {
				draw: [0, 8, 248, 31, 271],
				pos: [189, 225]
			},
			9: {
				draw: [0, 8, 288, 31, 311],
				pos: [219, 202]
			},
			10: {
				draw: [0, 8, 330, 31, 353],
				pos: [241, 191]
			},
			11: {
				draw: [0, 8, 370, 31, 393],
				pos: [261, 181]
			},
			12: {
				draw: [0, 6, 403, 31, 433],
				pos: [280, 171]
			},
			13: {
				draw: [0, 6, 403, 31, 433],
				pos: [304, 163]
			},
			14: {
				draw: [0, 6, 403, 31, 433],
				pos: [347, 156]
			},
			15: {
				draw: [0, 6, 403, 31, 433],
				pos: [371, 148],
				callback: function () {
					$(".enemyPic .pokePic").fadeOut("normal");
				},
				callbackcalled: false
			}, //open the ball
			16: {
				draw: [0, 7, 448, 30, 471],
				pos: [390, 146]
			},
			17: {
				draw: [0, 8, 370, 31, 393],
				pos: [390, 167]
			},
			18: {
				draw: [0, 8, 370, 31, 393],
				pos: [400, 167],
				callback: function () {
					if (rate(50)) {
						msg(enemyTeam.onbattle.name+" caught successful");
						
						catchPokemon(enemyTeam.onbattle);
						addPokedex(enemyTeam.onbattle.index)
						enemyTeam.onbattle.tmpState['hp']=-1;
						enemyTeam.onbattle.fall();
						
						
						
					} else {
						$(".enemyPic .pokePic").fadeIn()
						msg("Whoops, it is close!");
					}
				},
				callbackcalled: false
			},
			19: {
				draw: [0, 8, 330, 31, 353],
				pos: [403, 200]

			}


	}]

}

var skillOne = {
	source: [{
			id: "0",
			url: "battleSystem/images/anmation/Explosion.png"
		},
		{
			id: "1",
			url: "battleSystem/pokeball/pokeballs.png"
		}],
	framesLength: 20,
	currentFrame: 0,
	framesLine: [{
			0: {
				draw: [0, 61, 48, 131, 114],
				pos: [29, 338]
			},
			1: {
				draw: [0, 61, 48, 131, 114],
				pos: [62, 309]
			},
			2: {
				draw: [0, 61, 48, 131, 114],
				pos: [85, 292]
			},
			3: {
				draw: [0, 241, 37, 336, 135],
				pos: [101, 280]
			},
			4: {
				draw: [0, 241, 37, 336, 135],
				pos: [122, 268]
			},
			5: {
				draw: [0, 435, 37, 528, 135],
				pos: [143, 254]
			},
			6: {
				draw: [0, 435, 37, 528, 135],
				pos: [159, 244]
			},
			7: {
				draw: [0, 435, 37, 528, 135],
				pos: [175, 234]
			},
			8: {
				draw: [0, 807, 30, 926, 152],
				pos: [189, 225]
			},
			9: {
				draw: [0, 807, 30, 926, 152],
				pos: [219, 202]
			},
			10: {
				draw: [0, 807, 30, 926, 152],
				pos: [241, 191]
			},
			11: {
				draw: [0, 807, 30, 926, 152],
				pos: [261, 181]
			},
			12: {
				draw: [0, 21, 207, 173, 362],
				pos: [280, 171]
			},
			13: {
				draw: [0, 21, 207, 173, 362],
				pos: [304, 163]
			},
			14: {
				draw: [0, 21, 207, 173, 362],
				pos: [304, 156]
			},
			15: {
				draw: [0, 207, 202, 347, 395],
				pos: [304, 120],
				callback: function () {
					$(".enemyPic .pokePic").fadeToggle("normal");
				},
				callbackcalled: false
			}, //open the ball
			16: {
				draw: [0, 207, 202, 347, 395],
				pos: [304, 120],
				callback: function () {
					$(".enemyPic .pokePic").fadeToggle("normal");
				},
				callbackcalled: false
			},
			17: {
				draw: [0, 207, 202, 347, 395],
				pos: [304, 120],
				callback: function () {
					$(".enemyPic .pokePic").fadeToggle("normal");
				},
				callbackcalled: false
			},
			18: {
				draw: [0, 628, 28, 729, 125],
				pos: [304, 120]
			},
			19: {
				draw: [0, 628, 28, 729, 125],
				pos: [304, 120],
				callback: function () {
					$(".enemyPic .pokePic").fadeIn("normal");
					allyTeam.onbattle.useSkill(enemyTeam.onbattle,videoSystem.skillIndex);
				},
				callbackcalled: false

			}


	}]

}

var skillTwo = {
	source: [{
			id: "0",
			url: "battleSystem/images/anmation/Explosion.png"
		},
		{
			id: "1",
			url: "battleSystem/pokeball/pokeballs.png"
		}],
	framesLength: 20,
	currentFrame: 0,
	framesLine: [{
			0: {
				draw: [0, 61, 48, 131, 114],
				pos: [304, 120]
			},
			1: {
				draw: [0, 61, 48, 131, 114],
				pos: [304, 120]
			},
			2: {
				draw: [0, 61, 48, 131, 114],
				pos: [304, 120]
			},
			3: {
				draw: [0, 241, 37, 336, 135],
				pos: [304, 120]
			},
			4: {
				draw: [0, 241, 37, 336, 135],
				pos: [304, 156]
			},
			5: {
				draw: [0, 435, 37, 528, 135],
				pos: [304, 163]
			},
			6: {
				draw: [0, 435, 37, 528, 135],
				pos: [280, 171]
			},
			7: {
				draw: [0, 435, 37, 528, 135],
				pos: [261, 181]
			},
			8: {
				draw: [0, 807, 30, 926, 152],
				pos: [241, 191]
			},
			9: {
				draw: [0, 807, 30, 926, 152],
				pos: [219, 202]
			},
			10: {
				draw: [0, 807, 30, 926, 152],
				pos: [189, 225]
			},
			11: {
				draw: [0, 807, 30, 926, 152],
				pos: [175, 234]
			},
			12: {
				draw: [0, 21, 207, 173, 362],
				pos: [159, 244]
			},
			13: {
				draw: [0, 21, 207, 173, 362],
				pos: [143, 254]
			},
			14: {
				draw: [0, 21, 207, 173, 362],
				pos: [122, 268]
			},
			15: {
				draw: [0, 207, 202, 347, 395],
				pos: [101, 280],
				callback: function () {
					$(".allyPic .pokePic").fadeToggle("normal");
				},
				callbackcalled: false
			}, //open the ball
			16: {
				draw: [0, 207, 202, 347, 395],
				pos: [101, 292],
				callback: function () {
					$(".allyPic .pokePic").fadeToggle("normal");
				},
				callbackcalled: false
			},
			17: {
				draw: [0, 207, 202, 347, 395],
				pos: [85, 292],
				callback: function () {
					$(".allyPic .pokePic").fadeToggle("normal");
				},
				callbackcalled: false
			},
			18: {
				draw: [0, 628, 28, 729, 125],
				pos: [62, 309]
			},
			19: {
				draw: [0, 628, 28, 729, 114],
				pos: [29, 388],
				callback: function () {
					$(".allyPic .pokePic").fadeIn("normal");
					enemyTeam.onbattle.useSkill(allyTeam.onbattle,videoSystem.skillIndex)
				},
				callbackcalled: false

			}


	}]

}







function battleAnmation() {


	this.tmpPictureBuffer = []; // 图片对象
	this.anmationSaver = []; // obj对象存这里
	this.finish = true;
	this.fpsNow = 0;
	this.fpsInterval = 2;
	this.currentAnmationObj = {}; //目前播放的对象
	this.skillIndex=-1;                    //储存技能的index；之后结算时会用到
}


battleAnmation.prototype = {
	resetAll: function () { //初始化battleanmation
		this.tmpPictureBuffer = [];
		this.anmationSaver = [];
		this.finish = true;
		this.fpsNow = 0
		this.fpsInterval = 2;
		this.reload(this.currentAnmationObj);
		this.skillIndex=-1;  
	},
	loadAndplay:function(obj,skillIndex){
		if(this.finish===false)
			msg("interrupt the skill");
		
		this.resetAll();
		this.skillIndex=skillIndex;  
	 this.currentAnmationObj=obj;
	 this.installAnmationContent();
	 this.finish=false;
	},
	play: function () { // play the anmation
		if (this.finish === true)
			return;

		this.fpsNow++;
		if (this.fpsNow >= this.fpsInterval) {
			this.getnextFrame(this.anmationSaver);
			this.fpsNow = 0;
		}
		//playNthFrame(pokeballCatch);
		this.drawFrame(this.currentAnmationObj);

	},
	installAnmationContent: function (obj) { //把图片存在缓存中
		//var singlePictureBuffer = []
		var obj = this.currentAnmationObj;
		for (var i in obj.source) {

			var n = obj.source[i].id;
			var ig = new Image();
			ig.src = obj.source[i].url;
			//singlePictureBuffer[n]=ig;
			this.tmpPictureBuffer[n] = ig;
		}
		//imgs.push(singlePictureBuffer);
		//return imgs;
	},
	getnextFrame: function (obj) { //获取下一帧index
		var obj = this.currentAnmationObj;
		var fl = obj.framesLength;
		if (obj.currentFrame >= fl - 1) {
			//alert("play finish");
			this.finish = true;
			return;
		}
		obj.currentFrame++;

	},
	reload: function (obj) { // 重置anmation 对象

		var obj = this.currentAnmationObj;
		obj.currentFrame = 0;
		for (var i in obj.framesLine) {

			for (var j in obj.framesLine[i])
				if (obj.framesLine[i][j].callbackcalled === true)
					obj.framesLine[i][j].callbackcalled = false;
		}
	},
	drawSingle: function (step, source) { //画一个图像
		var sx = step.draw[1];
		var sy = step.draw[2];
		var sw = step.draw[3] - step.draw[1];
		var sh = step.draw[4] - step.draw[2];
		var xcvs = step.pos[0];
		var ycvs = step.pos[1];
		ctxB.drawImage(source, sx, sy, sw, sh, xcvs, ycvs, sw, sh);

		if (step.callbackcalled === false) {
			try {
				step.callback.call();
			} catch (err) {
				//log("failed to call function");
				//console.log(step);
				//alert(step)
				//console.log(step);
				//alert(this.skillIndex);
			}
			step.callbackcalled = true;
		}
	},
	drawFrame: function (obj) { //画 anmation对象中所有图像

		var obj = this.currentAnmationObj;
		var cf = obj.currentFrame;
		for (var i in obj.framesLine) {
			var step = obj.framesLine[i][cf]
			var sourceneed = step.draw[0]; // 所需图片A A在source中的index
			var img = this.tmpPictureBuffer[sourceneed];
			this.drawSingle(step, img);

		}
	}
}

