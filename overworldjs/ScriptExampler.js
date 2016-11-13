////////////////////////////
/////////selection//////////
////////////////////////////



/*
$(document).keydown(function (event) {
	if (script.selection.selecting) {
		switch (event.keyCode) {
		case 40:
			script.selection.selectNext()
			break;
		case 38:
			script.selection.selectPer()
			break;
		case 90:
			script.selection.select();
			break;
		}

	}

	if (script.msgbox.saying)
		switch (event.keyCode) {
		case 90:
			script.msgbox.endtalk();
		}


})

*/

Selection = function () {

	var choice = this;
	this.selectionList = "";
	this.selecting = true;
	this.callback = null;
	this.val = "";

};


Selection.prototype = {
	insit: function (txts, callback) {
		this.selectionList = txts.split("?");
		this.callback = callback;

		var as = "";
		for (var i in this.selectionList) {
			if (i == 0) {
				as = '<a href="#" class="choose glyphicon glyphicon-play">' + this.selectionList[i] + '</a>';

			} else {
				as += '<a href="#" class="choose ">' + this.selectionList[i] + '</a>';
			}
		}
		$("body").append('<div id="msg-box-choose">' + as + '</div>');


	},
	removeUI: function () {
		//alert("123");
		$("#msg-box-choose").remove();

	},
	setList: function (array) {
		this.selectionList = [];

		for (var i in array) {
			this.selectionList.push(arry[0]);
		}
	},

	selectNext: function () {
		var a = $("body").find(".glyphicon-play");
		var i = a.index();
		if (i < $(".choose").length - 1) {
			a.removeClass("glyphicon glyphicon-play");
			$(".choose").eq(i + 1).addClass("glyphicon glyphicon-play");
		}
		return;
	},

	selectPer: function () {
		var a = $("body").find(".glyphicon-play");
		var i = a.index();
		if (i > 0) {

			a.removeClass("glyphicon glyphicon-play");
			$(".choose").eq(i - 1).addClass("glyphicon glyphicon-play");
		}
		return;
	},
	select: function () {
		var a = $("body").find(".glyphicon-play");
		var i = a.index();

		var ctx = $(".choose").eq(i).text();


		for (var x in this.selectionList) {
			if (this.selectionList[x] == ctx) {
				this.val = ctx;

				if (this.callback) {

					this.removeUI();
					this.callback(this.val);

				}
				return;

			}
		}
		return;

	}



};
////////////////////////////
/////////selection//////////
////////////////////////////



////////////////////////////
/////////Talk///////////////
////////////////////////////

Talk = function () {
	var talk = this;
	this.saying = false;
	this.fpsPreWord = 3;
	this.fpsCount = 0;
	this.text = "";
	this.textIndex = 0;
	this.substrTxt = "";


	this.callback = null;

	this.insit = function (txt, callback) {
		this.text = txt;
		this.callback = callback;

	};
	this.update = function () {
		this.fpsCount++;


		if ($("#msg-box").length == 0)
			$("body").append('<div id="msg-box"></div>')

		if ($("#nextTalk").length > 0)
			return;

		if (this.fpsCount >= this.fpsPreWord) {
			this.getNewTxt();
			this.fpsCount = 0;
		}

		$("#msg-box").html(this.substrTxt);
		if ((this.substrTxt == this.text)) {
			$("#msg-box").append('<img id="nextTalk" src="msg_arrow.gif">');
		}
	};

	this.getNewTxt = function () {
		if (this.textIndex < this.text.length + 1) {
			this.textIndex++;
			this.substrTxt = this.text.substr(0, this.textIndex++);
			//	console.log(this.substrTxt);

		} else {

		}

	};

	this.say = function () {
		this.saying = true;
	};
	this.removeUI = function () {
		this.saying = false;
		this.fpsPreWord = 3;
		this.fpsCount = 0;
		this.text = "";
		this.textIndex = 0;
		this.substrTxt = "";
		$("#msg-box").remove();
	};
	this.endtalk = function () {
		if ($("#nextTalk").length > 0) {
			this.removeUI();
			if (this.callback)
				this.callback();
		}
	};




}
////////////////////////////
/////////Talk///////////////
////////////////////////////


function ScriptSystem() {

	var script = this;
	this.start = false;
	this.end = false;
	this.process = false;
	this.scriptIndex = -1;

	this.consoleList = true;

	this.selection = new Selection();
	this.msgbox = new Talk();
	this.scriptTextList = [];


	this.maintraget = null;

	this.walkSteps = 0;
	this.walkStepCount = 0;
	this.walkingLoop = false;
	this.walkway = "";





}


