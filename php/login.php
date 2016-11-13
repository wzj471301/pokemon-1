<?php

session_start();

include "Db.php";


$user= $_POST['userName'];
$password= md5($_POST['password']);
$Db= new Db("logInfo");

 if($re=$Db->getOne('userName',$user)){
	
	if ($password==$re['password'])
	{
			echo ("登陆成功".$re['IGN']);
				$_SESSION['user']=$user;
				$_SESSION['IGN']=$re['IGN'];
				
	}	
else{
	echo "密码不正确";
	}
 }
else{
		echo "用户名不存在";

}

		


	


unset($Db);
?>