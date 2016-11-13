function rate(num) {

    var x = Math.floor(Math.random() * 10001);
    if (x < num * 100) {
        return true;
    }
    return false;
}

function random(min, max) {

    return Math.floor(min + Math.random() * (max - min));

}

function getRadom(Array) {

    var l = -1;
    for (var i in Array) {
        l++;
    }
    var x = Math.floor(Math.random() * (l + 1));
    var index = -1;

    for (var j in Array) {
        index++;

        if (index == x) {
            //	alert("get random "+ j);
            return j;
        }
    }
    return;
}


/*
Array.prototype.toString = function() {
    var str = "";

    for (var i in this) {
        str += i + " => " + this[i] + "\n";
    }
    return str;
};
*/
/*
function autoSize() {
	//if ($(".allyPic .picContainer img").)


	$(".allyPic .picContainer img").bind('load', function () {
		//alert("");
		//var t=$(".allyPic .picContainer img");

		var w = $(this).width();
		var h = $(this).height();

		$(this).width(w * 1.3);
		$(this).height(h * 1.3);

	})

	$(".enemyPic .picContainer img").bind('load', function () {
		//alert("");
		//var t=$(".allyPic .picContainer img");
		var w = $(this).width();
		var h = $(this).height();

		$(this).width(w * 0.8);
		$(this).height(h * 0.8);


	})
	
}
	*/


/*
Object.prototype.toString = function () {
	var str = "";

	for (var i in this) {
		str += i + " => " + this[i] + "\n";
	}
	return str;
};
*/

//------------------------------------------------
//------------------------------------------------
//------------------------------------------------SKILL
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------


function skill(name) {
    var o = {};
    try {
        var ctx = BattleMovedex[name];
        o.name = ctx.name;
        o.id = ctx.id;
        o.ppMax = ctx.pp;
        o.ppNow = o.ppMax;
        //o.desc = ctx.desc;
        o.type = ctx.type;
        o.accuracy = ctx.accuracy;
        o.basePower = ctx.basePower;
        if (ctx.boosts)
            o.boosts = ctx.boosts; //此处 指针数据
        o.chargeMax = Math.floor(100 / (o.ppMax / 5));
        return o;
    } catch (err) {
        log("can not load skill for database, skill= " + name);
    }
}

//------------------------------------------------
//------------------------------------------------
//------------------------------------------------SKILL
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//--------------------------------------------------------------------Subclass
function PokemonType() {
    this.name = "";
    this.index = 0;
    this.type;
    this.baseState = [];

    this.getBaseState = function() {
        var ary = allData[this.index]['BaseStats'].split(",");
        this.baseState["hp"] = parseInt(ary[0]);
        this.baseState['atk'] = parseInt(ary[1]);
        this.baseState['def'] = parseInt(ary[2]);
        this.baseState['spd'] = parseInt(ary[3]);
        this.baseState['spAtk'] = parseInt(ary[4]);
        this.baseState['spDef'] = parseInt(ary[5]);
    };

    this.getDatabyIndex = function(dex) {
        this.index = dex;
        if (!allData[dex]) {
            log(dex + "pokemon dex not found");
            return;
        }

        this.name = allData[dex]["Name"];
        //	console.log(allData[dex]);
        this.type = allData[dex]["Type1"].split(",");
        //	console.log(this.type);
        this.getBaseState();
    };


}
//------------------------------------SubClass



