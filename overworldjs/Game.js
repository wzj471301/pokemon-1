stringInt = function (intg) {
	var X = "";
	if (Math.floor(intg / 100) <= 0)
		X += "0";
	if (Math.floor(intg / 10) <= 0)
		X += "0";
	return X += intg;

}


PositionSort = function (drawList) {
	console.log("sort start")
	for (var i = 0; i < drawList.length; i++) {
		for (var j = 0; j < drawList.length; j++) {
			alert(drawList[j].position.y)

			if (drawList[j].position.y > drawList[i].position.y) {
				alert("123");
				var tmp = clone(drawList[j]);
				drawList[j] = clone(drawList[i]);
				drawList[i] = clone(tmp);
				console.log("moving");


			}
		}

	}

	console.log("sort finish")

}



addDrawElement = function (Drawlist, element) {


}

function clone(myObj) {
	if (typeof (myObj) != 'object') return myObj;
	if (myObj == null) return myObj;
	var myNewObj = new Object();
	for (var i in myObj)
		myNewObj[i] = clone(myObj[i]);
	return myNewObj;
}




Game = function () {
	this.npcList = [];
	this.pokemonfollowList = [];
	this.drawList = [];

	this.XYrenderList = [];

	this.playersList = {
		id: [],
		info: [],
		obj: []

	};



	this.loadNpcJson = function (json) {
		this.npcList = [];
		this.pokemonfollowList = [];
		this.drawList = [];
		var npc = null;
		for (var i in json) {

			try {
				npc = json[i];
				npcSrc = "charactor/npc/" + npc.src;
				var newNpc = new Npc(0, 0, 0, 0, 4, npcSrc, 10, 3, 4);
				newNpc.name = npc.name;
				newNpc.id = npc.id;
				newNpc.source = npc;
				newNpc.script = npc.script;
				newNpc.setPosition(npc.posX, npc.posY);

				newNpc.autowalkingWay = npc.autowalking
				newNpc.Turn(npc.face);

				this.npcList.push(newNpc);
				//alert(this.npcList[this.npcList.length-1].tilePos);
				this.drawList.push(newNpc);

				var newpokemon = new pokemonFollower(0, 0, 0, 0, 4, "sprites/pokemons/" + stringInt(npc.pokemons.index[0]) + ".png", 15, 4, 4)
				newNpc.Setfollower(newpokemon);

				this.pokemonfollowList.push(newpokemon);
				this.drawList.push(newpokemon);
			} catch (err) {
				alert("npc 加载出错 i= " + i)
			}
		}

		//PositionSort(this.drawList);
		//console.log(this.npcList)
		//console.log(this.drawList)


	}
//alert("updt")
	this.drawAllInList = function () { //画所有list中的对象
//console.log(map.json.height);
		for (var i = -2; i <= map.json.height; i++) {
			
			for (var x in this.drawList) {
				var element = this.drawList[x]

				if (element.tilePos.y == i ) {
					if (element.autowalking) {
						element.autowalking(2, element.autowalkingWay)

						//alert(element.autowalkingWay);
						element.Draw(ctxmain);
					}
					else if (element.owner)
							element.Draw(ctxmain);
					else if (element.playerID != play.playerID)
						element.orderDraw(ctxmain);

				}


			}
			
			if (play.tilePos.y == i)
			play.orderDraw(ctxmain)
			
		}

	}
	/*	
		for (var i in this.drawList) {

			try {

				var element = this.drawList[i];
				if (element.follower) {

					if (element.autowalking) {
						element.autowalking(2, element.autowalkingWay)
						//alert(element.autowalkingWay);
						element.orderDraw(ctxmain);
					} else if (element.playerID != play.playerID)
						element.orderDraw(ctxmain);
				}

			} catch (err) {
					console.log("绘画时出错 index= "+i);
			}

		}
		*/

	//}

	this.setUpAllelement = function () {
		this.loadNpcJson(map.json.npcScript);
	}
}

Game = new Game();







//主角各种属性



//myInfor.pokemons.detail=makerandomTeam(myInfor.pokemons.index);


function makeRandomTeamPokedex(sum) {
	var arry = [];

	for (i = 0; i < sum; i++) {
		arry.push(Math.ceil(Math.random() * 386));
	}
	return arry;
}

function battleNpc(npcobj) {

	var dexs = npcobj.source.pokemons.index;

	var dex = myInfor.pokemons.index;
	var my = myInfor.pokemons.detail;
	var foe = makeFixTeam(dexs, "enemy");
	BT.start(my, foe, function (re) {
		//alert(re);
		switch (re) {
		case "win":
			s.jumpTolbl("win");
			break;
		case "lose":
			s.jumpTolbl("lose");
			break;
		}

	});
}

function battleWide() {
	var a = Math.floor(Math.random() * 386);
	var dex = [];
	dex.push(a);
	var my = myInfor.pokemons.detail;

	var wild = makeRadomPokemon();
	wild.setAlly("enemy");
	var foe = [];
	foe.push(wild);
	BT.start(my, foe);

}
//npc是否被打败
function beatNpc(npcObj) {
	for (var i in myInfor.beatNpc) {
		if (npcObj.id == myInfor.beatNpc[i])
			return true;
	}
	return false;
};

startNpcTalk = function () {

	if (play.traget) {
		var t = play.traget;
		//alert (t.steps);


		if (t.script != null) {

			if (!beatNpc(t)) {

				for (var a in t.script.beforebattle) {

					s.scriptTextList.push(t.script.beforebattle[a]);
				}
			} else {
				for (var a in t.script.afterbattle) {

					s.scriptTextList.push(t.script.afterbattle[a]);
				}
			}
		}
	}
}


$("#testMyInfor").on('click', function () {
	var x = JSON.stringify(myInfor);
	//console.log(x);
})