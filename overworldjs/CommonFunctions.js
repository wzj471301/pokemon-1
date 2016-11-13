console.log("commonfunctions loaded")
function mousePosPharseInGamePos(mousex,mousey){    //鼠标所在位置，转换成实际人物所在位置
             var a = {
            x: mousex,
            y: mousey
        };
        var IGP ={
            x:a.x-$('#canvasmain').offset().left,
            y:a.y-$('#canvasmain').offset().top
        };
    
     //   console.log("mouse in screen")
     //   console.log(IGP.x+","+IGP.y);
     //   console.log("cameraPos")
    //    console.log(map.cameraPos.x-320,map.cameraPos.y-320)
    
        var tp ={x:0,y:0}
                tp.x = Math.floor((IGP.x +(map.cameraPos.x-320))/32);
            
                tp.y = Math.floor((IGP.y +(map.cameraPos.y-320))/32);
    return tp;
}

function InGamePosPharseMousePos(tpx,tpy,Titled){    //游戏人物所在位置，转换成实际页面位置位置
	//console.log("call from fun")
	//console.log(tpx,tpy)
	
	if (!arguments[3]){
		
		var  rx =  tpx -(map.cameraPos.x-320) +$('#canvasmain').offset().left +16
    	var ry = tpy -  (map.cameraPos.y-320) +16
		var a ={x:rx,y:ry};
    
    	return a;
	}
   var  rx =  tpx*32 -(map.cameraPos.x-320) +$('#canvasmain').offset().left +16
    var ry = tpy*32-  (map.cameraPos.y-320) +16
    
    a={x:rx,y:ry};
    
    return a;
}




