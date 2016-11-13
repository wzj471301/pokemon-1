pokemonFollower = function (width, height, row, column, limit, imageSrc, fps, columns, rows) {
	var parent = this;
	this.image = new Image();

	this.image.src = imageSrc;
	this.image.pic = imageSrc;
	this.shadow = new Image();
	this.shadow.src = "\charactor\/hero\/misc.png";
	this.shadow.position = new Vector2(0);


	this.bigbody = false; //神兽体型修正
	if (fps == null || fps >= 32)
		this.fps = 1;
	else
		this.fps = 32 / fps;
	this.fpsCounter = 0;
	//this.frame = 0;

	this.width = 0; //width;
	this.height = 0; //height;
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
	//this.perviousPosition = new Vector2(0); //专门用于更随系统
	this.cropPosition = new Vector2(0);
	this.speed = new Vector2(0);
	this.steps = 0;
	this.jump = false;
	//this.ingrass = false;
	this.riding = false;

	this.perviousFace = "down";
	this.face = "down";
	this.perviousAction = "";
	this.action = "";
	this.owner = "";
	this.tilePos = new Vector2(0);
	//--------------------------------其他属性
	this.traget = null;

	//function start here----------------------------------------------------- 

	this.loadPic = function () {
		var pic = this.image;
		pic.onload = function () {
			//alert(pic.width+","+pic.height)
			parent.width = pic.width / 4;
			parent.height = pic.height / 4;
			if (pic.width > 256)
			{
				parent.bigbody = true;
		
			}
			}

	}
	this.loadPic();

	this.SetFpsOnly = function (fps) {
		if (fps == null || fps >= 33)
			this.fps = 1;
		else
			this.fps = 33 / fps;
	};


	this.SetFps = function (fps) {
		if (fps == null || fps >= 33)
			this.fps = 1;
		else
			this.fps = 33 / fps;

		this.fpsCounter = 0;
	}

	this.SetSrc = function (src) {
		this.image.src = src;
		this.image.pic = src;
	}

	this.SetLimit = function (limit) {
		this.limit = limit - 1;
	};

	this.SetRow = function (num) {
		this.row = num;
		this.rowStart = num;
	};

	this.SetColumn = function (num) {
		this.column = num;
		this.columnStart = num;
	}

	this.setPosition = function (x, y) {
		this.position.x = x * 32;
		this.position.y = y * 32;

		this.tilePos.x = x;
		this.tilePos.y = y;
		return;
	};

	this.Update = function () {

		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;

		if (this.columns == null || this.columns == 0)
			this.columns = this.image.width / this.width;
		if (this.rows == null || this.rows == 0)
			this.rows = this.image.height / this.height;





	};

	this.say = function () {

		var p = this.getTile();
		ctxmain.font = " 20px green";
		ctxmain.rect(this.position.x - 30, this.position.y - 40, 100, 30);
		ctxmain.fillText(p.x + "," + p.y, this.position.x, this.position.y - 20);
		ctxmain.stroke();

	}
	this.getTile = function () {
		var x = Math.floor((this.position.x) / 32);
		var y = Math.floor((this.position.y) / 32);
		return new Vector2(x, y);
	}



	this.Draw = function (ctxmain) {

		//this.say();	


		if (!this.bigbody) {
			try {


				if (this.face == "left")
					ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - ((this.width - 32) / 2) + this.width / 7, this.position.y - (this.height / 2), this.width, this.height);
				else if (this.face == "right")
					ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - ((this.width - 32) / 2) - this.width / 7, this.position.y - (this.height / 2), this.width, this.height);
				else
					ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - ((this.width - 32) / 2), this.position.y - (this.height / 2), this.width, this.height);

			} catch (err) {

				//console.log("")
			}
		} else {
			try {


				if (this.face == "left")
					ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - ((this.width - 32) / 2) + this.width / 7, this.position.y - (this.height/2 )-32, this.width, this.height);
				else if (this.face == "right")
					ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - ((this.width - 32) / 2) - this.width / 7, this.position.y - (this.height/2 )-32, this.width, this.height);
				else if (this.face == "up")
					ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - ((this.width - 32) / 2), this.position.y - (this.height / 2)-32, this.width, this.height+32);
				else
					ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - ((this.width - 32) / 2), this.position.y - (this.height / 2)-32, this.width, this.height);

			} catch (err) {

				//console.log("")
			}
		}


		//	ctxmain.rect(this.position.x-((this.width-32)/2), this.position.y-(this.height/2),this.width, this.height);
		//		ctxmain.rect(this.position.x,this.position.y,this.width,this.height);
		//	ctxmain.stroke();

		if (this.jump) {

			this.jumpRender();

		}





		this.fpsCounter++

		if (this.fpsCounter >= this.fps) {
			this.fpsCounter = 0;

			this.Update();
		}

		if (this.fpsCounter == 0) {
			if (this.steps < 4) {
				if (this.jump) {
					switch (this.steps) {

					case 0:

						this.position.y -= 9;
						break;
					case 1:

						this.position.y -= 12;
						break;
					case 2:

						this.position.y += 12;
						break;
					case 3:

						this.position.y += 9;
						break;


					}

				}



				this.position.Move(this.speed);


			} else {



				this.speed.Set(0, 0);

			}

			this.steps++;

			if (this.steps == 4 && this.jump)
				this.jump = false;




			if (this.limitCount < this.limit) {
				this.limitCount++;
				this.column++;


				if (this.row >= this.rows) {
					this.row++;
					this.column = 0;

					if (this.column >= this.columns) {
						this.row = this.rowStart;
						this.column = this.columnStart;
						this.limitCount = 0;



					}
				}

			} else {
				this.column = this.columnStart;
				this.row = this.rowStart;
				this.limitCount = 0;




			}


		}

	};


	this.jumpRender = function () {

		switch (this.steps) {
		case 0:
			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 9, 32, 11)
			ctxmain.drawImage(this.shadow, 96, 22, 31, 9, this.position.x, this.position.y + 25, 32, 8);
			break;
		case 1:
			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 12, 32, 11)
			ctxmain.drawImage(this.shadow, 96, 22, 31, 9, this.position.x, this.position.y + 25 + 12, 32, 8);
			break;

		case 2:

			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 12, 32, 11)

			ctxmain.drawImage(this.shadow, 96, 53, 31, 9, this.position.x, this.position.y + 25 + 12, 32, 8);
			break;
		case 3:

			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25 + 9, 32, 11);
			ctxmain.drawImage(this.shadow, 96, 53, 31, 9, this.position.x, this.position.y + 25 + 9, 32, 8);
			break;

		case 4:





		}


	}









	this.Turn = function (dir) {

		switch (dir) {

		case "up":
			this.SetRow(3);
			this.perviousFace = this.face;
			//this.SetLimit(2);	
			this.face = "up";
			if (this.owner) {
				var tilePos = this.owner.getTile();

				this.position.x = tilePos.x * 32;
				//	this.position.y=tilePos.y*32;
				//console.log(tilePos.x+","+tilePos.y);
			}


			break;

		case "down":
			this.SetRow(0);
			this.perviousFace = this.face;
			//	this.SetLimit(2);	
			this.face = "down";
			if (this.owner) {
				var tilePos = this.owner.getTile();
				this.position.x = tilePos.x * 32;
				//	this.position.y=tilePos.y*32;

			}


			break;

		case "left":
			this.SetRow(1);
			this.perviousFace = this.face;
			//	this.SetLimit(2);	
			this.face = "left";

			break;

		case "right":
			this.SetRow(2);
			this.perviousFace = this.face;
			//this.SetLimit(2);	
			this.face = "right";

			break;

		}
		this.perviousAction == "rest";
	};


	this.Move = function (dir) {


		switch (dir) {
		case "up":
			if (this.face !== "up")
				this.Turn("up");
			break;
		case "down":
			if (this.face !== "down")
				this.Turn("down");
			break;
		case "left":
			if (this.face !== "left")
				this.Turn("left");
			break;
		case "right":
			if (this.face !== "right")
				this.Turn("right");
			break;
		}

		var front = this.getfrontTile();
		var terrain = map.geTerrain(front.x, front.y)


		if (terrain == "LedgesRight")
			this.jump = true;
		else if (terrain == "LedgesRight")
			this.jump = true;
		else if (terrain == "LedgesLeft")
			this.jump = true;
		else if (terrain == "LedgesDown")
			this.jump = true;




		switch (dir) {
		case "up":
			//


			if (this.jump) {
				this.speed.Set(0, -16);
				this.perviousAction = "JumpUp";
				this.tilePos.y-=2;
			} else {
				this.speed.Set(0, -8);
				this.perviousAction = "WalkUp";
				this.tilePos.y-=1;
			}

			this.SetLimit(4);
			this.steps = 0;
			break;
		case "down":

			if (this.jump) {
				this.speed.Set(0, 16);
				this.perviousAction = "JumpDown";
				this.tilePos.y+=2;
			} else {
				this.speed.Set(0, 8);
				this.perviousAction = "WalkDown";
				this.tilePos.y+=1;
			}
			this.SetLimit(4);
			this.steps = 0;
			break;
		case "left":

			if (this.jump) {
				this.speed.Set(-16, 0);
				this.perviousAction = "JumpLeft";
				this.tilePos.x-=2;
			} else {
				this.speed.Set(-8, 0);
				this.perviousAction = "WalkLeft";
				this.tilePos.x-=1;
			}
			this.SetLimit(4);
			this.steps = 0;
			break;
		case "right":
			
			if (this.jump) {
				this.speed.Set(16, 0);
				this.perviousAction = "JumpRight";
				this.tilePos.x+=2;
			} else {
				this.speed.Set(8, 0);
				this.perviousAction = "WalkRight";
				this.tilePos.x+=1;
			}
			this.SetLimit(4);
			this.steps = 0;
		}

	};






	this.getfrontTile = function () {
		var x = Math.floor(this.position.x / 32);
		var y = Math.floor(this.position.y / 32);

		switch (this.face) {
		case "up":
			y -= 1;
			break;
		case "down":
			y += 1;
			break;
		case "left":
			x -= 1;
			break;
		case "right":
			x += 1;
			break;

		}
		//console.log("front: " + x + "," + y);
		return new Vector2(x, y);


	}
	this.getbackTile = function () {
		var x = Math.floor(this.position.x / 32);
		var y = Math.floor(this.position.y / 32);

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


	}


	this.follow = function (player) {
		//alert(player.walk.src);

		switch (player.perviousAction) {
		case "WalkUp":
			this.Move("up");
			break;
		case "WalkDown":
			this.Move("down");
			break;
		case "WalkLeft":
			this.Move("left");
			break;
		case "WalkRight":
			this.Move("right");
			break;
		case "JumpDown":
			this.jump = true;
			this.Move("down");
			break;
		case "JumpLeft":
			this.jump = true;
			this.Move("left");
			break;
		case "JumpRight":
			this.jump = true;
			this.Move("right");
			break;
		case "stand":
		default:
			break;
		}


	}


	this.display = function (player) {
		var back = player.getbackTile();




		this.position.y = back.y * 32;
		this.position.x = back.x * 32;
		this.tilePos = back;
		switch (this.owner.face) {
		case "up":
			this.owner.perviousAction = "WalkUp";
			break;
		case "down":
			this.owner.perviousAction = "WalkDown";
			break;
		case "left":
			this.owner.perviousAction = "WalkLeft";
			break;
		case "right":
			this.owner.perviousAction = "WalkRight";
			break;
		}



		//this.hide=true;

	};









}