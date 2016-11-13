function loadGUI() {

	$('body').append('<div id="IGUI"><div id="allPlayer">Players</div><div id="pokedexToolbar"><div class="btn btn-primary center-block" id="pokedexToggle">打开Pokedex</div><div class="thumbnail " id="pokeDexContainer"></div></div><div id="control-button" class="col-xs-6"><a id="controlUp" class="btn btn-success">↑</a><a id="controlDown" class="btn btn-success">↓</a><a id="controlLeft" class="btn btn-success">←</a><a id="controlRight" class="btn btn-success">→</a></div><div id="pokemonToolBar"></div><div id="gameChatBar" class="thumbnail"><ul id="myTab" class="nav nav-tabs"><li class="active"><a href="#chatConsole" data-toggle="tab">chat</a></li><li><a href="#playerList" data-toggle="tab">players</a></li><li><a href="#debugConsole" data-toggle="tab">debug</a></li></ul><div class="tab-content"><div class="tab-pane active" id="chatConsole"></div><div class="tab-pane" id="playerList"></div><div class="tab-pane" id="debugConsole"></div></div><div class="table-bordered " style="position:absolute; bottom:0px;"><div class="well-sm bg-info "><form><input type="text" id="messageBox" /><button class="btn btn-danger" id="sendMessage" onsubmit="return false">发送</button></form></div></div></div></div>');

}

function loadCanvas() {
	$("body").append('<div id="posCurrent" style="top:630px;z-index:9999">x</div><canvas id="canvasmain" width=640px; height=640px;></canvas><div id="debug"></div>');
}

function loadBattleLayer() {
	$("body").append('<div id="battleSystemDiv"></div><audio id="BGM" hidden="true"><source src="battleSystem/audio/battleMusic/12%20PM-VS%20Champion-Red(EX).mp3"><source src="battleSystem/audio/battleMusic/12%20PM-VS%20Champion-Red(EX).ogg"></audio><audio id="BGMusic" hidden="true" loop="true"><source src="battleSystem/audio/bgm/bgm.mp3"><source src="battleSystem/audio/bgm/bgm.mp3"></audio>');
}







$("body").on('click','#pokedexToggle',function(){


	$("#pokeDexContainer").toggle();
})

function addPokedex(index) {

	if (myInfor.pokeDex.indexOf(index) < 0) {
		myInfor.pokeDex.push(index);
		dispalyPokedex();

	}

}

function dispalyPokedex() {
	$("#pokeDexContainer").html("");
	$("#pokedexToggle").html("PokeDex " + myInfor.pokeDex.length + "/386")

	myInfor.pokeDex.sort(function (a, b) {
		return a < b ? 1 : -1
	});

	for (var i in myInfor.pokeDex) {
		var a = stringInt(myInfor.pokeDex[i]);
		//$("#pokeDexContainer").append('<img class="col-xs-3 thumbnail" src="battleSystem/small/' + a + '.gif"/>');


	}
}



$('body').on('click',"#controlUp",function(){
	if (play.steps >= 4 && play.follower.steps >= 4)
		play.up();

})



$('body').on('click',"#controlDown",function(){
	if (play.steps >= 4 && play.follower.steps >= 4)
		play.down();


})

$('body').on('click',"#controlLeft",function(){

	if (play.steps >= 4 && play.follower.steps >= 4)
		play.left();

})

$('body').on('click',"#controlRight",function(){

	if (play.steps >= 4 && play.follower.steps >= 4)
		play.right();


})



$("body").on("mousemove", '.pokeIcon', function () {
    var index = $(this).index();
    nm =myInfor.pokemons.detail[index].name;
	if ($("#PokePopover").length === 0) {
		$("#IGUI").append('<div id="PokePopover" class="panel panel-warning"><div class="panel-heading">'+nm+'</div><div class="panel-body" >秘传机(无)</div><div class=" setFollower btn btn-info center-block" >follower</div><div class=" showPokeDetailWindow btn btn-danger center-block">Information</div><div class=" releasePokemon btn btn-default center-block" >release</div></div>');
	}

	
	var top = $(this).offset().top;
	var left = $(this).offset().left;
    
	$("#PokePopover").css("top", top - 30);
	$("#PokePopover").attr("Pokeindex", index);


});

$("body").on("click", '.setFollower', function () {

	if (play.steps > 4) {
		var index = $("#PokePopover").attr("Pokeindex");

		var pokedex = myInfor.pokemons.detail[index].index;
		play.showNewFollower(pokedex, myInfor.pokemons.detail[index].shiny);

		sendChangeFollowerSignal();
	}
});



$("body").on("click", '.releasePokemon', function () {
	var index = $("#PokePopover").attr("Pokeindex");
	releasPokemon(index);

});



$("body").on("mouseenter","#gameChatBar" ,function () {
	$("#gameChatBar").animate({
		opacity: 0.9
	});

})

$("body").on("mouseleave","#gameChatBar" ,function () {

	$("#gameChatBar").animate({
		opacity: 0.5
	});

})




//聊天窗tab切换

$("body").on("click","#myTab a" ,function (e) {

	e.preventDefault(); //阻止a链接的跳转行为 
	$(this).tab('show'); //显示当前选中的链接及关联的content 
})


function debugMsg(ct) {
	var div = '<div style="display:block">' + ct + '</div>'
	$("#debugConsole").html($("#debugConsole").html() + ct);
}


function updatePlayList() {
	var l = "";
	for (var i in Game.playersList) {
		l += Game.playersList.id[i];
	}
	$("#playerList").html("");
	$("#playerList").html(l);
}

function chatMsg(ct) {

	ct = '<div>' + ct + '</div>'
	$("#chatConsole").html(ct + $("#chatConsole").html());
	
}

$("body").on("click","#sendMessage" ,function (e) {

	e.preventDefault();

	var txt = $("#messageBox").val();
	var w = txt.split(" ");

	if (w[0] === "sprite") {

		play.Setfollower(new pokemonFollower(0, 0, 0, 0, 4, "sprites/pokemons/" + w[1], 15, 4, 4));
		play.steps = 0;
		play.fpsCounter = 0;
		sendChangeFollowerSignal();

	} else
		chatMessage();

})
//聊天窗口tab输入
$("body").on("mouseenter","#messageBox" ,function () {
	input.typing = true;

});
$("body").on("mouseleave","#messageBox" ,function () {
	input.typing = false;
});










ShowPokemonsToolbar = function () {
	$("#pokemonToolBar").html("");
	var t = "";
	for (var i in myInfor.pokemons.detail) {
      
        if (myInfor.pokemons.detail[i].index)
		t += '<div class="pokeIcon"><img src="' + myInfor.pokemons.detail[i].pic_small + '"></div>';
	}

	$("#pokemonToolBar").append(t);
};


function releasPokemon(index) {
	if (myInfor.pokemons.detail.length > 1) {
		myInfor.pokemons.detail.splice(index, 1);
		myInfor.pokemons.index.splice(index, 1);

		ShowPokemonsToolbar();
	}
}

function catchPokemon(pokemonObj) {

	if (myInfor.pokemons.detail.length == 6) {
		console.log("bag full, pokemon escape");

	} else {
		myInfor.pokemons.detail.push(pokemonObj);
		myInfor.pokemons.index.push(pokemonObj.index);
	}
	ShowPokemonsToolbar();
}

/*   
	先初始化MyInfor中的精灵
*/





/////////////DEBUG POSITION BUG
$("body").on('click','#debugConsole',function(){
	alert("123")
	map.getBugRestPosition();
})

////////////