pokemon.prototype = {
    translateByJson: function(obj) {
        obj.apply(this);
    },
    setId: function() {

        return (new Date()).getTime() + Math.floor(Math.random() * (9999 + 1));

    },
    getInfor: function() {
        var str = "Name: " + this.name + "\n Pokedex: " + this.index + "\n BaseState: " + this.baseState.toString() + "\n IV: " + this.IV.toString();
        return (str);
    },
    setShiny: function() {
        this.shiny = true;
        this.getPics();
    },

    //战斗时能力值
    getTmpState: function() {
        this.tmpState.hp = this.state.hp;
        this.tmpState.atk = this.state.atk;
        this.tmpState.def = this.state.def;
        this.tmpState.spAtk = this.state.spAtk;
        this.tmpState.spDef = this.state.spDef;
        this.tmpState.spd = this.state.spd;
    },
    getMoves: function() {
        try {
            var level = this.level; //my level
            var mCL = allData[this.index].Moves; //moves can learned
            //alert(mCL);
            var top = 0; // the biggest index of move
            for (var i = 0; i < mCL.length; i++) {
                if (level > mCL[i].level) {
                    top = i - 1;

                }
            }
            for (var j = top; j > top - 4; j--) {
                if (j >= 0) {
                    var name = mCL[j].skill.toLowerCase();
                    var newskill = new skill(name);

                    this.moves.push(newskill);
                }
            }
        } catch (err) {
            console.log("err occur on GetMoves")
        }


    },
    //获得图片
    getPics: function() {
        var dex = stringInt(this.index);
        this.pic_small = "battleSystem/small/" + dex + ".gif";
        this.pic_footprint = "battleSystem/Footprint/" + dex + ".gif";
        if (this.shiny) {
            this.pic_front = "battleSystem/Battlers/" + dex + "s.gif";
            this.pic_back = "battleSystem/Battlers/" + dex + "sb.gif";
        } else {
            this.pic_front = "battleSystem/Battlers/" + dex + ".gif";
            this.pic_back = "battleSystem/Battlers/" + dex + "b.gif";
        }
    },
    //计算能力值
    calStats: function() {
        //ＨＰ = [种族值*2 + 个体值 + [努力值/4]] * Lv / 100 + 10 + Lv
        var hp = Math.floor((this.baseState['hp'] * 2 + this.IV.hp + Math.floor(this.EV.hp / 4)) * this.level / 100 + 10 + this.level);
        //其余 = [[种族值*2 + 个体值 + [努力值/4]] * Lv / 100 + 5] * 性格修正 * 特性修正(若有的话，但注意这个不会显示在精灵资料中)
        var attak = Math.floor((this.baseState['atk'] * 2 + this.IV.atk + Math.floor(this.EV.atk / 4)) * this.level / 100 + 5);
        var def = Math.floor((this.baseState['def'] * 2 + this.IV.def + Math.floor(this.EV.def / 4)) * this.level / 100 + 5);
        var spAttk = Math.floor((this.baseState['spAtk'] * 2 + this.IV.spAtk + Math.floor(this.EV.spAtk / 4)) * this.level / 100 + 5);
        var spDef = Math.floor((this.baseState['spDef'] * 2 + this.IV.spDef + Math.floor(this.EV.spDef / 4)) * this.level / 100 + 5);
        var spd = Math.floor((this.baseState['spd'] * 2 + this.IV.spd + Math.floor(this.EV.spd / 4)) * this.level / 100 + 5);

        var str = this.getInfor() + "\nhp->" + hp + "\natk->" + attak + "\ndef->" + def + "\nspAtk->" + spAttk + "\nspDef->" + spDef + "\nspd->" + spd;
        //console.log(str);
        this.state.hp = hp;
        this.state.atk = attak;
        this.state.def = def;
        this.state.spAtk = spAttk;
        this.state.spDef = spDef;
        this.state.spd = spd;
        this.getTmpState();

    },
    //随机数个体值
    makeNewIV: function() {

        this.IV.hp = Math.floor(Math.random() * (31 + 1));
        this.IV.atk = Math.floor(Math.random() * (31 + 1));
        this.IV.def = Math.floor(Math.random() * (31 + 1));
        this.IV.spd = Math.floor(Math.random() * (31 + 1));
        this.IV.spAtk = Math.floor(Math.random() * (31 + 1));
        this.IV.spDef = Math.floor(Math.random() * (31 + 1));
    },
    //数字00转换
    stringInt: function(intg) {
        var X = "";
        if (Math.floor(intg / 100) == 0)
            X += "0";
        if (Math.floor(intg / 10) == 0)
            X += "0";
        return X += intg;

    },
    //根据号码生成pokemon
    makeNewByDex: function(dex) {
        this.getDatabyIndex(dex);
        this.makeNewIV();
        this.getInfor();
        this.calStats();
        this.getPics();
        this.getMoves();
    },


    setLevel: function(newLevel) {
        this.level = newLevel;
        this.calStats();
        this.getMoves();
    },
    setAlly: function(allyOrEnemy) {
        this.ally = allyOrEnemy;


        /*    */
    },
    //跑时间条
    displayBarAndPics: function() {
        //显示位置和血条，计时条；
        $("#timebar-main").append(' <div id ="' + this.id + '" class="timebar-icon ' + this.ally + '"><img src="' + this.pic_small + '"></div> ');

        this.displayPics();
    },
    displayPics: function() {
        var pic = this.pic_front;
        var position = "enemyPic";
        if (this.ally == "ally") {
            position = "allyPic";
            pic = this.pic_back;
        }
        var name = this.name;

        //6.27
        this.firstTurn = true;
        //msg("set firstTurn= true");

        if (this.ally === "enemy")
            allyTeam.onbattle.chargebar = 0;

        //6.27

        var hp = (this.tmpState['hp'] / this.state['hp']) * 100;
        if (this.shiny)
            name = '<span style="color:black">★</span>' + name;

        $("#battle-scene").append(' <div class="' + position + ' Pokemon_container"><div style="margin-bottom: 3px;"><img src="battleSystem/pokeball/pokeball.png"><span class="label label-default">Lv:' + this.level + '</span><span class="label label-info">' + name + '</span></div><div  class="progress"><div id="hpBar" class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + hp + '%;"></div></div><div class="picContainer"><img class="pokePic" src="' + pic + '" ></div></div>');
        $("." + position).hide();
        $("." + position).fadeIn('slow');
        //autoSize();

        //7.26
        if (this.ally == "ally") {
            this.showMoves();
            launchClick();
            this.disabledAllSkill();
        }
        $("#" + this.id + "").css("left", (this.chargebar * 0.01 * 300 + "px"));

        //7.26
    },
    showMoves: function() {

        $("#MovesBlock").html("");


        for (var e in this.moves) {
            try {
                var a = this.moves[e].type.toLowerCase();
                $("#MovesBlock").append('<button class="skillState btn btn-default  col-sm-3" ><div class="skillName text-center">' + this.moves[e].name + '</div><div class="pull-left"><img src="battleSystem/type/' + a + '.bmp"></div><div class="pull-right">' + this.moves[e].chargeMax + '</div></button>');
            } catch (err) {
                log("装载技能出错 index= " + e);
            }



        }


    },
    checkAvilableSkill: function() {
        for (var i in this.moves) {
            var skill = this.moves[i];
            if (this.chargebar < skill.chargeMax) //不满足能量
            {
                $(".skillState:eq(" + i + ")").attr("disabled", "true");
                //msg("set disable")
            } else {
                $(".skillState:eq(" + i + ")").removeAttr("disabled")
                //msg("remove")
            }




        }
    },
    disabledAllSkill: function() {
        for (var i in this.moves) {
            var skill = this.moves[i];
            $(".skillState:eq(" + i + ")").attr("disabled", "true");
        }
    },

    pokemonSwap: function(to) { //anmation

        if (this === to) return;


        var b = "#" + this.id;
        if (this.ally == "ally") {
            var a = ".allyPic";
            var name = this.name;


            $("#MovesBlock").html("");

            $(a).fadeOut('slow', function() {
                //msg(to.ally + " " + name + " Swap!");
                $(b).remove();
                $(a).remove();
                msg(to.ally + " " + name + " Swap!" + "<br/>" + to.name + " Go !")


                $("#MovesBlock").html("");
                to.toField();
                allyTeam.onbattle = to;
            });
        } else

        {
            a = ".enemyPic";

            $("#MovesBlock").html("");
            msg(this.ally + " " + this.name + " pokemon swap!");
            $(a).fadeOut('slow', function() {
                $(b).remove();
                $(a).remove();
                msg(to.name + " Go !")


                //$("#MovesBlock").html("");
                to.toField();
                enemyTeam.onbattle = to;



            });
        }


    },

    update_timeline: function() { // 跑计时条
        this.chargebar += (this.tmpState.spd / 4 / Math.ceil(this.level / 1));
        var s = this.chargebar;

        //s=百分比
        /*
		if (s > 100) {
			this.chargebar=100;
		//	s = 0;
		//	this.chargebar = 0;
		}
*/
        $("#" + this.id + "").css("left", (s * 0.01 * 300 + "px"));

    },
    useSkill: function(traget, skillId) {
        if (!this.moves[skillId])
            msg(skillId + " doesn't belong to this pokemon " + skillId + " ");
        var skill = this.moves[skillId];

        /*
		1．物理攻击技巧使用的场合：
[(攻击侧的LV×0.4＋2)×技巧威力×攻击侧的攻击力÷防御侧的防御力÷50＋2)×各类修正×(217～255之间)÷255 
2．特殊攻击技巧使用的场合：
[(攻击侧的LV×0.4＋2)×技巧威力×攻击侧的特殊攻击力÷防御侧的特殊防御力÷50＋2)×各类修正×(217～255之间)÷255
		
		*/

        var accuracy = skill.accuracy;
        if (traget.ally == "enemy") {
            //log("attack them");
            var ally = allyTeam.onbattle;
            var enemy = enemyTeam.onbattle;
        } else {
            //log("attack us");
            var ally = enemyTeam.onbattle;
            var enemy = allyTeam.onbattle;
        }
        var damage = skill.basePower;

        enemy.tmpState["hp"] -= damage;
        msg(this.name + " uses " + skill.name + " deal " + damage + " damage");
        var precent = enemy.tmpState["hp"] / enemy.state["hp"] * 100;
        //alert(precent);
        //6.28
        showIcons();
        //6.28
        if (traget.ally == "ally") {
            $(".allyPic #hpBar").css("width", precent + "%");
        } else {
            $(".enemyPic #hpBar").css("width", precent + "%");
        }
        // 7.26
        //this.chargebar -=skill.chargeMax;

        if (this.firstTurn === true) {
            this.firstTurn = false;
            //msg("firstTurn=false");
        }
        this.disabledAllSkill() //6.27
    },
    fall: function() {
        var b = "#" + this.id;
        if (this.ally == "ally") {
            var a = ".allyPic";
            var name = this.name;


            $("#MovesBlock").html("");

            $(a).fadeOut('slow', function() {
                //msg(to.ally + " " + name + " Swap!");
                $(b).remove();
                $(a).remove();
                log(allyTeam.onbattle.name + "cant fight anymore! ");
                allyTeam.onbattle = null; //出场精灵为null
            })

        } else {
            var a = ".enemyPic";
            var name = this.name;


            //$("#MovesBlock").html("");

            $(a).fadeOut('slow', function() {
                //msg(to.ally + " " + name + " Swap!");
                $(b).remove();
                $(a).remove();
                msg(enemyTeam.onbattle.name + "cant fight anymore!");
                enemyTeam.onbattle = null
                //出场精灵为null

            })


        }
    },
    toField: function() {
        this.displayBarAndPics();
    }
}

function pokemon() {

    PokemonType.apply(this);
    this.id = this.setId();
    this.gender = null;
    this.shiny = false;
    this.type = null;
    this.IV = {
        'hp': 0,
        'atk': 0,
        'def': 0,
        'spAtk': 0,
        'spDef': 0,
        'spd': 0
    };
    this.EV = {
        'hp': 0,
        'atk': 0,
        'def': 0,
        'spAtk': 0,
        'spDef': 0,
        'spd': 0
    };
    this.state = {
        'hp': 0,
        'atk': 0,
        'def': 0,
        'spAtk': 0,
        'spDef': 0,
        'spd': 0
    };
    this.tmpState = {
        'hp': 0,
        'atk': 0,
        'def': 0,
        'spAtk': 0,
        'spDef': 0,
        'spd': 0
    };


    this.level = 100;
    this.moves = new Array();

    this.pic_small = "";
    this.pic_front = "";
    this.pic_back = "";
    this.pic_footprint = "";

    this.ally = "ally";
    this.chargebar = 0;
    //change 6.27	
    this.firstTurn = false;
    //6.27


}