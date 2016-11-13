<?php 
	
	var_dump($_FILES);
	$str = file_get_contents('php://input');
	
	$filename = md5(time()).'.jpg';
	$path ='upload/'.$filename;
	file_put_contents($path,$str);
	
	//$dir =   getcwd().'/'.$path;
	echo '<img src="'.$path.'">';
	
?>