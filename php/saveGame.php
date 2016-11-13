<?php

session_start();

include "Db.php";


$user= $_POST['user'];
$data= $_POST['data'];

$Db= new Db("gamedata");

 if ($re=$Db->getOne('userName',$user))
 {
	if ($Db->update('data',$data,'userName',$user))
 	echo ("update your information");
	 else
		 echo("cant update");
 }

else{
	if ($Db->add("userName, data","'".$user."', '".$data."'"))
		echo("createNew Info " );
	else{
		//echo ("fail to create new data");
	}
	
}
	
	

		


	


unset($Db);
?>