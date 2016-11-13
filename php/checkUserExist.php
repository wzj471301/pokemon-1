<?php


include "Db.php";

$user= $_POST['userName'];
$type =$_POST['type'];



	$Db= new Db("logInfo");
	
if ($type=="userName")
{
	$re = $Db->getOneWord('userName',$user,'id');
	echo $re;
}
else
	{
	$re = $Db->getOneWord('IGN',$user,'id');
	echo $re;
	}


unset($Db);



?>