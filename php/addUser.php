<?php

session_start();

include "Db.php";
$ip=$_SERVER["REMOTE_ADDR"]; 
$user= $_POST['userName'];
$ign =$_POST['IGN'];
$password= md5($_POST['password']);

	$Db= new Db("logInfo");


	if(!$Db->getOneWord('userName',$user,'id')){
		if($re=$Db->add("userName, password, IGN, ip","'".$user."', '".$password."', '".$ign."','".$ip."'")){
		$_SESSION['user']=$user;
		$_SESSION['IGN']=$ign ;
		
		echo "成功";
		}
		else{
			echo "注册失败,尝试换一个游戏名";
		}
		
	}
else{
		echo "用户名存在";
		}


unset($Db);
?>