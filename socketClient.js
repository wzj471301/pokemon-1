function consolePlayerList() {
    $("#playerList").html("");

    if (Game.playersList)
        var x = "";
    for (var i in Game.playersList.info) {

        x += '<div>id=' + Game.playersList.info[i].id + ' map=' + Game.playersList.info[i].map + '  xy= ' + Game.playersList.obj[i].tilePos + '</div>';
    }
    $("#playerList").html(x);
}

function makePlayerOverworld() {
    Game.playersList.obj = [];
    for (var i in Game.playersList.info) {


        var c = Game.playersList.info[i];
        if (c.id == gameUser) {
            Game.playersList.obj.push(play);
            continue;
        }
        var sprite = new otherPlayer(192 / 4, 256 / 4, 0, 0, 4, "charactor/hero/boywalking.png", 15, 4, 4);
        sprite.Turn(c.face)
        sprite.setPosition(c.x, c.y);
        sprite.playerID = c.id;
        sprite.Setfollower(new pokemonFollower(0, 0, 0, 0, 4, c.follower.picSrc, 15, 4, 4));




        Game.playersList.obj.push(sprite);
        Game.drawList.push(sprite);

    }
    // console.log("making overworld  ---game.palyers.obj, drawList");
    //    console.log(Game.playersList.obj)
    //  console.log(Game.drawList)
    //    console.log("---------------------------");
}



function deletPlayerFromList(id) {
    var a = Game.playersList.id.indexOf(id);
    if (a != -1) {
        Game.playersList.id.splice(a, 1);
        Game.playersList.info.splice(a, 1);

        var obj = Game.playersList.obj[a];
        delet(Game.drawList, obj);
        Game.playersList.obj.splice(a, 1); /////////////////////////////////////////////////////////
    } else {
        console.log("(" + id + ")" + "不存在");
    }
    return;

}

function addPlayToList(playInfo) {
    Game.playersList.id.push(playInfo.id);
    Game.playersList.info.push(playInfo);
    var sprite = new otherPlayer(192 / 4, 256 / 4, 0, 0, 4, "charactor/hero/boywalking.png", 15, 4, 4);

    sprite.setPosition(playInfo.x, playInfo.y);

    sprite.Turn(playInfo.face)
    sprite.playerID = playInfo.id;
    if (playInfo.follower.picSrc)
        sprite.Setfollower(new pokemonFollower(0, 0, 0, 0, 4, playInfo.follower.picSrc, 15, 4, 4));


    Game.playersList.obj.push(sprite);

    Game.drawList.push(sprite);

    //console.log(Game.drawList)
}


var socket = io.connect("http://localhost:3000");



function connectToserver() {
    socket.emit('newConnection', gameUser, function (data) {
        if (!data) {
            alert("名字存在，刷新页面，换一个 \n refresh page and change a new name");

        } else {
            //$('#playerID').val(gameUser);
            play.playerID = gameUser;

            debugMsg("你(" + gameUser + ")进入了游戏");

            sendCharInfor();
        }
    })
};

socket.on('removePlayer', function (data) {
    deletPlayerFromList(data);
    debugMsg("玩家 " + data + " 退出游戏");
    console.log("removePlayer");
    console.log(Game.playersList);
});



function sendCharInfor() {
    if (!map.id || !gameUser) {
        alert("你遇到了错误，请截图并联系群主");
        return;

    }
    socket.emit('sendCharInfor', {
        id: gameUser,
        x: play.tilePos.x,
        y: play.tilePos.y,
        face: play.face,
        map: map.id,
        follower: {
            picSrc: play.follower.image.src
        }
    }, function (callback) {


        Game.playersList.id = callback.id;
        Game.playersList.info = callback.info;

        makePlayerOverworld();
        getMsgHistory();
    });
}



socket.on('newPlayerEnterGame', function (data) {


    if (data.map == map.id) {
        addPlayToList(data);
        //	console.log("addnewplayer");
        //	console.log(Game.playersList);
        debugMsg("玩家 " + data.id + " 进入本地圖");
    } else if (data.map != map.id) {
        var index = Game.playersList.id.indexOf(data.id);
        if (index > -1)
            deletPlayerFromList(data.id);

    }

});



function sendMoveSingal(dir) {
    if (dir && gameUser) {

        socket.emit('Move', {
            move: dir,
            id: gameUser
        });
    }
}
socket.on("otherPlayersMove", function (data) {
    if (data.info || data.dir)
        if (data.info.map === map.id) {
            //	console.log(data);
            var i = Game.playersList.id.indexOf(data.info.id);

            if (i < 0)
                return;

            switch (data.dir) {
            case "up":
            case "jumpUp":
                Game.playersList.obj[i].Move("up");
                break;
            case "down":
            case "jumpDown":
                Game.playersList.obj[i].Move("down");
                break;
            case "left":
            case "jumpLeft":
                Game.playersList.obj[i].Move("left");
                break;
            case "right":
            case "jumpRight":
                Game.playersList.obj[i].Move("right");
                break;
            case "turnUp":
                Game.playersList.obj[i].Turn("up");
                break;
            case "turnDown":
                Game.playersList.obj[i].Turn("down");
                break;
            case "turnLeft":
                Game.playersList.obj[i].Turn("left");
                break;
            case "turnRight":
                Game.playersList.obj[i].Turn("right");
                break;
            }

        }
});

function sendChangeFollowerSignal() {
    if (gameUser) {
        socket.emit('changefollower', {
            id: gameUser,
            picSrc: play.follower.image.src
        });
    }
}
socket.on("otherPlayersChangeFollower", function (data) {


    var index = Game.playersList.id.indexOf(data.id)
    if (index < 0)
        return;
    try {
        Game.playersList.obj[index].Setfollower(new pokemonFollower(0, 0, 0, 0, 4, data.picSrc, 15, 4, 4));
        Game.playersList.obj[index].steps = 0;
        Game.playersList.obj[index].fpsCount = 0;
    } catch (err) {

    }
})

