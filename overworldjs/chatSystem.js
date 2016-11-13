
ChatSystem = function () {

	this.bubbles = [];
	this.saved = [];
	this.timer = 0;
};

ChatSystem.prototype = {
	install:function() {
		this.bubbles = [];
		this.timer = 0;
	},
	showBubles: function () {
		for (i in this.bubbles) {
			
			
			this.bubbles[i].timeremind--;

			if (this.bubbles[i].timeremind < 0) {
				this.removeBubble(this.bubbles[i])
			} else {
				this.updateBubble(this.bubbles[i]);
			}

		}
	},
	updateBubble: function (bubble) {
			if ($('#'+bubble.id).length > 0) {
				console.log("update")
				$('#'+bubble.id).html(bubble.content+'('+bubble.timeremind+')')
				
				for (i in Game.playersList){
					if Game.playersList.id[i] == bubble.name
						alert("got"+ Game.playersList.id)
				}
				//InGamePosPharseMousePos()
			}
	},
	removeBubble: function (bubble) {
		var b = bubble;
		if ($('#'+bubble.id).length > 0) {
			$('#'+bubble.id).remove()
			var i = this.bubbles.indexOf(bubble)
			this.savePastBubble(bubble)
			delete this.bubbles[i];
		}

	},
	savePastBubble: function (bubble) {
		this.saved.push(bubble);
	},
	generateBubble: function (playerID, text, lasttime) {
		var d = new Date();
		var bubble = {
			id: playerID+ "talk",
			name: playerID,
			content: text,
			time: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds(),
			timeremind: 100
		}
		this.bubbles.push(bubble)
		$("body").append('<div class="chatBubble" style="background:white; border:1 px solid black; width:100px;height:100px;" id="' + bubble.id + '">' + bubble.content + '<div>');
		alert("gen")
			console.log(this.bubbles)
	}

}

var c = new ChatSystem();
console.log("chatsystem loaded")