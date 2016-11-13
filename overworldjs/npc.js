Npc = function (width, height, row, column, limit, imageSrc, fps, columns, rows) {

	var parent = this;
	this.name = "";
	this.id ="";
	this.source=null;
	this.image = new Image();
	this.image.src = imageSrc;
	this.image.pic = imageSrc;
	this.shadow = new Image();
	this.shadow.src = "charactor/hero/misc.png";
	this.shadow.position = new Vector2(0);
	



	if (fps == null || fps >= 32)
		this.fps = 1;
	else
		this.fps = 32 / fps;
	this.fpsCounter = 1;
	//this.frame = 0;

	this.width = width;
	this.height = height;
	this.rowStart = row;
	this.columnStart = column;
	this.row = row;
	this.column = column;
	this.rows = rows;
	this.columns = columns;
	if (limit == null || limit == 0)
		this.limit = 999999999;
	else
		this.limit = limit - 1;

	this.limitCount = 0;
	this.position = new Vector2(0);
	this.perviousPosition = new Vector2(0); //专门用于更随系统
	this.cropPosition = new Vector2(0);
	this.speed = new Vector2(0);
	this.steps = 0;
	this.jump = false;
	this.riding = false;

	this.perviousFace = "";
	this.face = "down";
	this.perviousAction = "";
	this.action = "rest";
	this.follower = null;
	this.timer = 0;
	this.tilePos = Vector2(0);

	this.autowalkingWay = "";
	this.traget = null;
	this.expression = "";    //战斗图标
	
	this.script=null;
	//-----------------------------------------杂项


	//function start here----------------------------------------------------- 

	this.loadPic = function () {
		var pic = this.image;
		pic.onload = function () {
			//alert(pic.width+","+pic.height)
			parent.width = Math.floor(pic.width / 3);
			parent.height = Math.floor(pic.height / 4);
		};

	};
	this.loadPic();



	/////////////////////////////////////////////////////////////////////初始化值
};



