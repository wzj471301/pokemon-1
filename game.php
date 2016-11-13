<?php session_start(); ?>


<!DOCTYPE html>
<html xmlns="http://ww.w3.org/1999/xhtml">
<html>

<head>

	<title>Bootstrap 3</title>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="UIs/PokeDetail/PokemonDetail.css">
	<link rel="stylesheet" href="UIs/circularmenu/circularMenu.css">
     <link rel="stylesheet" href="UIs/General/GeneralPop.css">
    <link rel="stylesheet" href="UIs/Trade/TradeSys.css">
	<link rel="stylesheet" href="UIs/Chat/chatBubbles.css">
	<link rel="stylesheet" href="bootstrap-3.1.1-dist/css/bootstrap.min.css">
	<script src="jquery-1.11.0.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=Exo' rel='stylesheet' type='text/css'>
	<style>
		* {
			font-family: 'Exo', sans-serif;
			margin:0 auto;
			text-align: center;
			position: relative;
		}
		#canvasmain {
            
			left: calc(50% - 320px);
			top: 0px;
			position: absolute;
			border: 1px solid blue;
			width: 640px;
			height: 640px;
		}
		#IGUI {
			left: calc(50% - 320px);
			top: 0px;
			position: absolute;
			border: 1px solid blue;
			width: 640px;
			height: 640px;
		}
		#IGUI * {
			z-index: 99;
		}
		#IGUI #pokemonToolBar {
			position: absolute;
			padding: 10px;
			width: 50px;
			min-height: 220px;
			top: 100px;
			background: white;
			filter: alpha(opacity=75);
			-moz-opacity: 0.7;
			opacity: 0.7;
			border: 1px solid black;
		}
		#IGUI #pokemonToolBar .pokeIcon:hover img {
			border-top: 1px solid black;
			border-bottom: 1px solid black;
		}
		#pokedexToolbar {
			position: absolute;
			width: 200px;
			right: 0px;
		}
		#pokeDexContainer {
			width: 200px;
			height: 300px;
			display: none;
			filter: alpha(opacity=70);
			-moz-opacity: 0.7;
			opacity: 0.7;
			overflow: scroll;
		}
		#PokePopover {
            position:absolute;
            left:50px;
			width: 200px;
			height: 200px;
			//filter: alpha(opacity=80);
			-moz-opacity: 0.8;
			opacity: 0.8;
			background: white;
		}
		#gameChatBar {
			position: absolute;
			bottom: -25px;
			height: 200px;
			width: 240px;
			filter: alpha(opacity=50);
			-moz-opacity: 0.5;
			opacity: 0.5;
		}
		.tab-content #chatConsole {
			height: 100px;
			overflow: scroll;
		}
		#debug {
			position: absolute;
			top: 0px;
			right: 0px;
			width: 200px;
			border: 1px solid black;
			z-index: 99;
		}
		#msg-box {
			position: absolute;
			width: 500px;
			height: 80px;
			top: 300px;
			left: 20%;
			border: 10px solid black;
			background: white;
		}
		#msg-box-choose {
			background: white;
			position: absolute;
			margin: auto;
			top: 350px;
			left: 20%;
			min-height: 20px;
			width: 360px;
			border: black 10px solid;
			size: 10px;
		}
		#msg-box-choose .choose {
			display: block;
			font-size: 20px;
			text-decoration: none;
		}
		#battleSystemDiv {
			//text-align: center;
			margin: auto;
		}
		#allPlayer {
			padding: 5px;
			position: absolute;
			left: 0px;
			top: 0px;
			background: white;
			filter: alpha(opacity=80);
			-moz-opacity: 0.8;
			opacity: 0.8;
		}
		.timebar-border {
			border-bottom: solid green 2px;
			position: relative;
			top: 50px;
			left: -88px;
			width: 300px;
			z-index: 99;
		}
		.timebar-content {
			position: absolute;
			top: 0px;
			padding: 10px 0px 10px 0px;
			background: #EBB658;
		}
		.timebar-icon {
			position: absolute;
			//	border-left: black solid 2px;

		}
		.timebar-icon img {} .ally {
			top: -31px;
		}
		.enemy {
			top: 0px;
		}
		#canvasB {
			position: absolute;
			left: 0px;
		}
		#battle-wrapper {
			width: 100%;
			height: 400px;
			position: absolute;
			top: 20px;
			//	border: solid 1px green;

		}
		#battle-scene {
			position: relative;
			width: 500px;
			height: 400px;
			//		background: url(battlebackground/normal.png);
			background-size: cover;
			//	 border: solid 1px black;

		}
		img {
			// border:1px solid black;

		}
		.allyPic {
			position: absolute;
			left: 5%;
			;
			bottom: 5%;
			width: 20%;
		}
		.enemyPic {
			position: absolute;
			left: 60%;
			bottom: 42%;
		}
		.Pokemon_container * {
			//	 border:solid 1px black;

		}
		.Pokemon_container {
			width: 180px;
			//    border:solid 1px black;

		}
		.Pokemon_container .progress {
			height: 10px;
		}
		.picContainer {
			position: relative;
			//text-align: center;
			height: 100px;
		}
		.picContainer img {
			position: absolute;
			bottom: 0px;
			//text-align: center;
			left: 30%;
		}
		.allyPic .picContainer img {} #control-wapper {
			width: 100%;
			height: 164px;
			position: absolute;
			margin: auto;
			top: 420px;
			//	border: solid 1px red;

		}
		#control-main {
			width: 500px;
			height: 164px;
			box-shadow: 2px 2px 3px #aaaaaa;
		}
		#control-main * {
			margin: 0 0 0 0;
		}
		#control_left .icons:hover {
			box-shadow: 2px 2px 2px rgba(50, 50, 50, 0.75), -2px -2px 2px rgba(50, 50, 50, 0.75);
		}
		#control_left .debuff img {
			width: 32px;
			height: 8px;
		}
		.iconshp {
			height: 5px;
			width: 32px;
		}
		.iconshp div {
			background: green;
		}
		#control_right > div {
			height: 58px;
		}
		#battleReport {
			position: absolute;
			right: 0px;
			bottom: 0px;
			height: 150px;
			width: 200px;
			//	border: 1px solid black;
			text-align: left;
			overflow: scroll;
			z-index: 999;
		}
	
		
	</style>

