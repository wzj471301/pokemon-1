Array.prototype.indexOf = function (Object) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == Object) {
			return i;
		}
	}
	return -1;
};

function delet(Array, value) {

	for (var i in Array) {
		if (Array[i] === value) {
			console.log("find the obj")
			//  console.log(Array[i]);
			Array.splice(i, 1);
			console.log("delete success");
			return;
		}
	}



	return a;
}








TiledMap = function () {

	//height;
	//width;
	//titleHeight;
	//titleWidth;
	//version =1;
	//titleSets =[];
	//Object=[];
	//firstgid;
	//image
	//imageheight;
	//imagewidth;
	//tilewidth;
	//tileheight;

	//layers= [];
	//object=[];
	//name;
	//height;
	//width;
	//data=[];

	//properties=[];
	var that = this;
	this.id = "";
	this.tileSetsRequire = []; // 所有出现的tile
	this.tileSets = []; //存tilesets对象
	this.layersBuffer = []; //存layer对象
	this.MapDataArray = [];
	this.tileSetsImgBuffer = [];
	this.spliteIndex = [];
	this.json = null; // = eval(a5);	
	//console.log(this.json);
	this.MapWidth; //=this.json.width;
	this.MapHeight; // =this.json.height;
	//alert(this.json.height);
	this.mapPicture = new Image();
	this.mapPicture.src; //= this.json.src;
	this.backgroundMapBuffer = null;
	//this.realWholeSize={width:0,height:0}





	//----------------------地图层class 用来读取 json里的layer -> obj
	this.layers = function (obj) {
		this.name = obj.name;
		this.data = obj.data;
		this.width = that.MapWidth;
		this.height = that.MapHeight;

		this.dataArray = new Array(this.height);



		this.getDataArray = function () { //可用来判断这块地图是否是跳层？碰撞层？水层？
			var indexOfData = 0;

			for (var i = 0; i < this.height; i++) //循环data横排
			{
				this.dataArray[i] = new Array(this.width); //定义每行的数组
				{
					for (var j = 0; j < this.width; j++) {
						this.dataArray[i][j] = this.data[indexOfData];
						if (that.tileSetsRequire.indexOf(this.data[indexOfData]) == -1) {
							that.tileSetsRequire.push(this.data[indexOfData]);
						}
						indexOfData++;
						//console.log(this.dataArray[i][j] +","+(indexOfData))
					}
				}
			}
			that.MapDataArray[this.name] = this.dataArray;

		};

		this.getDataArray(); //-------------注意删除这个

	};
	//---------------------------地图层class

	//--计算地图数字所对应图像区域
	//参数需要： 所有tileSets的firstgid



	//--计算地图数字所对应图像区域


	//---------------------------TileSets class
	this.tileSet = function (obj, index) {

		var image = new Image();
		image.src = obj.image;

		this.index = index; //用来通道获取图片缓存的引索， 在tileData中画图需要得到一个原来就有的对象速度会快；
		that.tileSetsImgBuffer.push(image);



		this.firstgid = obj.firstgid;
		that.spliteIndex.push(this.firstgid);
		this.image = image;
		this.imageHeight = obj.imageheight;
		this.imageWidth = obj.imagewidth;
		this.tileHeight = obj.tileheight;
		this.tileWidth = obj.tilewidth;


		this.width = Math.floor(this.imageWidth / this.tileWidth); //tileset地图块数
		this.height = Math.floor(this.imageHeight / this.tileHeight);
		this.lastgid = obj.firstgid + this.height * this.width;

		this.getSingleTile = function (number) {
			//得到当前数字相对应的区块xywh

			var row = Math.floor((number - this.firstgid) / this.width);
			var col = Math.floor((number - this.firstgid) % this.height);


			//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
			//ctxmain.drawImage(this.image,0,0);
			var xLeft = col * this.tileWidth;
			var yLeft = row * this.tileHeight;
			var w = this.tileWidth;
			var h = this.tileHeight;

			var tmp = new Array(number, xLeft, yLeft, w, h);

			return tmp;

		};


	};
	//---------------------------TileSets class

	this.drawSingleTile = function (ctx, number, x, y) {

		var index = this.spliteIndex.length - 1;
		for (var i = 0; i < this.spliteIndex.length; i++) {
			if (i < this.spliteIndex.length - 1) {
				if (number >= this.spliteIndex[i] && number < this.spliteIndex[i + 1]) {
					index = i;

					break;
				}
			}
		}


		var row = Math.floor((number - this.spliteIndex[index]) / this.tileSets[index].width);
		var col = Math.floor((number - this.spliteIndex[index]) % this.tileSets[index].width);
		//alert("number= "+number+","+"thissplite= "+this.spliteIndex[i]+" row&col= " +row+","+col);



		var xLeft = col * this.tileSets[index].tileWidth;
		var yLeft = row * this.tileSets[index].tileWidth;
		var w = this.tileSets[index].tileWidth;
		var h = this.tileSets[index].tileWidth;
		var pw = 32;
		var ph = 32;


		ctx.drawImage(this.tileSetsImgBuffer[index], xLeft, yLeft, w, h, x, y, pw, ph);



	};

	this.drawSingleLayer = function (ctx, index) {
		//canvas.width= this.layersBuffer[0].dataArray.length*16;
		//canvas.height =this.layersBuffer[0].dataArray[0].length*16;
		var tileSize = this.json.tilewidth * 2;
		var x = 0;
		var y = 0;

		for (var a in this.layersBuffer[index].dataArray) {
			for (var b in this.layersBuffer[index].dataArray[a]) {
				if (this.layersBuffer[index].dataArray[a][b] != 0) {
					this.drawSingleTile(ctx, this.layersBuffer[index].dataArray[a][b], x, y);
				}
				x += tileSize;
			}
			y += tileSize;
			x = 0;
		}


	};

	this.drawWalkBhind = function (ctx) {
		for (var i in this.layersBuffer) {
			if (this.layersBuffer[i].name == "WalkBehind")
				this.drawSingleLayer(ctx, i);
		}
	}


	this.drawAll = function (ctx) {

		ctx.drawImage(this.mapPicture, 0, 0, 16 * this.MapWidth, 16 * this.MapHeight, 0, 0, 32 * this.MapWidth, 32 * this.MapHeight);
		/*	
		if (this.backgroundMapBuffer == null) {
			for (i in this.layersBuffer) {
				this.drawSingleLayer(ctx, i)
			}
			this.backgroundMapBuffer = ctx.getImageData(0, 0, 640, 640);
			console.log("newmap")

		} else {
			ctx.putImageData(this.backgroundMapBuffer, -this.cameraPos.x,-this.cameraPos.y);
			console.log("buffer")
		}
	*/
	}

	this.insitall = function (mapCode) {

		try {
			this.id = mapCode.id;
			this.tileSetsRequire = []; // 所有出现的tile
			this.tileSets = []; //存tilesets对象
			this.layersBuffer = []; //存layer对象
			this.MapDataArray = [];
			this.tileSetsImgBuffer = [];
			this.spliteIndex = [];
			this.json = eval(mapCode);
			//console.log(this.json);
			this.MapWidth = this.json.width;
			this.MapHeight = this.json.height;

			this.mapPicture = new Image();
			this.mapPicture.src = this.json.src;
			//console.log(this.id);


		} catch (err) {
			alert(err.message);
			console.log(this.json.src);
		}

		//正常函数开始处
		//
		for (var i in this.json.layers) //循环层，读出所需要的tile字符
		{
			this.layersBuffer[i] = new this.layers(this.json.layers[i]);


		}

		this.tileSetsRequire.sort(); //排序这些字符
		console.log("已经取出所需要的地图字符");
		//console.log(this.tileSetsRequire);
		console.log("读取layersBuffer");
		console.log(this.layersBuffer);


		for (var i = 0; i < this.json.tilesets.length; i++) //读出所有tileste层， 
		{
			this.tileSets[i] = new this.tileSet(this.json.tilesets[i], i);

		}

		;

	}
	this.geTerrain = function (x, y) {

		//Walkable
		//Grass
		//Water
		//Collisions
		//WalkBehind
		//LedgesDown
		//LedgesRight
		//LedgesLeft

		if (x < 0 || y < 0 || x >= this.MapWidth || y >= this.MapHeight) {
			//console.log("Out border");

			return false;

		}
		var tmp = "";

		for (var i in this.layersBuffer) {
			if (this.layersBuffer[i].dataArray[y][x] != 0) {
				tmp = this.layersBuffer[i].name;
				if (tmp == "Collisions" && this.layersBuffer[i].dataArray[y][x] != 0) {
					return "Collisions";
				}

				if (tmp == "Water" && this.layersBuffer[i].dataArray[y][x] != 0) {
					for (var j = i; j < this.layersBuffer.length; j++) {
						if (this.layersBuffer[j].name == "Collisions" && this.layersBuffer[j].dataArray[y][x] != 0)
							return "Collisions";
					}
					return "Water";

				}
				if (tmp == "LedgesDown" && this.layersBuffer[i].dataArray[y][x] != 0)
					return "LedgesDown";
			}
			//tmp+= this.layersBuffer[i].name +"=" +this.layersBuffer[i].dataArray[y][x] + "\n";	
		}


		return tmp;
	};

	this.CheckTerrain = function (layername, x, y) {
		try {
			if (x < 0 || y < 0 || x >= this.layersBuffer[0].dataArray[0].length || y >= this.layersBuffer[0].dataArray.length) {
				//console.log("Out border");
				return;
			}
		} catch (err) {
			console.log("erroe occurs in border check" + layername + "x= " + x + " y= " + y)
		}
		try {
			for (var i in this.layersBuffer) {
				if (i != null) {
					if (this.layersBuffer[i].name == layername) {
						if (this.layersBuffer[i].dataArray[y][x] != 0)
							return true;
					}
				}
			}
		} catch (err) {
			console.log(this.layersBuffer[i]) //////// water layer has no dataArray
			console.log("erroe occurs in maparray check " + "i= " + i + this.layersBuffer[i].name + this.layersBuffer[i].dataArray[y][x])
		}

		return false;

	}

	this.drawSquare = function (x, y, squareRange, index) { //

		var tileSize = this.json.tilewidth;
		var xStart = (x - squareRange);
		var yStart = (y - squareRange);
		var xStop = (x + squareRange);
		var yStop = (y + squareRange);
		var x = xStart * tileSize;
		var y = yStart * tileSize;
		for (var i = yStart; i < yStop; i++) {
			for (var j = xStart; j < xStop; j++) {
				if ((i >= 0 && j >= 0) && (i < this.layersBuffer[0].dataArray.length && j < this.layersBuffer[0].dataArray[0].length)) {
					if (this.layersBuffer[index].dataArray[i][j] != 0) {
						this.drawSingleTile(this.layersBuffer[index].dataArray[i][j], x, y);
					}
				}
				x += tileSize;
			}
			y += tileSize;
			x = xStart * tileSize;
		}
	};

	this.drawAllSquare = function (x, y, squareRange) {
		for (var i in this.layersBuffer)
			this.drawSquare(x, y, squareRange, i)
	};
	/*
	this.drawgid = function () { //画网格
		var x = this.json.tilewidth;
		var y = this.json.tileheight;
		this.width = map.mapPicture.width;
		this.height = map.mapPicture.height;

		for (var i = 0; i < this.width; i += x) {

			ctxmain.lineWidth = 0.5;
			ctxmain.beginPath();
			ctxmain.moveTo(i, 0);
			ctxmain.lineTo(i, map.mapPicture.height);
			ctxmain.stroke();
			var txt = i;
			ctxmain.font = "10px";
			ctxmain.fillText(i / x, i, map.mapPicture.height);
		}
		for (var j = 0; j < this.height; j += x) {
			ctxmain.lineWidth = 0.5;
			ctxmain.beginPath();
			ctxmain.moveTo(0, j);
			ctxmain.lineTo(map.mapPicture.width, j);
			ctxmain.stroke();
			ctxmain.font = "10px";
			ctxmain.fillText(j / x, 0, j);
		};
	};

*/



	this.cameraPos = {
		x: 320,
		y: 320
	}
	//this.cameraY=0;

	this.SetcameraCenter = function (ctx, x, y) {
		if (x - 320 >= 0 && x + 320 <= this.MapWidth * 32) {
			var tsX = this.cameraPos.x - x;
			this.cameraPos.x = x;
			ctx.translate(tsX, 0);
			//console.log("x translating");
		}
		if (y - 320 >= 0 && y + 320 <= this.MapHeight * 32) {
			var tsY = this.cameraPos.y - y;
			this.cameraPos.y = y;
			ctx.translate(0, tsY);
			//console.log("y translating");
		}
	}

	this.chackMapChange = function () {


		var playerPos = play.getfrontTile();
		
		 //alert("test map change")
		if (this.json.teleport) {
			for (var i in this.json.teleport) {
				var a = this.json.teleport[i].start;
				var splitA = a.split(",");
				var pos = new Vector2(splitA[0], splitA[1]);
					//	alert("playerPos= "+playerPos+" telePoint: "+pos+"  "+playerPos.equals(pos))
				//alert("mapcode:" +mapcode);
				if (playerPos.equals(pos)) {
				//	alert("地图切换认证，载入中===>"+mapcode);
					var mapcode = this.json.teleport[i].mapCode;
					var Pos2 = this.json.teleport[i].end;
					var endPos = Pos2.split(",")
					


					$.ajax({
						cache: false,
						url: "maps/" + mapcode + ".json",
						async: false,
						dataType: "json",
						success: function (data) {
							//	alert("json成功，进行载入地图")
							//	console.log(data);
							
							mapinfor = data;
							map.insitall(mapinfor);
							ctxmain.translate(map.cameraPos.x - 320, map.cameraPos.y - 320)
							map.cameraPos.x = 320;
							map.cameraPos.y = 320;

							play.setPosition(endPos[0], endPos[1]);

							var folPos = play.getbackTile();
							play.follower.setPosition(folPos.x, folPos.y);

							Game.setUpAllelement();

							sendCharInfor();
							return;
						}


					});

					return;
				}


			}



		}

	};

	this.getBugRestPosition = function () {
		$.ajax({
			url: "maps/zxz.json",
			async: false,
			dataType: "json",
			success: function (data) {
				//	alert("json成功，进行载入地图")
				//	console.log(data);
				mapinfor = data;
				map.insitall(mapinfor);
				ctxmain.translate(map.cameraPos.x - 320, map.cameraPos.y - 320)
				map.cameraPos.x = 320;
				map.cameraPos.y = 320;

				play.setPosition(13, 6);

				var folPos = play.getbackTile();
				play.follower.setPosition(folPos.x, folPos.y);

				Game.setUpAllelement();

				sendCharInfor();
				return;
			}
		})
	};



};


map = new TiledMap();


function tilePos(x, y) {
	var ex = Math.floor((x + map.cameraPos.x - 320) / 32);
	var ey = Math.floor((y + map.cameraPos.y - 320) / 32);
	return " (" + ex + "," + ey + ") ";
}

function Terrain(x, y) {
	var ex = Math.floor((x + map.cameraPos.x - 320) / 32);
	var ey = Math.floor((y + map.cameraPos.y - 320) / 32);
	return map.geTerrain(ex, ey);
}