ScriptSystem.prototype = {
	scriptEnd: function () {

		this.start = false;
		this.end = false;
		this.process = false;
		this.scriptIndex = -1;
		this.selection = new Selection();
		this.msgbox = new Talk();
		this.consoleList = true;
		this.scriptTextList = [];
		this.maintraget = null;
		console.log("script end");
	},
	scriptStart: function () {
		this.process = true;


	},

	Analysis: function () {


		if (this.scriptIndex < this.scriptTextList.length - 1) {
			try {
				this.scriptIndex++;
				this.readText(this.scriptTextList[this.scriptIndex]);
			} catch (err) {
				alert("index" + this.scriptIndex)
			}

			//console.log(this.scriptIndex +"===> "+this.scriptTextList[this.scriptIndex]);
		} else {

			this.scriptEnd();

		}

	},


	jumpTolbl: function (ctx) {

		serachword = "lbl " + ctx;
		//alert(serachword);
		for (var i = 0; i < this.scriptTextList.length; i++) {
			//alert("noeline "+this.scriptTextList[i])

			if (this.scriptTextList[i].indexOf(serachword) >= 0) {

				this.scriptIndex = i;
				this.Analysis();
				return;
			}
		}
		alert("didn't find the label " + ctx);
		this.scriptIndex--;
		this.Analysis();
	},


	readText: function (txt) {
		var a = txt.split(" ");

		switch (a[0]) {
		case "alert":
			this.alertTxt(a[1]);
			break;

		case "wait":
			this.wait(a[1]);
			break;

		case "choice":
			var s = this;

			this.selection.insit(a[1], function (callback) {
				//alert(callback);

				s.jumpTolbl(callback);
			});
			break;
		case "goto":
			this.jumpTolbl(a[1])

			break;
		case "msg":
			var s = this;
			this.msgbox.insit(a[1], function () {
				s.Analysis();
			});
			this.msgbox.say();
			break;
		case "lbl":
			this.scriptEnd();
			break;
		case "end":
			this.scriptEnd();
			break;
		case "turn":
			this.maintraget.Turn(a[1]);
			this.Analysis();
			break;
		case "jump":
			if (!this.maintraget) {
				alert("no traget")
				return;
			}

			this.maintraget.jump = true;
			this.maintraget.steps = 0;
			this.maintraget.SetLimit(4);
			this.Analysis();
			break;

		case "emote":
			if (!this.maintraget) {
				alert("no traget")
				return;
			}

			this.maintraget.expression = "1";
			this.maintraget.steps = 0;
			this.maintraget.SetLimit(4);
			this.Analysis();
			break;
		case "beat":
			if (this.maintraget.id)
				myInfor.beatNpc.push(this.maintraget.id);
			this.Analysis();
			break;
		case "battle":
			battleNpc(this.maintraget);
			break;
		case "walk":
			if (!a[2])
				alert("没有方向");
			else {
				this.walkSteps = a[1];
				this.walkway = a[2];
				this.walkingLoop = true;
				this.walkStepCount = 0;
			}
			break;
		case "Autofind":
			if (a[1] === "playerfront") {

			}

			break;
		case "tragetChange":

			if (a[1] && a[1] !== "player") {
			//	console.log(a[1]);
				this.maintraget = Game.npcList[a[1]];
				this.Analysis();
			} else if (a[1] == "player") {
				this.maintraget = play;
				this.Analysis();
			}
			break;
		default:
			//alert("未辨别"+txt);
		}

		if (this.consoleList)
			console.log(txt);

	},

	walkLoop: function () {



		if (this.maintraget.steps >= 4) {
			if (this.maintraget) {


				//console.log("1 step")
				if (this.walkStepCount >= this.walkSteps) {

					this.walkStepCount = 0;
					this.walkSteps = 0;
					this.walkway = "";
					this.walkingLoop = false;
					this.Analysis();
					return;
				}

				this.maintraget.Turn(this.walkway);
				this.maintraget.Move(this.walkway);

				this.walkStepCount++


			}

		}

	},

	alertTxt: function (ctx) {
	//	console.log(ctx);
		this.Analysis();

	},

	wait: function (s) {
		var a = this;
		console.log("wait");
		setTimeout(function () {
			a.Analysis();
		}, s)

	}








}


s = new ScriptSystem();

function scriptKeyEvent() {

	if (BT.Inbattle === true)
		battleMainLoop();

	if (!s.process)
		return;

	//	console.log("key Eventing");
	if (s.selection.selecting) {

		if (input.down) {

			s.selection.selectNext()

		}
		if (input.up) {

			s.selection.selectPer()

		}
		if (input.z) {

			s.selection.select();

		}

	}



	if (s.msgbox.saying) {


		if (input.z) {


			s.msgbox.endtalk();

		}

	}
	input.resetKeys();
}

function scriptFramesLoop() {
	//if (BT.Inbattle === true)
	//	 battleMainLoop();

	if (s.walkingLoop)
		s.walkLoop();
	else if (s.process === false && s.scriptTextList.length > 0) {
		s.scriptStart();
		s.Analysis();
	}
	if (s.msgbox) {
		if (s.msgbox.saying) {
			s.msgbox.update();
		}
	}

}