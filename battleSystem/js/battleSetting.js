//-----------------------------------设置所有精灵显示








function startNewBattle(my, foe) {    //需要两个数据 allyTeam 和enemyTeam
	allyTeam.team =my;
	allyTeam.onbattle = allyTeam.team[0];
	showIcons();
	//console.log("ally");
	//console.log(allyTeam);
	enemyTeam.team =foe;
	enemyTeam.onbattle = enemyTeam.team[0];
	//console.log("enemy");
	//console.log(enemyTeam);


	allyTeam.onbattle.toField();
	enemyTeam.onbattle.toField();

}


function battleControl() {
	this.allyUseMove = -1;
	this.enemyUseMove = -1;
	this.battlePause = false;
	this.battleEnd = false;
	this.Inbattle=false;
	this.callback=null;

}
battleControl.prototype = {
	start: function(my, foe,callback){
		
		$("#battleSystemDiv").append(
			'<div id="battle-wrapper">'+

			'<div id="battle-scene">'+
			'		<div id="battleReport">'+
		'		</div>'+
			'<canvas id="canvasB" width="500" height="400">your browers doe not?</canvas><div class="timebar-border">'+
					'<div id="timebar-main"></div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div id="control-wapper">'+
		'	<div id="control-main">'+

		'		<div id="MovesBlock" class="col-sm-12 thumbnail ">'+
		'		</div>'+
		'<div id="control_left" class=" col-xs-12 thumbnail ">'+
		'			<div id=“pokemonsBlock” class="pokemonsBlock col-xs-8 thumbnail"></div>'+
		'			<div id="control_right" class="col-xs-4 thumbnail">'+
		'				<div id="throwball" class="btn btn-default btn-sm col-xs-6 ">'+
		'					<img src="battleSystem/pokeball/pokeball.png">'+
		'					<span>10</span>'+
		'				</div>'+
		'				<div id="run" class="col-xs-6 btn btn-default">Run</div>'+
		'			</div>'+
		'		</div>'+
		'	</div>'+
		'</div>'+
		'<div id="musicControl" class="btn-group-sm">'+
		'	<button id="musicoff" class="btn btn-warning">Music Off</button>'+
		'	<button id="musicon" class="btn btn-success">Music On</button>'+
		'	<button id="gameoff" class="btn btn-danger">game pause</button>'+
		'	<button id="gameon" class="btn btn-info">game cont</button>'+
		'</div>');
		bindAllEvents();
		var canvas = document.getElementById("canvasB");
		ctxB = canvas.getContext("2d");
		this.Inbattle=true;
		if (callback!=null)
			this.callback=callback;
			
		startNewBattle(my,foe);
		
	},
	end: function(result){
		this.Inbattle=false;
		allyTeam.onbattle=null;
		allyTeam.team =null;
		enemyTeam.onbattle=null;
		allyTeam.team=null;
		$("#battleSystemDiv").html("");
		jinglingbuzhuohouhuixue();
		if (this.callback)
			this.callback(result);
		this.callback=null;
	}

};


function jinglingbuzhuohouhuixue(){
	for (var i in myInfor.pokemons.detail)
	{
		if (myInfor.pokemons.detail[i].ally=="enemy")
			myInfor.pokemons.detail[i].ally="ally";
		
		if (myInfor.pokemons.detail[i].tmpState['hp']<=0)
			myInfor.pokemons.detail[i].tmpState['hp']=myInfor.pokemons.detail[i].state['hp'];
	
	}

}


function drawBattleField() {
	ctxB.drawImage(battleFieldImg, 0, 0, 345, 264, 0, 0, 500, 400);
}






function log(ctx) {
	$("#battleReport").html('<div>' + ctx + '</div>' + $("#battleReport").html());


}

function msg(ctx,callback) {
	BT.battlePause = true;
	$("#battleReport").html('<div id="newMessage">' + ctx + '</div>' + $("#battleReport").html());
	$("#newMessage").hide();

	$("#newMessage").slideDown('normal', function () {
		$("#newMessage").removeAttr('id');
		BT.battlePause = false;
		
		if (callback!=null)
		callback();
	});
	
	
}

function makeRadomPokemon() {
	var dex = Math.ceil(Math.random() * 386);
	var pokem = new pokemon();
	pokem.makeNewByDex(dex);

	if (rate(50))
		pokem.setShiny();
	return pokem;
}

function makerandomTeam(allyOrenemy) {
	var team = [];
	for (var i = 0; i < 6; i++) {
		var pok = makeRadomPokemon();
		
		pok.setAlly(allyOrenemy);
		team.push(pok);
	}
	return team;
}

function makeFixTeam(array, allyOrenemy) {
	var team = [];

	for (var i in array) {
		var pokem = new pokemon();
		pokem.makeNewByDex(array[i]);

		pokem.setAlly(allyOrenemy);
		team.push(pokem);
	}
	return team;
}

//-----------------------------------设置所有精灵显示
function showIcons() {
	$(".pokemonsBlock").html("");
	for (var i = 0; i < allyTeam.team.length; i++) {
		var tmp = allyTeam.team[i];
		var hp = (tmp.tmpState['hp']/tmp.state['hp'])*100
		
		//msg(hp);
		$(".pokemonsBlock").append('<div class="col-xs-2"> <div class="debuff"> <img></div><img class="icons" src="' + tmp.pic_small + '"><div class=" iconshp progress "><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:'+hp+'%;"></div></div></div>');

	}
	iconsBind();
}

