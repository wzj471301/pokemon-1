otherPlayer = function (width, height, row, column, limit, imageSrc, fps, columns, rows) {
	this.type="player";
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
	
	this.riding = false;

	this.perviousFace = "down";
	this.face = "down";
	this.perviousAction = "";
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
		
		this.say(this.playerID);
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



				this.position.Move(this.speed);
				//ctxmain.translate(-this.speed.x,-this.speed.y);

			} else {



				this.speed.Set(0, 0);

			}
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


		switch (dir) {

		case "up":
			this.SetRow(3);
			this.perviousFace = this.face;
			//this.SetLimit(2);	
			this.face = "up";
			break;

		case "down":
			this.SetRow(0);
			this.perviousFace = this.face;
			//	this.SetLimit(2);	
			this.face = "down";
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
		
		if(this.steps<=4)
		{
			this.setPosition(this.tilePos.x,this.tilePos.y);
			if (this.follower)
			{
				var x =this.getbackTile();
				while(this.follower.steps<=4)
				{
					this.follower.Draw(ctxmain)
					map.drawWalkBhind(ctxmain);
				}
				//this.follower.setPosition(x.x,this.follower.tilePos.y);
				
			}
			}
			var front = this.getfrontTile();


		var terrain = map.geTerrain(front.x, front.y)



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

	};
	this.setPosition = function (x, y) {
		this.position.x = x * 32;
		this.position.y = y * 32;

		this.tilePos = new Vector2(x, y);






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



	this.say = function (ctx) {
		var p = this.getTile();
		ctxmain.font = "50px";
		ctxmain.rect(this.position.x - 30, this.position.y - 40, 100, 30);
		ctxmain.fillText(ctx, this.position.x, this.position.y - 20);
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
		this.traget = null;
		return false;


	}

	this.showNewFollower = function (pokedex) {
		pokedex = stringInt(pokedex);
		/*
		if (pokedex <= 386) {
			pokedex = pokedex + "_0";
		}
*/
		this.follower = null;
		this.follower = new pokemonFollower(0, 0, 0, 0, 4, "sprites/pokemons/" + pokedex + ".png", 15, 4, 4);
		this.steps = 0;
		this.fpsCounter = 0;
		this.follower.display(this);

	}



}