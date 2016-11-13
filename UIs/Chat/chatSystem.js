
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
				//console.log("update")
				$('#'+bubble.id).html(bubble.content)
				
				for (i in Game.playersList.id[i]){
					
					if (Game.playersList.id[i] == bubble.name)
					{
						var t = Game.playersList.obj[i]
						
						tp = t.position
						np = InGamePosPharseMousePos(tp.x,tp.y,false)
						//console.log("1")
						//console.log($('#'+bubble.id).width()/2)
						$('#'+bubble.id).offset({ top: np.y-64, left: np.x - $('#'+bubble.id).width()/2})
					}
						
						
						
				}
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
			timeremind: 500
		}
		this.bubbles.push(bubble)
		$("#IGUI").append('<span class="chatBubble"  id="' + bubble.id + '">' + bubble.content + '</span>');
			
	}

}

var c = new ChatSystem();
console.log("chatsystem loaded")