    
	

   





function launchClick() { //显示技能后才能绑定click效果
	$("#MovesBlock button").click(function () {
		var name = $(this).find(".skillName").html();
		log(allyTeam.onbattle.name + " uses " + name);
		skillIndex = $(this).index();
		//alert(skillIndex);
		//$("#MovesBlock").html("");
		//allyTeam.onbattle.chargebar = 0;
		allyTeam.onbattle.chargebar -=allyTeam.onbattle.moves[skillIndex].chargeMax;
		allyTeam.onbattle.disabledAllSkill()
		videoSystem.loadAndplay(skillOne, skillIndex);
	});
}

function iconsBind() { //头像显示后绑定click效果
	$(".icons").click(function () {
		var i = $(".icons").index(this);
		var target = allyTeam.team[i];
		if (allyTeam.onbattle && target.tmpState["hp"] > 0) //如果场上精灵和交换精灵都能战斗
			allyTeam.onbattle.pokemonSwap(target);
		else {

			if (target.tmpState['hp'] <= 0) {
				//	log(target.name + " defeated, cant fight any more");
				return;
			} else {
				target.toField();
				$("#MovesBlock").html("");

				allyTeam.onbattle = target;
			}
		}
	});
}




function bindAllEvents(){
	$("#throwball").click(function () {
		if (enemyTeam.onbattle && videoSystem.finish)
		{
			
			videoSystem.loadAndplay(pokeballCatch);
		}
		else{
			msg("目标丢失");
		}
		})
	$("#run").click(function () {
			if (videoSystem.finish)
		BT.end("lose");
		})
	$("#musicoff").on('click',function(){
	myaudio.pause();
});
$("#musicon").on('click',function(){
	myaudio.play();
})

$("#gameoff").on('click',function(){
	BT.battlePause=true;
})
$("#gameon").on('click',function(){
	BT.battlePause=false;
})

/*
myaudio.addEventListener("ended",function(){
	 myaudio.play();
})
*/


}
