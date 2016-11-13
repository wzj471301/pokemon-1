var shinystar="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJUlEQVR42mNgQAJ/mFj+M+ACGJIgAVwYpwKcJmCVQGdjdQiMDwAk2S4Y0kIv1wAAAABJRU5ErkJggg=="



$(document).on('click', '#circular_menu_trade', function () {

    if (Trade.trading) {
        alert("你正在交易");
        return;
    }
    askforTrade(play.playerID, $("#circle_title").text());
    $(".circular-menu").remove();

    //alert($("#circle_title").text() );

});

$("body").on('click', '.trade_control_quit', function () {
    responseRequest("trade", "end_trade");
    $('.trade').remove();

    //alert($("#circle_title").text() );

});
$("body").on('click', '.trade_control_lock', function () {
    Trade.lockMyTrade()

    //alert($("#circle_title").text() );

});
$("body").on('click', '.trade_control_confirm', function () {
    if (Trade.my.locked && Trade.foe.locked) {
        Trade.clickTrade();
    }

    //alert($("#circle_title").text() );

});


$("body").on('click', ".trade_mypokemons_div", function () {
    var index = $(this).index();
    //alert(index);
    if (Trade.my.locked)
        return;
    for (var i = 0; i < Trade.my.pokemons.length; i++) {
        if (Trade.my.pokemons[i] === myInfor.pokemons.detail[index]) {
            //alert("same")
            Trade.my.pokemons.splice(i, 1)
            Trade.showMySelectedPokemons();
            Trade.sendMyupdatePokemonToFoe();
            return;
        }
    }

    Trade.my.pokemons.push(myInfor.pokemons.detail[index]);
    Trade.showMySelectedPokemons();
    Trade.sendMyupdatePokemonToFoe();
});


$('body').on('click','.trade_pokemon_div',function(){
    var index =$(this).index();
    if ($(this).parent().hasClass("trade_pokemon_my ")){
        
        //console.log(myInfor.pokemons.detail[1].pic_front)
        if (Trade.my.pokemons[index])
        {
           showTradeDetail(Trade.my.pokemons[index]) 
        }
        
    }
    else{
        if (Trade.foe.pokemons[index])
        {
           showTradeDetail(Trade.foe.pokemons[index]) 
        }
    }
    
    
})

$('body').on('click','.tradedetail',function(){
    $('.tradedetail').remove();
})

function showTradeDetail(pokemondetail){
    var imgs = pokemondetail.pic_front;
    var nm = pokemondetail.name;
    var lv =pokemondetail.level;
    //var sex=pokemondetail.sex;
    
    var htmls='<div class="tradedetail "><div class="tradedetail_name">'+nm+'</div><div class="tradedetail_pic "><img class="image" src="'+imgs+'"></div><div class="tradedetail_main "><div class="tradedetail_chart"><table class="tradedetail_table" ><tr><td></td><td>血量</td><td>攻击</td><td>防御</td><td>特功</td><td>特防</td><td>速度</td></tr><tr class="tradedetail_stat"><td>能力</td><td>100</td><td>200</td><td>400</td><td>300</td><td>200</td><td>100</td></tr> <tr class="tradedetail_ev"><td>努力</td><td>0</td><td>0</td><td>0</td><td>0</td><td>252</td><td>252</td></tr></table></div><div class="other"><div class="element element-1"></div><div class="element element-2"></div><div class="element element-3"></div><div class="element element-4"></div></div><div class="tradedetail_info "><table class="tradedetail_maininfo_table"><tr><td>名称</td><td>'+nm+'</td></tr><tr><td>等级</td><td>'+lv+'</td></tr><tr><td>性别</td><td>♂</td></tr><tr><td>性格</td><td>正常</td></tr><tr><td>特性</td><td>未知</td></tr></table><div class="tradedetail_info_item "><div class="tradedetail_info_item_inner"></div></div></div><div class="tradedetail_skillbox"><div class="tradedetail_skill tradedetail_skill-1"><p class="text text-1">Earth</p><p class="text text-2">15/15</p></div><div class="tradedetail_skill tradedetail_skill-2"><p class="text text-3">Earth</p><p class="text text-4">15/15</p></div><div class="tradedetail_skill tradedetail_skill-3"><p class="text text-5">Earth</p><p class="text text-6">15/15</p></div><div class="tradedetail_skill tradedetail_skill-4"><p class="text text-7">Earth</p><p class="text text-8">15/15</p></div></div></div></div>';
    $("#IGUI").append(htmls);
    
    if ($('.tradedetail').length<=0)
            alert("tradedeatil length == 0")
        var sks = pokemondetail.moves;

   
		for (i in sks) {
            var idx= parseInt(i)+1;
			$('.tradedetail_skill-'+idx+' p:eq(0)').html(sks[i].name);
            $('.tradedetail_skill-'+idx+' p:eq(1)').html(sks[i].ppNow+"/"+sks[i].ppMax)
		}
    var stat =pokemondetail.state;
    var ev =pokemondetail.EV;
    //console.log(stat.length())
        $('.tradedetail_stat td:nth-child(2)').html(stat['hp'])
        $('.tradedetail_stat td:nth-child(3)').html(stat['atk'])
        $('.tradedetail_stat td:nth-child(4)').html(stat['def'])
        $('.tradedetail_stat td:nth-child(5)').html(stat['spAtk'])
        $('.tradedetail_stat td:nth-child(6)').html(stat['spDef'])
        $('.tradedetail_stat td:nth-child(7)').html(stat['spd'])
    $('.tradedetail_ev td:nth-child(2)').html(ev['hp'])
        $('.tradedetail_ev td:nth-child(3)').html(ev['atk'])
        $('.tradedetail_ev td:nth-child(4)').html(ev['def'])
        $('.tradedetail_ev td:nth-child(5)').html(ev['spAtk'])
        $('.tradedetail_ev td:nth-child(6)').html(ev['spDef'])
        $('.tradedetail_ev td:nth-child(7)').html(ev['spd'])
    
    //Trade.displaydetail(pokemondetail);
}










