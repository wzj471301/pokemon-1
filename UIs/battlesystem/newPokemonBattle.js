var debuging = false;

function random(min, max) {

    return Math.floor(min + Math.random() * (max - min));

}
function log(str) {
    if (debuging) {
        alert(str);
        console.log(str);
    }
}

function stringInt(intg) {
    var X = "";
    if (Math.floor(intg / 100) == 0)
        X += "0";
    if (Math.floor(intg / 10) == 0)
        X += "0";
    return X += intg;

}

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
            o.boosts = ctx.boosts;

        return o;
    } catch (err) {
        log("can not load skill for database, skill= " + name);
    }
}




function PokemonType() {
    this.name = "";
    this.index = 0;
    this.type;
    this.baseState = [];

    this.getBaseState = function () {
        var ary = pokemonDb[this.index]['BaseStats'].split(",");
        this.baseState["hp"] = parseInt(ary[0]);
        this.baseState['atk'] = parseInt(ary[1]);
        this.baseState['def'] = parseInt(ary[2]);
        this.baseState['spd'] = parseInt(ary[3]);
        this.baseState['spAtk'] = parseInt(ary[4]);
        this.baseState['spDef'] = parseInt(ary[5]);
    };

    this.getDatabyIndex = function (dex) {

        if (!pokemonDb[dex]) {
            log(dex + "pokemon dex not found");
            return;
        }
        this.index = dex;
        this.name = pokemonDb[dex-1]["InternalName"];
        //	console.log(allData[dex]);
        this.type = pokemonDb[dex-1]["Type1"].split(",");
        //	console.log(this.type);
        this.getBaseState();
    };


}


pokemon.prototype = {
    translateByJson: function (obj) {
        obj.apply(this);
    },
    setId: function () {

        return (new Date()).getTime() + Math.floor(Math.random() * (9999 + 1));

    },
    getInfor: function () {
        var str = "Name: " + this.name + "\n Pokedex: " + this.index + "\n BaseState: " + this.baseState.toString() + "\n IV: " + this.IV.toString();
        return (str);
    },
    setShiny: function () {
        this.shiny = true;
        this.getPics();
    },

    //战斗时能力值
    getTmpState: function () {
        this.tmpState.hp = this.state.hp;
        this.tmpState.atk = this.state.atk;
        this.tmpState.def = this.state.def;
        this.tmpState.spAtk = this.state.spAtk;
        this.tmpState.spDef = this.state.spDef;
        this.tmpState.spd = this.state.spd;
    },
    getMoves: function () {
        try {
            var level = this.level; //my level
            var skdb = pokemonDb[this.index-1].Moves; //moves can learned

            //console.log(skdb);
            //alert(this.level);
            for (var i = 0; i < skdb.length; i++) {
                //console.log(skdb[i])
                //console.log(this.level)
                //console.log(skdb[i].level)
                if (this.level > skdb[i].level) 
                {
                    this.moves.push(new skill(skdb[i].skill.toLowerCase()))
                    if (this.moves.length>4)
                         this.moves.splice(0,1)
                    
                }
                    //alert(i);
                    
                
                
            }


        } catch (err) {
            alert(this.index)
            throw err;
        }


    },
    //获得图片
    getPics: function () {
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
    calStats: function () {
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
    makeNewIV: function () {

        this.IV.hp = Math.floor(Math.random() * (31 + 1));
        this.IV.atk = Math.floor(Math.random() * (31 + 1));
        this.IV.def = Math.floor(Math.random() * (31 + 1));
        this.IV.spd = Math.floor(Math.random() * (31 + 1));
        this.IV.spAtk = Math.floor(Math.random() * (31 + 1));
        this.IV.spDef = Math.floor(Math.random() * (31 + 1));
    },
    //数字00转换

    //根据号码生成pokemon
    makeNewByDex: function (dex) {
        this.getDatabyIndex(dex);
        this.makeNewIV();
        this.getInfor();
        this.calStats();
        this.getPics();
        this.getMoves();
    },


    setLevel: function (newLevel) {
        this.level = newLevel;
        this.calStats();
        this.getMoves();
    },
    setGender: function () {

    }


    /*    */

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