//获得游戏人数

function getPlayerNumber() {
    socket.emit("getPlayerCount", function (callback) {
        $("#allPlayer").html("<div>Players: " + callback + "</div><div>Local Players:" + Game.playersList.id.length + " </div>");
    })

}

//获得游戏人数

//聊天处理

function chatMessage() {
    var t = new Date()
    var time = t.toLocaleDateString() + "/" + t.toLocaleTimeString();
    //alert(time);
    var txt = $("#messageBox").val();
    //alert(txt);
    var data = {
        "id": gameUser,
        "txt": txt,
        "time": time
    }
    chatMsg("你说: " + txt);
	c.generateBubble(play.playerID,txt,100)
	//alert("socketclient called")
	alert("sssss")
    $("#messageBox").val("");
    socket.emit("sendchat", data);

}
socket.on("otherPlayerMsg", function (data) {
    chatMsg(data);

})

function getMsgHistory() {
    socket.emit("getChatHistory", function (callback) {
        for (var i in callback) {
            chatMsg(callback[i]);
        }

    });
}
//聊天处理

//互动系列

function sendAction(action) {
    if (!gameUser || !play.playerID)
        return;
    data = {
        id: gameUser,
        action: action
    }
    socket.emit("action", data);

}
socket.on("otherPlayerAction", function (data) {

    var i = Game.playersList.id.indexOf(data.id);

    if (i < 0)
        return;

    switch (data.action) {
    case "jump":
        Game.playersList.obj[i].jump = true;
        Game.playersList.obj[i].steps = 0;
        Game.playersList.obj[i].SetLimit(4);
        break;

    case "emote":

        Game.playersList.obj[i].expression = "1";
        Game.playersList.obj[i].steps = 0;
        Game.playersList.obj[i].SetLimit(4);
        break;
    }
});



function saveGameData() {
    if (myInfor == null)
        return;
    //console.log(myInfor);

    myInfor.Pos.x = play.tilePos.x;
    myInfor.Pos.y = play.tilePos.y;
    myInfor.map = map.id;
    var gameData = JSON.stringify(myInfor);
    //gameData=gameData.replace("\r",""); 


    $.post("php/saveGame.php", {
        user: gameUser,
        data: gameData
    }, function (data) {
        //console.log(data);
    })

}

function loadPlayerData() {
    $.post("php/getPlayerInfo.php", {
        user: gameUser
    }, function (data) {


        var playerInfo;
        if (data != "") {


            var json = JSON.parse(data);

            playerInfo = json;

        } else {
            playerInfo = {
                name: gameUser,
                Pos: {
                    x: 11,
                    y: 5
                },
                bag: [],
                pokemons: {
                    index: makeRandomTeamPokedex(2),
                    detail: []
                },
                tasksMark: [],
                beatNpc: ["002"],
                pokeDex: [],
                map: "zxz",
            };
            playerInfo.pokemons.detail = makeFixTeam(playerInfo.pokemons.index, "ally");
        }

        GameStart(playerInfo);





    })
}


////////////
//Trade
function askforTrade(from, to) {
    data = {
        from: from,
        to: to
    }
    Trade.install(data.to);
    socket.emit("askforTrade-from", data);
}

function responseRequest(type, yesorno) {
    //alert("接受交易")
    var from = play.playerID;
    //alert (Trade.target)
    var to = Trade.target;

    var data = {
        type: type,
        yesorno: yesorno,
        from: from,
        to: to
    };

    if (yesorno == "yes") {

        Trade.showTradeUI();
        Trade.tradestart()
    }
    if (yesorno == "end_trade") {
        Trade.clear();
    }
    socket.emit("responseRequest", data);
}


////////////
//Trade
socket.on("askforTrade-to", function (data) {
   // console.log(data);
    Trade.install(data.from);
    if (!Trade.trading)
        popRequest("trade", data.from);
    else {
        //alert("对方请求交易，可是你正在交易中")
        responseRequest("trade", "trading");

    }
})

function SendPokemonsInfoToFoe(from,to,pokemon){
    var data={
        from:from,
        frompkcount:Trade.my.pokecounts,
        to:to,
        pokemons:pokemon
    }
    socket.emit("sendUpdatePokemonInfo", data);
    
}
socket.on("getUpdatePokemonInfo",function(data){
    //alert("1")
    //console.log(data);
    if (Trade.foe.name==data.from && Trade.my.name==data.to)
    {
        Trade.foe.pokemons=data.pokemons;
        Trade.foe.pokecounts=data.frompkcount;
        
        Trade.showFoeSelectedPokemons();
        
    }
})
/////////
socket.on("getResponse", function (data) {
    if (data.type == "trade") {
        switch (data.yesorno) {
        case "yes":
            Trade.showTradeUI();
            Trade.tradestart()
            break;
        case "trading":
            alert("对方正在交易");
            break;
        case "end_trade":
                alert(Trade.target+"取消交易")
                Trade.clear();
                $(".trade").remove()     
            break;
        case "deny_trade_request":
                alert(Trade.target+"拒绝交易")
                Trade.clear();
            break;
        case "lock_trade":
                Trade.lockFoeTrade();
                break;
        case "click_trade":
                $(".trade_pokemon_foe").addClass("trade_click_trade");
                Trade.foe.trade=true;
                break;
        case "checkTradeAble":
                Trade.checkTradeAble();
                break;
            case "final_trade":
                Trade.trade();
                Trade.clear();
                break;
        }




    }
    
    
})
//