</head>

<body>





	<div class="btn btn-primary" id="gameStart">Gamestart</div>

	<div class="progress" id="loadProgress">
		<div class="progress-bar" id="loadjs" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
			0%
		</div>
	</div>


	<?php echo time(); ?>
	<?php echo 2; ?>
	<?php echo 8; ?>
	
</body>
    
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
<script src="socketClient.js"></script>


<script src="bootstrap-3.1.1-dist/js/bootstrap.min.js"></script>
<script src="Jyo.js"></script>
<script src="main.js"></script>





<script>
	var myInfor;
	var play, ctxmain, map, Game;
	var gameUser = <?php if (isset($_SESSION['user'])) echo '"'.$_SESSION['IGN'].'"'; else echo '""' ?> ;

	var allyTeam = {
		onbattle: "",
		team: []
	};
	var enemyTeam = {
		onbattle: "",
		team: []
	};
	var BT;
	var myaudio;
	var battleFieldImg;
	var videoSystem;
</script>

</html>
	<!--
<div class="pokedetailcontainer ">
    <div class="maininfo ">
      <div class="namepanel clearfix">
        <p class="name">超级烈焰马</p>
      </div>
      <div class="introbackground ">
        <p class="text text-1">种族名</p>
        <p class="intername">烈焰马</p>
        <p class="text text-2">Lv</p>
        <p class="lv">100</p>
        <p class="text text-3">性别</p>
        <p class="sex">♂</p>
        <p class="text text-4">属性</p>
        <div class="type">
          <img class="image image-1" src="battleSystem/type/dark.bmp">
          <img class="image image-2" src="battleSystem/type/fire.bmp">
        </div>
        <p class="text text-5">性格</p>
        <p class="nature">顽强</p>
        <p class="text text-6">OT</p>
        <p class="ot">辣条皇</p>
      </div>
    </div>
    <div class="chart">
		<canvas id="pokemonChart" ></canvas>
		</div>
    <div class="close"></div>
    <div class="mainpic ">
      <img class="bigpic" src="battleSystem/Battlers/009_1.gif">
      <img class="shiny" src="battleSystem/shinystar.png">
    </div>
    <div class="mainpoke ">
      <div class="hp"></div>
      <div class="element"></div>
      <div class="skill skill-1"></div>
      <div class="skill skill-2"></div>
      <div class="skill skill-3"></div>
      <div class="skill skill-4"></div>
      <div class="exp"></div>
    </div>
    <div class="itemhold ">
      <div class="item"></div>
    </div>
    <div class="pokemonslist ">
      <div class="element element-2"></div>
      <div class="element element-3"></div>
      <div class="element element-4"></div>
      <div class="element element-5"></div>
      <div class="element element-6"></div>
      <div class="element element-7"></div>
    </div>
    <div class="pokemonscontrol ">
      <div class="left"></div>
      <div class="mid"></div>
      <div class="right"></div>
    </div>
  </div>
-->