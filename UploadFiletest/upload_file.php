<?php
	

  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    }
  else
    {
	 // var_dump ($_FILES["file"]);
	  
	 // echo file_get_contents($_FILES["file"]["tmp_name"]);
  //  echo "Upload: " . $_FILES["file"]["name"] . "<br />";
  //  echo "Type: " . $_FILES["file"]["type"] . "<br />";
  //  echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
  //  echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

    if (file_exists("upload/" . $_FILES["file"]["name"]))
      {
   //   echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" .md5(time()). $_FILES["file"]["name"]);
  //    echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
		$path = "upload/" .md5(time()). $_FILES["file"]["name"];
		 echo '<img width="250"  src="'.$path.'">';
      }
    }
  

?>