var express = require('express'),
	app = express();
server = require('http').createServer(app),
io = require('socket.io').listen(server);
app.use(express.static(__dirname));

server.listen(3000);


app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html')

});


//10.9 //
    socketWall=[];
//10.9//

players = {
	'id': [],
	'info': [
		]
}
chatMessageHistory = [];

/*		 var info ={
			'id':socket.playerID,
			'x':5,
			'y':18,
			'map':0    //map
			} */

io.sockets.on('connection', function (socket) {

	socket.on('newConnection', function (data, callback) {
		//if (playersID.indexOf(data)!=-1)
        
   
		if (players.id.indexOf(data) != -1) {
			callback(false);
		} else {
			callback(true);
 
			socket.playerID = data; //data -》 id =》 
			players.id.push(socket.playerID);
    ///10.9        
            //console.log(socket.playerID);
            socketWall[socket.playerID]=socket;
            //console.log("socket:"+    socket.id)
	///10.9		
            var tmp = {
				id: data,
				x: 0,
				y: 0,
				map: "zxz",
				face: "",
				follower: {}
			}
			players.info.push(tmp);


			//console.log("newUser");
			//console.log(players.id);
			//console.log(players.info);
		}
	});

	socket.on('disconnect', function (data) {
		if (!socket.playerID) return;
		//playersID.splice(playersID.indexOf(socket.playerID),1);
		var i = players.id.indexOf(socket.playerID);
		players.id.splice(i, 1);
		players.info.splice(i, 1);
    //10.9
        delete(socketWall[socket.playerID]);
    //10.9
		io.sockets.emit('removePlayer', socket.playerID);

	})


	socket.on('sendCharInfor', function (data, callback) {
		if (!data.map || !data.x || !data.y || !data.follower || !data.face) {
			console.log(data.id + "is meeting a bug");
			return;
		}

		//console.log("send data==========="+data);
		var index = players.id.indexOf(data.id);

		if (index >= 0) {
			players.info[index].map = data.map;
			players.info[index].x = data.x;
			players.info[index].y = data.y;
			players.info[index].follower = data.follower;
			players.info[index].face = data.face;

			var sameMapplayers = getAllplayersSameMap(data.map);

			callback(sameMapplayers);
			socket.broadcast.emit('newPlayerEnterGame', data);
			console.log(sameMapplayers);
		}
	})


	function getAllplayersSameMap(mapId) {
		var sameMapplayers = {
			id: [],
			info: []
		}

		for (var i in players.info) {
			
			
			if (players.info[i].map === mapId) {
				sameMapplayers.id.push(players.id[i]);
				sameMapplayers.info.push(players.info[i]);
			}
		}
		return sameMapplayers;
	};

	socket.on('Move', function (data) {
		var i = players.id.indexOf(data.id);
		if (i<0)
		return;
		//console.log("运动角色" + data.id + " No." + i);


	
			switch (data.move) {
			case "up":

				players.info[i].y--;


				break;

			case "down":

				players.info[i].y++;

				break;

			case "left":

				players.info[i].x--;

				break;

			case "right":

				players.info[i].x++;

				break;
			case "jumpUp":

				players.info[i].y--;
				players.info[i].y--;

				break;
			case "jumpDown":

				players.info[i].y++;
				players.info[i].y++;


				break;
			case "jumpLeft":

				players.info[i].x--;
				players.info[i].x--;

				break;

			case "jumpRight":

				players.info[i].x++;
				players.info[i].x++;

				break;
			case "turnUp":

				players.info[i].face = "up";

				break;
			case "turnDown":

				players.info[i].face = "down";

				break;
			case "turnLeft":

				players.info[i].face = "left";

				break;
			case "turnRight":

				players.info[i].face = "right";

				break;
			}
		
		socket.broadcast.emit('otherPlayersMove', {
			dir: data.move,
			info: players.info[i]
		});
	});



	socket.on("changefollower", function (data) {

		if (data.picSrc) {

			var index = players.id.indexOf(data.id);
			if (index<0)
				return;
			players.info[index].follower.picSrc = data.picSrc;

			socket.broadcast.emit('otherPlayersChangeFollower', data);
		} else {
			console.log(data.id)
		}

	})
	///////////////////////
	
	socket.on("getPlayerCount",function(callback){
	
		callback(players.id.length);
	})
	///////////////////////


	///////////////////////////////////////////////CHAT

	socket.on("sendchat", function (data) {
		var txt = data.id + "说: " + data.txt + " (" + data.time + ")";
		chatMessageHistory.push(txt);
		socket.broadcast.emit("otherPlayerMsg", txt);
	})
	///////////////////////////////////////////////Chat
	socket.on("getChatHistory", function (callback) {
		callback(chatMessageHistory);
	})
	
	
	//////////////////////////////  Social Action
	socket.on("action",function(data){
		var i = players.id.indexOf(data.id)
		if (i <0)
			return;
		
		socket.broadcast.emit("otherPlayerAction",data);
	});
	
	
	//////////////////////////////////
    
    //////////////////// trade 10.9
    
    socket.on("askforTrade-from",function(data){
        if (socketWall[data.to]){
        socketWall[data.to].emit("askforTrade-to",data)
        }
    });
    
    
    
    socket.on("responseRequest",function(data){
        if (socketWall[data.to]){
            if (data.type=="trade"){
                socketWall[data.to].emit("getResponse",data)
            }
        }
        
    });
    socket.on("sendUpdatePokemonInfo",function(data){
        if (socketWall[data.to]){
            socketWall[data.to].emit("getUpdatePokemonInfo",data)
        }
    })
    
    /////////////////////trade 10.9

})