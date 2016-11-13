mainPlayer = function (width, height, row, column, limit, imageSrc, fps, columns, rows) {
	this.type = "player";
	this.playerID = "";
	this.image = new Image();
	this.image.src = imageSrc;
	this.image.pic = imageSrc;
	this.shadow = new Image();
	this.shadow.src = "charactor\/hero\/misc.png";
	this.shadow.position = new Vector2(0);

	this.surf = new Image();
	this.surf.src = "charactor\/hero\/boysurf.png";
	this.surf.pic = "charactor\/hero\/boysurf.png"
	this.walk = new Image();
	this.walk.src = "charactor\/hero\/boywalking.png";
	this.walk.pic = "charactor\/hero\/boywalking.png";
	//alert(this.walk.src);
	this.bike = new Image();
	this.bike.src = "charactor\/hero\/boybiking.png";
	this.bike.pic = "charactor\/hero\/boybiking.png";

	if (fps == null || fps >= 32)
		this.fps = 1;
	else
		this.fps = 32 / fps;
	this.fpsCounter = 0;
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
	this.ingrass = false;
	this.riding = false;

	this.perviousFace = "down";
	this.face = "down";
	this.perviousAction = "WalkDown";
	this.action = "";
	this.follower = null;
	this.tilePos = new Vector2(0);
	//--------------------------------其他属性
	this.traget = null;
	this.expression = "";


	//function start here----------------------------------------------------- 


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


	this.Update = function () {

		this.cropPosition.x = this.width * this.column;
		this.cropPosition.y = this.height * this.row;

		if (this.columns == null || this.columns == 0)
			this.columns = this.image.width / this.width;
		if (this.rows == null || this.rows == 0)
			this.rows = this.image.height / this.height;





	};





	this.Draw = function (ctxmain) {






		ctxmain.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x - 8, this.position.y - 31, this.width, this.height);

		//	ctxmain.rect(this.position.x-((this.width-16)/2), this.position.y-(this.height/2),this.width, this.height);
		//	ctxmain.rect(this.position.x,this.position.y,this.width,this.height);
		//ctxmain.stroke();

		if (this.jump) {

			this.jumpRender();

		}
		if (this.ingrass)
			this.ingrassRender();
		this.say(this.playerID, ctxmain);
		if (this.expression != "")
			this.expressionRender()

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


				//map.position.Move(this.speed);
				this.position.Move(this.speed);
				//ctxmain.translate(-this.speed.x,-this.speed.y);

			} else {
				//alert("step "+this.steps)



				this.speed.Set(0, 0);

			}

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
						this.limit = 0;



					}
				}

			} else {
				this.column = this.columnStart;
				this.row = this.rowStart;
				this.limitCount = 0;
				this.limit = 0;
				//this.steps=0;




			}




			this.steps++;


			if (this.steps == 4 && this.jump)
				this.jump = false;




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
			ctxmain.drawImage(this.shadow, 0, 85, 32, 11, this.position.x, this.position.y + 25, 32, 11)
			ctxmain.drawImage(this.shadow, 96, 53, 31, 9, this.position.x, this.position.y + 25, 32, 8); //鏁板瓧涓哄亸绉

			break;
		case 5:



		}


	}

	this.ingrassRender = function () {
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
			if (rate(5) && !BT.Inbattle) {
				battleWide();
			}
			break;

		default:
			ctxmain.drawImage(this.shadow, 0, 20, 29, 11, this.position.x, this.position.y + 25, 35, 12);
			break;
		}
	}
	this.expressionRender = function () {
		switch (this.steps) {
		case 0:
			ctxmain.drawImage(this.shadow, 0, 105, 30, 26, this.position.x, this.position.y - 25, 32, 5);
			break;
		case 1:
		case 2:
		case 3:
			ctxmain.drawImage(this.shadow, 0, 105, 30, 26, this.position.x, this.position.y - 25, 32, 32);
			break;
		case 4:
			ctxmain.drawImage(this.shadow, 0, 105, 30, 26, this.position.x, this.position.y - 25, 32, 27);
		case 5:
			this.expression = "";
			break;
		}

	}






	this.Turn = function (dir) {
		this.checkNpcfront();


		switch (dir) {

		case "up":
			this.SetRow(3);
			this.perviousFace = this.face;
			//this.SetLimit(2);	
			this.face = "up";

			sendMoveSingal("turnUp");
			break;

		case "down":
			this.SetRow(0);
			this.perviousFace = this.face;
			//	this.SetLimit(2);	
			this.face = "down";

			sendMoveSingal("turnDown");
			break;

		case "left":
			this.SetRow(1);
			this.perviousFace = this.face;
			//	this.SetLimit(2);	
			this.face = "left";

			sendMoveSingal("turnLeft");
			break;

		case "right":
			this.SetRow(2);
			this.perviousFace = this.face;
			//this.SetLimit(2);	
			this.face = "right";
			sendMoveSingal("turnRight");
			break;

		}
		this.perviousAction == "rest";
	};


	this.Move = function (dir) {
		if (this.checkNpcfront())
			return;
		map.chackMapChange();


		var front = this.getfrontTile();


		var terrain = map.geTerrain(front.x, front.y)
		console.log(front)
		if (terrain == "Collisions")
			return;

		if (terrain == "LedgesRight") {
			if (this.face == "right")
				this.jump = true;
			else
				return;
		} else if (terrain == "LedgesLeft") {
			if (this.face == "left")
				this.jump = true;
			else
				return;
		} else if (terrain == "LedgesDown") {
			if (this.face == "down")
				this.jump = true;
			else
				return;
		}

		try {
			if (map.CheckTerrain("Grass", front.x, front.y))
				this.ingrass = true;
			else
				this.ingrass = false;
		} catch (err) {
			console.log("outborder");
		}
		if (map.CheckTerrain("Water", front.x, front.y)) {
			if (s.scriptTextList.length == 0)
				s.scriptTextList.push("msg 河里有好多毒刺♂水母")
			return;

		}
		if (this.follower != null)
			this.follower.follow(this);

		switch (dir) {
		case "up":
			//
			if (this.jump) {
				this.speed.Set(0, -16);
				this.perviousAction = "JumpUp";
				//this.tilePos.y=parseInt(this.tilePos.y)+parseInt(this.tilePos.y)+ parseInt(2);
			} else {
				this.speed.Set(0, -8);
				this.perviousAction = "WalkUp";
				//this.tilePos.y=parseInt(this.tilePos.y)+parseInt(1);
				

			}

			this.SetLimit(4);
			this.steps = 0;

			if (!this.jump)
				sendMoveSingal("up");
			else
				sendMoveSingal("jumpUp")
			break;
		case "down":

			if (this.jump) {
				this.speed.Set(0, 16);
				this.perviousAction = "JumpDown";
				//this.tilePos.y=parseInt(this.tilePos.y)+parseInt(2);
				
			} else {
				this.speed.Set(0, 8);
				this.perviousAction = "WalkDown";
				//this.tilePos.y=parseInt(this.tilePos.y)+parseInt(1);
				//alert(this.tilePos.y)
				

			}
			this.SetLimit(4);
			this.steps = 0;

			if (!this.jump)
				sendMoveSingal("down");
			else
				sendMoveSingal("jumpDown")
			break;
		case "left":

			if (this.jump) {
				this.speed.Set(-16, 0);
				this.perviousAction = "JumpLeft";
				//this.tilePos.x=parseInt(this.tilePos.x)+parseInt(2);
			} else {
				this.speed.Set(-8, 0);
				this.perviousAction = "WalkLeft";
				//this.tilePos.x=parseInt(this.tilePos.x)+parseInt(1);

			}
			this.SetLimit(4);
			this.steps = 0;

			if (!this.jump)
				sendMoveSingal("left");
			else
				sendMoveSingal("jumpLeft")
			break;
		case "right":

			if (this.jump) {
				this.speed.Set(16, 0);
				this.perviousAction = "JumpRight";
				//this.tilePos.x=parseInt(this.tilePos.x)+parseInt(2);
			} else {
				this.speed.Set(8, 0);
				this.perviousAction = "WalkRight";
				//this.tilePos.x=parseInt(this.tilePos.x)+parseInt(1);

			}
			this.SetLimit(4);
			this.steps = 0;


			if (!this.jump)
				sendMoveSingal("right");
				
			else
				sendMoveSingal("jumpRight")
		}

		this.tilePos = front;
		
	};
	this.setPosition = function (x, y) {
		this.position.x = x * 32;
		this.position.y = y * 32;

		this.tilePos = new Vector2(x, y);



		if (x * 32 >= (map.MapWidth * 32 - 320)) {
			//	alert("width 越界补差（防止越界）")
			ctxmain.translate(-32 * (map.MapWidth - 20), 0);
			map.cameraPos.x = 32 * (map.MapWidth - 10);
		}
		if (y * 32 >= (map.MapHeight * 32 - 320)) {
			//	alert("width 越界补差（防止越界）")
			ctxmain.translate(0, -32 * (map.MapHeight - 20));
			map.cameraPos.y = 32 * (map.MapHeight - 10);
		}


	};


	this.up = function () {

		if (this.face != "up")
			this.Turn("up");

		else
			this.Move("up");
	}

	this.down = function () {

		if (this.face != "down")
			this.Turn("down");

		else
			this.Move("down");
	}

	this.left = function () {

		if (this.face != "left")
			this.Turn("left");

		else
			this.Move("left");
	}
	this.right = function () {

		if (this.face != "right")
			this.Turn("right");

		else
			this.Move("right");
	}



	this.getfrontTile = function () {
		var x = Math.floor((this.position.x + 8) / 32);
		var y = Math.floor((this.position.y + 31) / 32);

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
		var x = Math.floor((this.position.x + 8) / 32);
		var y = Math.floor((this.position.y + 31) / 32);

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

	this.getTile = function () {
		var x = Math.floor((this.position.x + 8) / 32);
		var y = Math.floor((this.position.y + 31) / 32);
		return new Vector2(x, y);
	}



	this.say = function (ctx, canvas) {
		var p = this.getTile();
		canvas.font = "50px";
		canvas.rect(this.position.x - 30, this.position.y - 40, 100, 30);
		canvas.fillText(ctx, this.position.x, this.position.y - 20);
		//ctxmain.stroke();

	}


	this.Setfollower = function (pokemon) {

		this.follower = pokemon;
		this.perviousAction = "";
		pokemon.owner = this;
		pokemon.display(this);
	};


	this.orderDraw = function (ctxmain) {

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
	};

	this.checkNpcfront = function () {

		for (var i in Game.npcList) {
			var td = Game.npcList[i];
			if (this.getfrontTile().equals(td.tilePos)) {
				this.traget = td;
				//console.log(td.tilePos);
				//console.log("checkNPcfront=yes")
				return true;
			}
		}

		for (var j in Game.pokemonfollowList) {
			var td = Game.pokemonfollowList[j];

			if (this.getfrontTile().equals(td.tilePos)) {

				this.traget = td;
				//console.log(td.tilePos);
				//console.log("checkNPcfront=yes")
				return true;
			}
		}
		this.traget = null;
		return false;


	}

	this.showNewFollower = function (pokedex, shiny) {

		var src = stringInt(pokedex);
		if (shiny === true)
			src += "s";

		/*
		if (pokedex <= 386) {
			src = src + "_0";
		}
		*/

		this.follower = null;
		this.follower = new pokemonFollower(0, 0, 0, 0, 4, "sprites/pokemons/" + src + ".png", 15, 4, 4);
		this.steps = 0;
		this.fpsCounter = 0;
		this.follower.display(this);

	}



}