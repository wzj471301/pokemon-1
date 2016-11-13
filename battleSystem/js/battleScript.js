





function battleScript() { // loop
	if (BT.battlePause === true)
		return;
	
		
	if (!allyTeam.onbattle) { //我方没在战场上，检查是否全倒下
		msg("change new pokemon");
		for (var i in allyTeam.team) {
			if (allyTeam.team[i].tmpState['hp'] > 0)
			return;
			
			}
		msg("你失败了，返回精灵中心",function(){BT.end("lose")});
		return;
	}
	
	if (allyTeam.onbattle.tmpState['hp'] <= 0) {
		allyTeam.onbattle.fall();
		return;
	}


	if (!enemyTeam.onbattle) { //敌人中没有一个在战场上
		var avbPoke = [];
		for (var i in enemyTeam.team) {
			if (enemyTeam.team[i].tmpState['hp'] > 0)
				avbPoke.push(i);
		}
		//alert(avbPoke);
		//console.log(avbPoke);
		if (avbPoke.length == 0) //如果所有精灵都为0时
		{
			//alert("You win");
			msg("你战胜了训练师",function(){BT.end("win")});
			return;
		}

		var x = avbPoke[getRadom(avbPoke)];

		enemyTeam.team[x].toField();
		enemyTeam.onbattle = enemyTeam.team[x];


	}


	if (enemyTeam.onbattle.tmpState['hp'] <= 0) {
		enemyTeam.onbattle.fall();
		return;
	}

	if (allyTeam.onbattle.firstTurn === true) // 刚上场第一回合阶段 //不停地找可用skill
	{
		allyTeam.onbattle.checkAvilableSkill();
		
	}


	if (enemyTeam.onbattle.chargebar > 100) { //如果敌方精灵能量值充满  则使用技能
		var a = getRadom(enemyTeam.onbattle.moves);
		log(enemyTeam.onbattle.name + "uses " + enemyTeam.onbattle.moves[a].name);
		//enemyTeam.onbattle.useSkill(allyTeam.onbattle,a);
		//enemyTeam.onbattle.chargebar = 0;
		//7.26
		enemyTeam.onbattle.chargebar -= enemyTeam.onbattle.moves[a].chargeMax;
		//7.26
		videoSystem.loadAndplay(skillTwo, a);

	} else {
		enemyTeam.onbattle.update_timeline();
	}
	if (allyTeam.onbattle.chargebar > 100) { //如果我方精灵能量值充满
		/*
		if ($("#MovesBlock button").length === 0) {
			allyTeam.onbattle.showMoves();
			launchClick();
		}
		*/
		if (allyTeam.onbattle.firstTurn === false) {
			allyTeam.onbattle.checkAvilableSkill();
			if ($("#MovesBlock button").length === 0) {
				allyTeam.onbattle.showMoves();

				launchClick();
			}


		}
	} else {

		allyTeam.onbattle.update_timeline();

		if ($("#MovesBlock button").length === 0) {
			allyTeam.onbattle.showMoves();
			allyTeam.onbattle.disabledAllSkill()
			launchClick();
		}


		if (allyTeam.onbattle.firstTurn === true) //第一回合时需要显示全部技能
		{
			if ($("#MovesBlock button").length === 0) {
				allyTeam.onbattle.showMoves();
				launchClick();
			}
		}
	}


	//showBattleEmote();
	

}







function battleMainLoop() {

			ctxB.clearRect(0, 0, 500, 500);
			drawBattleField();
			if (videoSystem.finish == false) {
				videoSystem.play();
				//console.log("play");
			} else
				battleScript();
		}

