function drawgid() {
	var sx = 0;
	var sy = 0;
	var w = $("#canvasmain").width();
	var h = $("#canvasmain").height();
	//alert(h);
	//画网格
	for (var x = 0; x < w; x += 32) {
		ctxmain.lineWidth = 0.5;
		ctxmain.beginPath();
		ctxmain.moveTo(x, 0);
		ctxmain.lineTo(x, h);
		ctxmain.stroke();
		//var txt = i; 
		ctxmain.font = "10px";
		ctxmain.fillText(x, x, 10);
	}
	for (var y = 0; y < h; y += 32) {
		ctxmain.lineWidth = 0.5;
		ctxmain.beginPath();
		ctxmain.moveTo(0, y);
		ctxmain.lineTo(w, y);
		ctxmain.stroke();
	}
};


function consoleAll(){
	var txt ="type: player------Pos:     "+play.tilePos;
	
	for (var i in Game.drawList)
	{
			var npc =Game.drawList[i];
		txt+="type: npc name: "+npc.name +" Pos: "+npc.tilePos+" \n"
		
	}
	
	txt+="cameraPos: "+map.cameraPos.x+","+map.cameraPos.y;
	
	$("#debug").html("")
	$("#debug").html(txt)
	
	
	
}

$('body').on('mousemove','#canvasmain', function (e) {

	if ($("#PokePopover").length>=0)
	{
		$("#PokePopover").remove();
	}
	var x = (e.pageX - $("#canvasmain").offset().left);
	var y = (e.pageY - $("#canvasmain").offset().top);
	
	
	$("#posCurrent").html("鼠标位置"+x + "," + y +"偏移后Tile"+tilePos(x,y)+"地形"+Terrain(x,y)+"人物="+play.tilePos+"人物前方="+play.getfrontTile()+"back方="+play.getbackTile()+"grass= "+play.ingrass +" 目标：  "+play.traget+"POSITION="+play.position.x+","+play.position.y); 
	
});


