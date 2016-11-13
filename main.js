var scriptList = [
    
	"overworldjs/mainEditor.js",
    "overworldjs/CommonFunctions.js",
	"overworldjs/Vector2.js",
	"overworldjs/input.js",
	"overworldjs/TiledMap.js",
	"overworldjs/pokemonOverworld.js",
	"overworldjs/mainPlayer.js",
	"overworldjs/otherPlayers.js",
	"overworldjs/npc.js",
	"overworldjs/ScriptExampler.js",
	
	"battleSystem/js/battlePokemon.js",
	"battleSystem/data/moves.js",
	"overworldjs/pokemonDb.js",
	"battleSystem/js/prasePokemonDB.js",
	"battleSystem/js/battleSetting.js",
	"battleSystem/js/battleAnmation.js",
	"battleSystem/js/battleScript.js",
	"battleSystem/js/audioSystem.js",
	"overworldjs/Game.js",
	"overworldjs/mainVar.js",
	"overworldjs/IGUI.js",
	"UIs/PokeDetail/PokemonDetail.js",   //精灵详细信息js
	"UIs/Chat/chatSystem.js",
	"UIs/PokeDetail/Chart.min.js",   //chart
    "UIs/circularmenu/circularMenu.js",
    "UIs/Trade/TradeSys.js",
    "UIs/General/GeneralPop.js"
	

]

$("#gameStart").on('click', function (e) {

	e.preventDefault();
	$("#gameStart").hide();
	loadAllScript();
});

function loadAllScript() {
//	alert("载入脚本中")
	if (gameUser == "") {
		alert("未获取游戏名")
		return;
	} 
	
	Jyo.importScript(scriptList,function(){
   
	$("#loadProgress").remove();
	
	loadPlayerData();
	
	
},function(loadedNum,sumNum){
	$("#loadjs").width((loadedNum/sumNum *100)+"%");
   $("#loadjs").html(Math.floor(loadedNum/sumNum *100)+"%");
});

	
	


}



function GameStart(playinfo) {
//	alert("获取玩家myinfo")
	if (!playinfo) {
		console.log("没有玩家数据")
		return;
	}
	loadGUI();
	loadCanvas();
	loadBattleLayer();
	var canvasmain = document.getElementById("canvasmain");
	ctxmain = canvasmain.getContext("2d");
	var mapinfor;

	myInfor = playinfo;

	for (var i in myInfor.pokemons.index) {

		if (myInfor.pokeDex.indexOf(myInfor.pokemons.index[i]) < 0) {

			myInfor.pokeDex.push(myInfor.pokemons.index[i]);

		}
	}
	dispalyPokedex();



    



	$.ajax({
		url: "maps/" + myInfor.map + ".json",
		async: false,
		dataType:"json",
		success: function (data) {
			//console.log(data);
			mapinfor = data;

		}
	});


   


	map.insitall(mapinfor);

	Game.setUpAllelement();

	
	console.log(myInfor)

	var pokemons = []
	for (var i in myInfor.pokemons.detail) {
		var pokemo = new pokemon();

		for (var j in pokemo) {
			if (myInfor.pokemons.detail[i][j])
				pokemo[j] = myInfor.pokemons.detail[i][j];
		}
		pokemons.push(pokemo);
	}
	myInfor.pokemons.detail = pokemons;

	play = new mainPlayer(192 / 4, 256 / 4, 0, 0, 4, "charactor/hero/boywalking.png", 15, 4, 4)
	play.setPosition(myInfor.Pos.x, myInfor.Pos.y);
	play.showNewFollower(myInfor.pokemons.index[0]);
	//console.log(myInfor);
	ShowPokemonsToolbar();
   


	playerControl = function () {
		if (!BT.Inbattle) {
			if (input.left) {
				if (play.steps >= 4 && play.follower.steps >= 4)
					play.left();
				input.resetKeys()
			}
			if (input.up) {
				if (play.steps >= 4 && play.follower.steps >= 4)
					play.up();
				input.resetKeys()
			}
			if (input.down) {
				if (play.steps >= 4 && play.follower.steps >= 4)
					play.down();
				input.resetKeys()
			}
			if (input.right) {
				if (play.steps >= 4 && play.follower.steps >= 4)
					play.right();
				input.resetKeys()
			}
			if (input.q) {

				if (play.steps >= 6 && play.follower.steps >= 6) {
					play.jump = true;
					play.steps = 0;
					play.SetLimit(4);

					sendAction("jump");
				}
			}
			if (input.e) {
				if (play.steps >= 5 && play.follower.steps >= 4) {
					play.expression = "1";
					play.steps = 0;
					play.SetLimit(4);
					sendAction("emote");

				}
			}
			
			if (input.z) {
				play.checkNpcfront(); //检查前方是否有npc
				if (play.traget && !s.process) //当有npc时开始读取script；
				{
					play.traget.turnTotraget(play)
					//normalNpcTalk();

					startNpcTalk();
					s.maintraget = play.traget;
				}
			}
		}
	}
	
	console.log(Game.playersList)

	overworldAndScriptLoop = function () {

		//console.log(map.cameraPos.x,map.cameraPos.y)
		scriptKeyEvent();
		scriptFramesLoop();
		playerControl();
		ctxmain.clearRect(0, 0, 640, 640);
		ctxmain.fillRect(map.cameraPos.x - 320, map.cameraPos.y - 320, 640, 640);
		map.drawAll(ctxmain);
		//drawgid();
		Game.drawAllInList();
		
		map.drawWalkBhind(ctxmain);
		map.SetcameraCenter(ctxmain, play.position.x, play.position.y);
		c.showBubles()
		consolePlayerList();
		//consoleAll();

	}




	window.setInterval(function () {
		overworldAndScriptLoop();
	}, 30);

	window.setInterval(function () {
		getPlayerNumber();
		saveGameData();
	}, 5000)
	connectToserver();
	


	
}