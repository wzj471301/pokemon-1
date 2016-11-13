
	
	$.ajax({
            type: "GET",
			
            url: "pokemonDB.txt",
     
            success: function (msg) {
				
	
	allData =msg;
	
	
	var data =allData.split("\n");
	
	var singleArray=[];
	for (i=0;i<data.length ;i++ ) 
	{ 
		//document.write(data[i]+"<br/>"); //分割后的字符输出 
		if (data[i].indexOf("[")==0)
		{
			var theNext=i;
			for (var a=i+1; a<data.length; a++)
			{
				if (data[a].indexOf("[")==0 || a==data.length-1)
				{
					theNext=a;
					break;
				}
			}
			
			
			var single ="";
			for (var j=i+1 ;j<theNext;j++)
			{
				single+=data[j]+"\n";
			}
			singleArray.push(single);
		}
	} 
	

	var all =[];
	//console.log(shuxing);
	for (var a= 0; a<singleArray.length;a++)
		all[a+1]=(getEach(singleArray[a]))
		
	
	allData =all;
	console.log(all);
    //console.log(JSON.stringify(all[2]))
    
    var t="";
        for (var i=1; i<650;i++)
        {
            //alert(1);
            all[i]["index"]=i;
            t += JSON.stringify(all[i])+",";
        }
 console.log(t);
 
     //console.log(getEach(singleArray[60])      )     
}
		
	});






	getEach=function(num)
	{
		var sample =num;
		
		var eachAtt= sample.split("\n")
		
		//console.log(eachAtt); //截取每个pokemon信息
		
		var shuxing = {};
		for ( var i=0; i<eachAtt.length-1;i++)
		{
		
			var leftAndRight= eachAtt[i].split("=");
			
			if(leftAndRight[0]=="Type2")
			{
				shuxing["Type1"]+=","+leftAndRight[1];
				
			}
			else if(leftAndRight[0]=="Moves")
			{
				var movesLeftAndRight =leftAndRight[1].split(",");
				var Marray=[];
				for (var x=0;x<movesLeftAndRight.length-1;x=x+2)
				{
					var obj={
						"level":parseInt(movesLeftAndRight[x]),
						"skill":movesLeftAndRight[x+1]
					}
					Marray.push(obj);
				}
				shuxing["Moves"]=Marray;
			}
			else if(leftAndRight[0]=="Evolutions")
			{
				if(leftAndRight[1]=="")
					shuxing["Evolutions"]="null";
				else 
				{
					
					var objArray=[];
					var envlutiondata= leftAndRight[1].split(",");
					for (var b=0; b<envlutiondata.length;b+=3)
					{
						
						var obj={
						"method":envlutiondata[b+1],
						"value":envlutiondata[b+2],
						"to":envlutiondata[b]
						};
						objArray.push(obj);
                        
					}
					shuxing["Evolutions"]=objArray;
				}
				
			}
			else{
			shuxing[leftAndRight[0]]=leftAndRight[1];
			}
		}
		return shuxing
	
	} 
    
    