TradeSyetem = function () {
    this.clear();
};

TradeSyetem.prototype = {
    clear: function () {
        this.target = "";
        this.confirm = false;
        this.trading = false;
        this.my = {
            pokecounts: 0,
            name: "",
            pokemons: [],
            money: 0,
            locked: false,
            trade: false
        };
        this.foe = {
            pokecounts: 0,
            name: "",
            pokemons: [],
            money: 0,
            locked: false,
            trade: false
        };

    },
    install: function (target) {
        this.target = target;
        this.confirm = false;

        this.my = {
            pokecounts: myInfor.pokemons.index.length,
            name: play.playerID,
            pokemons: [],
            money: 0,
            locked: false,
            trade: false
        };
        this.foe = {
            pokecounts: 0,
            name: target,
            pokemons: [],
            money: 0,
            locked: false,
            trade: false
        };

    },
    tradestart: function () {
        this.trading = true;
    },
    showTradeUI: function () {
        if ($(".trade").length > 0) {
            alert("已经存在一个交易页面");
            return;
        }
        var htmls = '<div class="trade "><div class="trade_title">Trading with ' + this.foe.name + '</div><div class="tradeblock "><div class="trade_pokemon_my "><div class="trade_pokemon_div trade_pokemon_div-1 "></div><div class="trade_pokemon_div trade_pokemon_div-2 "><img class="shinystar" src="../../battleSystem/Shinystar2.png"></div><div class="trade_pokemon_div trade_pokemon_div-3 "></div> <div class="trade_pokemon_div trade_pokemon_div-4 "></div><div class="trade_pokemon_div trade_pokemon_div-5 "></div>  <div class="trade_pokemon_div trade_pokemon_div-6 "></div><div class="trade_money"></div></div><div class="trade_pokemon_foe "><div class="trade_pokemon_div trade_pokemon_div-7 "></div><div class="trade_pokemon_div trade_pokemon_div-8 "></div><div class="trade_pokemon_div trade_pokemon_div-9 "></div><div class="trade_pokemon_div trade_pokemon_div-10 "></div><div class="trade_pokemon_div trade_pokemon_div-11 "></div><div class="trade_pokemon_div trade_pokemon_div-12 "></div><div class="trade_money"></div></div></div><div class="trade_mypokemons_outborder "><div class="trade_mypokemons_inner "><div class="trade_mypokemons_div trade_mypokemons_div-1"></div><div class="trade_mypokemons_div trade_mypokemons_div-2"></div><div class="trade_mypokemons_div trade_mypokemons_div-3"></div><div class="trade_mypokemons_div trade_mypokemons_div-4"></div><div class="trade_mypokemons_div trade_mypokemons_div-5"></div><div class="trade_mypokemons_div trade_mypokemons_div-6"></div></div></div><div class="trade_control_lock">Lock</div><div class="trade_control_confirm">Trade</div><div class="trade_control_quit">Cancel</div></div>';
        $("#IGUI").append(htmls);
        this.showMypokemons();
    },
    showMypokemons: function () {
        //alert("1");
        for (i = 0; i < $(".trade_mypokemons_div").length; i++) {
            if (myInfor.pokemons.detail[i])
                $('.trade_mypokemons_div:eq(' + i + ')').html('<img src="' + myInfor.pokemons.detail[i].pic_small + '">');
        }
    },
    showMySelectedPokemons: function () {
        for (var i = 0; i < 6; i++) {
            $('.trade_pokemon_my .trade_pokemon_div:eq(' + i + ')').html("");
        }
        for (var i = 0; i < this.my.pokemons.length; i++) {
            
            $('.trade_pokemon_my .trade_pokemon_div:eq(' + i + ')').html('<img src="' + this.my.pokemons[i].pic_small + '"/>');
            if (this.my.pokemons[i].shiny)
                 $('.trade_pokemon_my .trade_pokemon_div:eq(' + i + ')').append('<img class="shinystar " src="'+shinystar+'">')
        }
    },
    showFoeSelectedPokemons: function () {
        for (var i = 0; i < 6; i++) {
            $('.trade_pokemon_foe .trade_pokemon_div:eq(' + i + ')').html("");
        }
        for (var i = 0; i < this.foe.pokemons.length; i++) {
            $('.trade_pokemon_foe .trade_pokemon_div:eq(' + i + ')').html('<img src="' + this.foe.pokemons[i].pic_small + '"/>');
            if (this.foe.pokemons[i].shiny)
                 $('.trade_pokemon_foe .trade_pokemon_div:eq(' + i + ')').append('<img class="shinystar " src="'+shinystar+'">')
        }
    },
    sendMyupdatePokemonToFoe: function () {
        SendPokemonsInfoToFoe(this.my.name, this.foe.name, this.my.pokemons);
    },
    lockMyTrade: function () {
        this.my.locked = true;
        //alert("locked")
        $(".trade_pokemon_my").addClass("trade_lock");
        responseRequest("trade", "lock_trade")
    },
    lockFoeTrade: function () {
        this.foe.locked = true;
        //alert("locked")
        $(".trade_pokemon_foe").addClass("trade_lock");
    },
    clickTrade: function () {
        if (!this.foe.trade) {
            $(".trade_pokemon_my").addClass("trade_click_trade");
            responseRequest("trade", "click_trade")
        } else { //
            this.checkTradeAble()
            
        }
    },
    checkTradeAble: function () {
        if (this.foe.pokemons.length == 0 && this.my.pokemons.length == 0) {
            alert("nothing to trade")
            return false;
        } else if (this.foe.pokecounts == 0) {
            //让对方检查交易
            alert("对方检查");
            responseRequest("trade", "checkTradeAble");
            return false;
        } else if (this.my.pokecounts == this.my.pokemons.length) {
            alert("你至少在背包中留一只宠物")
            return false;
        } else if (this.foe.pokecounts == this.foe.pokemons.length) {
            alert("对方背包内至少留一个宠物")
            return false;
        } else if (this.my.pokecounts - this.my.pokemons.length + this.foe.pokemons.length > 6) {
            alert("交易完后，你背包承受不起6只以上宠物")
            return false;
        } else if (this.foe.pokecounts - this.foe.pokemons.length + this.my.pokemons.length > 6) {
            alert("交易完后，对方背包承受不起6只以上宠物")
            return false;
        } else {
            //alert("good to trade");
            this.trade();
            responseRequest("trade", "final_trade")
            Trade.clear();
            return true;

        }
    },
    trade: function () {
        //alert("123")
        for (var i in this.my.pokemons) {
            for (var j in myInfor.pokemons.detail) {
                if (this.my.pokemons[i]==myInfor.pokemons.detail[j]){
                    myInfor.pokemons.detail.splice(j,1);
                    myInfor.pokemons.index.splice(j,1);        
                    break;
                }
            }
        }
        for (var z in this.foe.pokemons){
            
            myInfor.pokemons.detail.push(this.foe.pokemons[z])
            //alert(this.foe.pokemons[z].pokeDex);
            myInfor.pokemons.index.push(this.foe.pokemons[z].index)
        }
        ShowPokemonsToolbar();
        alert("success")
        $(".trade").remove();
        play.showNewFollower(myInfor.pokemons.index[0]);
        sendChangeFollowerSignal();
        
    },
    displaydetail:function(pokemondetail){
        
        //console.log(sks);
        
    }

};

var Trade = new TradeSyetem();