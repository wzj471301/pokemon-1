function DetailUI() {
	var currentPokeInbar;
	$('body').on("click", ".pokedetailcontainer .close", function () {
		$(".pokedetailcontainer").remove();
	})


	$('body').on("click", ".showPokeDetailWindow", function () {
		var index = $("#PokePopover").attr("Pokeindex");
		currentPokeInbar = index;
		if ($(".pokedetailcontainer").length <= 0)
		//$(".pokedetailcontainer").remove();


		//start install new information
			var a = '<div class="pokedetailcontainer "><div class="maininfo "><div class="namepanel "> <p class="name">超级烈焰马</p> </div> <div class="introbackground "><p class="text text-1">种族名</p> <p class="intername">烈焰马</p><p class="text text-2">Lv</p><p class="lv">100</p><p class="text text-3">性别</p> <p class="sex">♂</p><p class="text text-4">属性</p> <div class="type "><img class="image image-1" src="battleSystem/type/dark.bmp"><img class="image image-2" src="battleSystem/type/fire.bmp"></div><p class="text text-5">性格</p><p class="nature">顽强</p> <p class="text text-6">OT</p><p class="ot">辣条皇</p></div> </div><div class="chart"><canvas  id="pokemonChart"></canvas></div><div class="close"></div> <div class="mainpic "><img class="bigpic" src="battleSystem/Battlers/009_1.gif"> <img class="shiny" src="battleSystem/shinystar.png"></div> <div class="mainpoke "> <div class="hp"></div> <div class="element"></div><div class="skill skill-1"></div><div class="skill skill-2"></div><div class="skill skill-3"></div><div class="skill skill-4"></div><div class="exp"></div></div><div class="itemhold "> <div class="item"></div></div><div class="pokemonslist"><div class="element element-2"></div><div class="element element-3"></div><div class="element element-4"></div><div class="element element-5"></div><div class="element element-6"></div><div class="element element-7"></div></div><div class="pokemonscontrol "><div class="left"><a class="btn">换位</a></div><div class="mid"><a class="btn">合成</a></div><div class="right"><a class="btn">历练</a></div></div></div>';
		$('body').append(a);
		displayDetail(index);
	})


	function displayDetail(indexOfPokeBar) {
		if ($('.pokedetailcontainer').length < 1) {
			console.log("no window")
			alert("no window");
			return;
		}

		for (i in myInfor.pokemons.detail) {
			$('.pokedetailcontainer .element-' + (parseInt(i) + 2)).html('<img src=' + myInfor.pokemons.detail[i].pic_small + '>');
		}

		var Dt = myInfor.pokemons.detail[indexOfPokeBar];
		//	console.log(Dt);
		$('.pokedetailcontainer p.name').html(Dt.name)
		$('.pokedetailcontainer p.intername').html(Dt.name)
		$('.pokedetailcontainer p.lv').html(Dt.level)
		var s = "";

		for (j in Dt.type) {
			s += '<img  src="battleSystem/type/' + Dt.type[j].toLowerCase() + '.bmp" />';

		}

		$('.pokedetailcontainer .type').html(s);
		$('.pokedetailcontainer .nature').html("--")
		$('.pokedetailcontainer .bigpic').attr("src", Dt.pic_front)
		if (Dt.shiny)
			$('.pokedetailcontainer .shiny').show();
		else
			$('.pokedetailcontainer .shiny').hide();


		var sks = Dt.moves;


		for (i in sks) {
			$(".skill:eq(" + i + ")").html(sks[i].name);
		}


		var pokeChart = document.getElementById("pokemonChart").getContext("2d");
		var Mstate = [];

		for (i in Dt.state) {
			//alert(Dt.state[i]);
			Mstate.push(Dt.state[i]);
		}
		var MIv = [];

		for (i in Dt.IV) {
			//alert(Dt.state[i]);
			MIv.push(Dt.IV[i] * 10);
		}



		var data = {
			labels: ["血量", "攻击", "防御", "特功", "特防", "速度"],
			datasets: [
				{
					fillColor: "rgba(220,220,220,0.5)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					data: Mstate
		},
				{
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					data: MIv
		}
	]
		}
		var myRadarChart = new Chart(pokeChart).Radar(data, ChartOptions);

	}









	var ChartOptions = {

		//Boolean - If we show the scale above the chart data			
		scaleOverlay: false,

		//Boolean - If we want to override with a hard coded scale
		scaleOverride: false,

		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps: 1,
		//Number - The value jump in the hard coded scale
		scaleStepWidth: 350,
		//Number - The centre starting value
		scaleStartValue: 0,

		//Boolean - Whether to show lines for each scale point
		scaleShowLine: true,

		//String - Colour of the scale line	
		scaleLineColor: "#ecf0f1",

		//Number - Pixel width of the scale line	
		scaleLineWidth: 0.5,

		//Boolean - Whether to show labels on the scale	
		scaleShowLabels: false,

		//Interpolated JS string - can access value
		scaleLabel: "<%=value%>",

		//String - Scale label font declaration for the scale label
		scaleFontFamily: "'Arial'",

		//Number - Scale label font size in pixels	
		scaleFontSize: 12,

		//String - Scale label font weight style	
		scaleFontStyle: "normal",

		//String - Scale label font colour	
		scaleFontColor: "#666",

		//Boolean - Show a backdrop to the scale label
		scaleShowLabelBackdrop: true,

		//String - The colour of the label backdrop	
		scaleBackdropColor: "rgba(255,255,255,0.75)",

		//Number - The backdrop padding above & below the label in pixels
		scaleBackdropPaddingY: 2,

		//Number - The backdrop padding to the side of the label in pixels	
		scaleBackdropPaddingX: 2,

		//Boolean - Whether we show the angle lines out of the radar
		angleShowLineOut: true,

		//String - Colour of the angle line
		angleLineColor: "#f39c12",

		//Number - Pixel width of the angle line
		angleLineWidth: 1,

		//String - Point label font declaration
		pointLabelFontFamily: "'Arial'",

		//String - Point label font weight
		pointLabelFontStyle: "normal",

		//Number - Point label font size in pixels	
		pointLabelFontSize: 12,

		//String - Point label font colour	
		pointLabelFontColor: "#2ecc71",

		//Boolean - Whether to show a dot for each point
		pointDot: true,

		//Number - Radius of each point dot in pixels
		pointDotRadius: 3,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth: 1,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke: true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth: 2,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill: true,

		//Boolean - Whether to animate the chart
		animation: false,

		//Number - Number of animation steps
		animationSteps: 60,

		//String - Animation easing effect
		animationEasing: "easeOutQuart",

		//Function - Fires when the animation is complete
		onAnimationComplete: function () {
			$("#pokemonChart").width("300px");
			$("#pokemonChart").height("160px");
		}

	}


	$('body').on("click", ".pokedetailcontainer .left", function () {
		//alert(currentPokeInbar)



		$('.pokedetailcontainer .pokemonslist .element:eq(' + currentPokeInbar + ')').addClass("switch")




	})

	$('body').on("click", ".pokedetailcontainer .pokemonslist .element", function () {
		
		var i = $(this).index()
		if (i >= myInfor.pokemons.index.length)
		{
			
			return;
		}
			
		var changeP = false;
		$(".pokemonslist .element").each(function () {
			if ($(this).hasClass("switch")) {
				changeP = true;
			}

		})

		if (changeP & myInfor.pokemons.index[i]!= null ) {

			try{
			var tmp = {

				dex: myInfor.pokemons.index[i],
				detail: myInfor.pokemons.detail[i]
			}

			myInfor.pokemons.index[i] = myInfor.pokemons.index[currentPokeInbar];
			myInfor.pokemons.detail[i] = myInfor.pokemons.detail[currentPokeInbar];

			myInfor.pokemons.index[currentPokeInbar] = tmp.dex;
			myInfor.pokemons.detail[currentPokeInbar] = tmp.detail;
				
		
			for (i in myInfor.pokemons.detail) {
				$('.pokedetailcontainer .element-' + (parseInt(i) + 2)).html('<img src=' + myInfor.pokemons.detail[i].pic_small + '>');
			}
			ShowPokemonsToolbar();
			$('.pokedetailcontainer .pokemonslist .element:eq(' + currentPokeInbar + ')').removeClass("switch")
			}
			catch(err){}
		} else {
			currentPokeInbar = i;
			displayDetail(i)
		}
	})


}
DetailUI();