Npc.prototype = {
	Draw: function (ctx) {

		//ctx.drawImage(this.shadow,0,17,16,6,this.position.x+6,this.position.y+this.height/2-2,16,6); //数字为偏移
		ctx.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - 3, this.position.y - 18, this.width, this.height);

		if (this.jump) {
			input.disablekeys();
			this.jumpRender();

		}
		if (this.ingrass)
			this.ingrassRender();

		if (this.expression != "")
			this.expressionRender();

		this.fpsCounter++;
		if (this.fpsCounter >= this.fps) {
			this.fpsCounter = 0;
			this.Update();
			if (this.fpsCounter == 0) {
				if (this.steps < 4) {
					if (this.jump) {
						switch (this.steps) {

						case 0:
							this.position.y -= 8;
							//alert(this.position.y);
							break;
						case 1:
							this.position.y -= 5;
							//	alert(this.position.y);
							break;

						case 2:
							this.position.y += 3;

							//alert(this.position.y);
							break;

						case 3:
							this.position.y += 10;
							//alert(this.position.y);
							break;
						}
					}


				
					this.position.Move(this.speed);

				} else {
					this.speed.Set(0, 0);
					this.jump = false;
				}
				this.steps++;


				if (this.limitCount < this.limit) {
					this.limitCount++;
					//alert("1");

					if (this.column < this.columns - 1) {
						this.column++;
						//alert(this.column);
					} else {

						this.column = 1;
						//alert(this.column);

					}
				}
			} else {
				//this.steps=0;


				//alert("else");
			}
		}
	},
	jumpRender: function () {

		switch (this.steps) {
		case 0:
			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 9, 32, 11);
			ctxmain.drawImage(this.shadow, 96, 22, 31, 9, this.position.x, this.position.y + 25, 32, 8);
			break;
		case 1:
			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 12, 32, 11);
			ctxmain.drawImage(this.shadow, 96, 22, 31, 9, this.position.x, this.position.y + 25 + 12, 32, 8);
			break;

		case 2:

			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 12, 32, 11);

			ctxmain.drawImage(this.shadow, 96, 53, 31, 9, this.position.x, this.position.y + 25 + 12, 32, 8);
			break;
		case 3:
			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 9, 32, 11);
			ctxmain.drawImage(this.shadow, 96, 53, 31, 9, this.position.x, this.position.y + 25 + 9, 32, 8);
			break;

		case 4:
			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25, 32, 11);
			ctxmain.drawImage(this.shadow, 96, 53, 31, 9, this.position.x, this.position.y + 25, 32, 8); //鏁板瓧涓哄亸绉
			break;
		case 5:

			this.jump = false;
			input.enable = true;
		}


	},

	ingrassRender: function () {
		switch (this.steps) {
		case 0:
			ctxmain.drawImage(this.shadow, 33, 3, 28, 32, this.position.x, this.position.y + 25, 35, 12);
			break;
		case 1:
			ctxmain.drawImage(this.shadow, 33, 35, 28, 19, this.position.x, this.position.y + 25, 35, 12);
			break;
		case 2:
			ctxmain.drawImage(this.shadow, 33, 73, 28, 17, this.position.x, this.position.y + 25, 35, 12);
			break;
		case 3:
			ctxmain.drawImage(this.shadow, 33, 107, 28, 17, this.position.x, this.position.y + 25, 35, 12);
		default:
			ctxmain.drawImage(this.shadow, 0, 20, 29, 11, this.position.x, this.position.y + 25, 35, 12);

		}
	},
	expressionRender: function () {
		switch (this.steps) {
		case 0:
			input.enable = false;
			ctxmain.drawImage(this.shadow, 0, 105, 30, 26, this.position.x, this.position.y - 35, 32, 5);
			break;
		case 1:
			ctxmain.drawImage(this.shadow, 0, 105, 30, 26, this.position.x, this.position.y - 35, 32, 10);
			break;
		case 2:
		case 3:
			ctxmain.drawImage(this.shadow, 0, 105, 30, 26, this.position.x, this.position.y - 35, 32, 32);
			break;
		case 4:
			ctxmain.drawImage(this.shadow, 0, 105, 30, 26, this.position.x, this.position.y - 35, 32, 27);
		case 5:
			this.expression = "";
			input.enable = true;
			break;
		}

	},


	SetFpsOnly: function (fps) {
		if (fps == null || fps >= 33)
			this.fps = 1;
		else
			this.fps = 33 / fps;
	},


	SetFps: function (fps) {
		if (fps == null || fps >= 33)
			this.fps = 1;
		else
			this.fps = 33 / fps;

		this.fpsCounter = 0;
	},

	SetSrc: function (src) {
		this.image.src = src;
		this.image.pic = src;
	},

	SetLimit: function (limit) {
		this.limit = limit - 1;
		this.limitCount = 0;
		this.column = 0;
	},

	SetRow: function (num) {
		this.row = num;
		this.rowStart = num;
	},

	SetColumn: function (num) {
		this.column = num;
		this.columnStart = num;
	},


	Update: function () {

		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;

		if (this.columns == null || this.columns == 0)
			this.columns = this.image.width / this.width;
		if (this.rows == null || this.rows == 0)
			this.rows = this.image.height / this.height;

		this.shadow.position.x = this.position.x;
		this.shadow.position.y = this.position.y;

	},
	Turn: function (dir) {
		switch (dir) {

		case "up":
			this.SetRow(0);
			this.perviousFace = this.face;
			this.face = "up";
			break;

		case "down":
			this.SetRow(2);
			this.perviousFace = this.face;
			this.face = "down";
			break;

		case "left":
			this.SetRow(3);
			this.perviousFace = this.face;
			this.face = "left";
			break;

		case "right":
			this.SetRow(1);
			this.perviousFace = this.face;
			this.face = "right";
			break;

		}
		this.perviousAction == "rest";
	},

	setPosition: function (x, y) {
		this.position.x = x * 32;
		this.position.y = y * 32;
		this.tilePos=new Vector2(x,y);
		//this.tilePos.Set(x,y) ;
		
	},

	Move: function (dir) {
		if (this.steps > 4) {
			switch (dir) {
			case "up":
				//
				this.Turn("up");
				if (this.jump) {
					this.speed.Set(0, -16);
					this.perviousAction = "JumpUp";
				} else {
					this.speed.Set(0, -8);
					this.perviousAction = "WalkUp";
				}

				this.SetLimit(4);
				this.steps = 0;
				break;
			case "down":
				this.Turn("down");
				if (this.jump) {
					this.speed.Set(0, 16);
					this.perviousAction = "JumpDown";
				} else {
					this.speed.Set(0, 8);
					this.perviousAction = "WalkDown";
				}
				this.SetLimit(4);
				this.steps = 0;
				break;
			case "left":
				this.Turn("left");
				if (this.jump) {
					this.speed.Set(-16, 0);
					this.perviousAction = "JumpLeft";
				} else {
					this.speed.Set(-8, 0);
					this.perviousAction = "WalkLeft";
				}
				this.SetLimit(4);
				this.steps = 0;
				break;
			case "right":
				this.Turn("right");
				if (this.jump) {
					this.speed.Set(16, 0);
					this.perviousAction = "JumpRight";
				} else {
					this.speed.Set(8, 0);
					this.perviousAction = "WalkRight";
				}
				this.SetLimit(4);
				this.steps = 0;
			}

		}
		//

		//
	},

	getTileStand: function () {
		var x = Math.floor((this.position.x + 3) / 32); //2 为绘图左上角到主角左上角偏移的值
		var y = Math.floor((this.position.y + 18) / 32);
		result = new Vector2(x, y)
		//alert(result.x+","+result.y);
		return result;
	},

	getTile: function () {
		var x = Math.floor((this.position.x + 3) / 32);
		var y = Math.floor((this.position.y + 18) / 32);
		return new Vector2(x, y);
	},



	getfrontTile: function () {
		var now = this.getTileStand();
		switch (this.face) {
		case "up":
			now.y -= 1;
			break;
		case "down":
			now.y += 1;
			break;
		case "left":
			now.x -= 1;
			break;
		case "right":
			now.x += 1
			break;
		}
		return now;
	},
	getPositionFaceTo: function () {
		var now = this.position;
		switch (this.face) {
		case "up":
			now.y -= 32;
			break;
		case "down":
			now.y += 32;
			break;
		case "left":
			now.x -= 32;
			break;
		case "right":
			now.x += 32;
			break;
		}
		return now;
	},

	getbackTile: function () {
		var x = Math.floor((this.position.x + 3) / 32);
		var y = Math.floor((this.position.y + 18) / 32);

		switch (this.face) {
		case "up":
			y += 1;
			break;
		case "down":
			y -= 1;
			break;
		case "left":
			x += 1;
			break;
		case "right":
			x -= 1;
			break;

		}
		//console.log("front: " + x + "," + y);
		return new Vector2(x, y);


	},



	GetFace: function () {
		var tmp = "前一个" + this.perviousFace + "现在面朝" + this.face;
		return tmp;
	},

	say: function () {

		var p = this.getTile();
		ctxmain.font = " 20px";
		ctxmain.rect(this.position.x - 30, this.position.y - 40, 100, 30);
		ctxmain.fillText(p.x + "," + p.y, this.position.x, this.position.y - 20);
		ctxmain.stroke();

	},

	Setfollower: function (pokemon) {
		this.follower = pokemon;
		this.perviousAction = "";
		pokemon.owner = this;
		pokemon.display(this);
	},
	orderDraw: function () {
		if (this.follower != null) {
			//alert("got1");
			if (this.position.y > this.follower.position.y) {
				this.follower.Draw(ctxmain);

				this.Draw(ctxmain);
				return;
			} else

			{
				this.Draw(ctxmain);
				this.follower.Draw(ctxmain);

				return;
			}
		} else {

			this.Draw(ctxmain);

		}


		//console.log("hello");
	},

	Move: function (dir) {
		var front = this.getfrontTile();
		var terrain = map.geTerrain(front.x, front.y)
		if (terrain == "Collisions")
			return;

		if (terrain == "LedgesRight")
			this.jump = true;
		else if (terrain == "LedgesRight")
			this.jump = true;
		else if (terrain == "LedgesLeft")
			this.jump = true;
		else if (terrain == "LedgesDown")
			if (this.face === "down")
				this.jump = true;
			else
				return;

		if (terrain == "Grass")
			this.ingrass = true;
		else
			this.ingrass = false;


		if (this.follower != null)
			this.follower.follow(this);

		switch (dir) {
		case "up":
			//
			if (this.jump) {
				this.speed.Set(0, -16);
				this.perviousAction = "JumpUp";
			} else {
				this.speed.Set(0, -8);
				this.perviousAction = "WalkUp";
			}

			this.SetLimit(4);
			this.steps = 0;
			break;
		case "down":

			if (this.jump) {
				this.speed.Set(0, 16);
				this.perviousAction = "JumpDown";
			} else {
				this.speed.Set(0, 8);
				this.perviousAction = "WalkDown";
			}
			this.SetLimit(4);
			this.steps = 0;
			break;
		case "left":

			if (this.jump) {
				this.speed.Set(-16, 0);
				this.perviousAction = "JumpLeft";
			} else {
				this.speed.Set(-8, 0);
				this.perviousAction = "WalkLeft";
			}
			this.SetLimit(4);
			this.steps = 0;
			break;
		case "right":

			if (this.jump) {
				this.speed.Set(16, 0);
				this.perviousAction = "JumpRight";
			} else {
				this.speed.Set(8, 0);
				this.perviousAction = "WalkRight";
			}
			this.SetLimit(4);
			this.steps = 0;
		}

		this.tilePos = front;

	},

	checkPlayer: function (distantce) {
		var now = this.tilePos;
		var playpos = play.tilePos;
		switch (this.face) {
		case "up":
			if (playpos.x == now.x && playpos.y <= now.y && playpos.y >= now.y - distantce) {
				
				return now.y - playpos.y;
			}
			break;
				
		case "down":
			if (playpos.x == now.x && playpos.y >= now.y && playpos.y <= now.y + distantce) {
				
				return playpos.y - now.y;

			}
			break;
				
		case "left":
			if (playpos.y == now.y && playpos.x <= now.x && playpos.x >= now.x - distantce) {
				
				return now.x - playpos.x;

			}
			break;
				
		case "right":
			if (playpos.y == now.y && playpos.x >= now.x && playpos.x <= now.x + distantce) {
				
				return playpos.x - now.x;
			}
			break;

		}
		if (this.traget != null)
			this.traget = null;
		return false;

	},

	turnTotraget: function (player) {
		if (player.tilePos.x - this.tilePos.x < 0)
			this.Turn("left");
		else if (player.tilePos.x - this.tilePos.x > 0)
			this.Turn("right");
		else if (player.tilePos.y - this.tilePos.y < 0)
			this.Turn("up");
		else if (player.tilePos.y - this.tilePos.y > 0)
			this.Turn("down");
	},

	autowalking: function (distance, walkMethod) {
		
		if (play.traget===this){
			return;}
		if (s.maintraget===this){
			return;}
		
		switch (walkMethod) {
		case "cycle":
			this.walkCycle(distance);

			break;
		case "lookAround":
			this.lookAround(distance);
			break;
		case "upDown":
			this.walkingUpAndBack(distance);
			break;
		case "leftRight":
			this.walkingLeftandRight(distance);
			break;
		default:
			this.stand(walkMethod, distance);
		}
	},

	walkCycle: function (distance) {
		
		if (!this.checkPlayer(distance)) {
			if (this.timer == 18 || this.timer == 38)
				this.Turn("down");
			else if (this.timer == 20 || this.timer == 40)
				this.Move("down");

			else if (this.timer == 58 || this.timer == 78)
				this.Turn("right");
			else if (this.timer == 60 || this.timer == 80)
				this.Move("right");

			else if (this.timer == 98 || this.timer == 118)
				this.Turn("up");
			else if (this.timer == 100 || this.timer == 120)
				this.Move("up");

			else if (this.timer == 138)
				this.Turn("left");
			else if (this.timer == 140)
				this.Move("left");

			else if (this.timer == 160) {
				this.Turn("left");
				this.Move("left");
				this.timer = 0;
			}
			this.timer++;
		}

	},

	lookAround: function (distance) {
		if (!this.checkPlayer(distance)) {
			if (this.timer == 40)
				this.Turn("down");
			else if (this.timer == 80)
				this.Turn("right");
			else if (this.timer == 120)
				this.Turn("up");
			else if (this.timer == 160) {
				this.Turn("left");
				this.timer = 0;
			}
			this.timer++;
		}
	},


	walkingUpAndBack: function (distance) {
		if (!this.checkPlayer(distance)) {
			switch (this.timer) {
			case 18:
			case 38:
				this.Turn("up");
				break;
			case 20:
			case 40:
				this.Move("up");
				break;
			case 58:
			case 78:
				this.Turn("down");
				break;
			case 60:
				this.Move("down");
				break;
			case 80:
				this.Move("down");
				this.timer = 0;
			}
			this.timer++;
		}

	},

	walkingLeftandRight: function (distance) {
		if (!this.checkPlayer(distance)) {
			switch (this.timer) {
			case 18:
			case 38:
				this.Turn("left");
				break;
			case 20:
			case 40:
				this.Move("left");
				break;
			case 58:
			case 78:
				this.Turn("right");
				break;
			case 60:
				this.Move("right");
				break;
			case 80:
				this.Move("right");
				this.timer = 0;
			}
			this.timer++;
		}
	},

	stand: function (dir, distance) {
		if (!this.checkPlayer(distance)) {
			if (this.face != dir)
				this.Turn(dir);
		}
		return;
	}


};