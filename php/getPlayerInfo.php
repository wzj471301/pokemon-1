<?php


session_start();
include "Db.php";

$user= $_POST['user'];


	
$Db= new Db("gameData");

 if($re=$Db->getOne('userName',$user)){
 		echo $re['data'];
 }

unset($Db);
?>