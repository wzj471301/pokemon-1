
 allyTeam = {
	onbattle: "",
	team: []
};
 enemyTeam = {
	onbattle: "",
	team: []
};

 BT = new battleControl();     //控制战斗开始结束
  myaudio=document.getElementById("BGM");   //BGM
 battleFieldImg = new Image();              //战斗背景图片缓存
battleFieldImg.src = "battleSystem/battlebackground/normal.png";

 videoSystem = new battleAnmation(); //战斗动画系统

