function BattleAnmation(){
	this.playing=false;
	
	
}


function BattleScript(){
	this.text="";
	this.choice=[];
	this.callback=null;
	
	
}
/*
	script=[
		"pokemon is level up",
		"pokemon is goona to study the skill @skill name",
		""
	
	]

*/
BattleScript.prototype={
	setcallback:function(fun){
	this.callback=fun()
},
	setScript:function(scripts){
	
	}
}








function BattleSys(){
    this.my_team=null;
    this.foe_team=null;
    this.onbattle_my=null;
    this.onbattle_foe=null;
    this.myselectedSkill="";
    this.foeselectedSkill="";
    this.turns=0;
}
BattleSys.prototype={
    setPokemon:function(my,foe){
        this.my_team=my;
        this.foe_team=foe;
        this.onbattle_my=this.my_team[0];
        this.onbattle_foe=this.foe_team[0];
    },
    gotobattle_my:function(){
        
        $('.battle_my').html('<img src=../../'+this.onbattle_my.pic_back+'>');
		$('.battle_my_statbar .name').html('<strong>'+this.onbattle_my.name+'<smaller>   lv:'+this.onbattle_my.level+'</smaller></strong>')
		$('.battle_my_statbar .hpvalue').html('<strong>'+this.onbattle_my.state['hp']+'/'+this.onbattle_my.tmpState['hp']+'</strong>')
		
		
        this.displaySkills();
    },
    gotobattle_foe:function(){
        
        $('.battle_foe').html('<img src=../../'+this.onbattle_foe.pic_front+'>')
		$('.battle_foe_statbar .name').html('<strong>'+this.onbattle_foe.name+'<smaller>   lv:'+this.onbattle_foe.level+'</smaller></strong>')
    },
    displaySkills:function(){
        htm="";
        
        for (i in this.onbattle_my.moves)
        {
            sk= this.onbattle_my.moves[i];
            htm+='<div class="type-'+sk.type+'"><div class="up"><p class="skillname">'+sk.name+'</p></div><div class="down"><div class="typename">'+sk.type+'</div><div class="pp">'+sk.ppNow+'/'+sk.ppMax+'</div></div></div>';
            $('.skillbox').html(htm);
        }
    },
    setallPokemonBar:function(){  //可出场的六只精灵显示出来
        htm="";
        for (i in this.my_team)
        {
            htm+='<div class="switchpokemon"><img class="pkicon" src="../../'+this.my_team[i].pic_small+'"><div class="pkname">'+this.my_team[i].name+'</div><div class="small_hpbar"><div class="small_hp"></div></div></div>'
        }
        $('.battle_control_switch').html(htm);
    },
    changebattlePokemon:function(index){
		this.onbattle_my = this.my_team[index];
		this.gotobattle_my();
        
    },
    
    
	
	mainLoop:function(){
		
	}
}


















myteam=[];
foeteam=[];



for (var i=0; i<6; i++)
{
    var a = new pokemon();
    a.makeNewByDex(random(1,493));
    myteam.push(a);
    var b = new pokemon();
    b.makeNewByDex(random(1,493));
    foeteam.push(b);

}
console.log(myteam);
var bs =new BattleSys()
bs.setPokemon(myteam,foeteam)
bs.gotobattle_my();
bs.gotobattle_foe();
bs.setallPokemonBar();
    console.log(a);



$('.switchpokemon').on('click',function(){
	var index = $(this).index();
	bs.changebattlePokemon(index)
})