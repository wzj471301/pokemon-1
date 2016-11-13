<?php
Class Db {
	
public $mysql_server_name="localhost"; //数据库服务器名称
public $mysql_username="root"; // 连接数据库用户名
public $mysql_password=""; // 连接数据库密码
public $mysql_database="game"; // 数据库的名字
public $mysql_table; //数据库内
public $conn;
public $fields;

public function __construct($table){
	$this->mysql_table=$table;
	$this->conn= mysql_connect($this->mysql_server_name,$this->mysql_username,$this->mysql_password);
if (!$this->conn)
  {
	  
  die('Could not connect: ' . mysql_error());
  
  }
  mysql_select_db($this->mysql_database,$this->conn);
  
 }
 


	
//返回所有列
public function getAll($fieldQuery,$valueQuery)
{
	static $get;	
$sql= "SELECT * FROM `".$this->mysql_table."` WHERE `".$fieldQuery."` = '".$valueQuery."'";
$sql = mysql_query($sql)
or die('sql'.mysql_error());
	while($row = mysql_fetch_array($sql))
	{
		for($i=0;$i<count($row)/2;$i++)
		{
			$get=$get.$row[$i].",";
		}
		$get=$get."|||";
	}
	return $get;
	
}
//返回一列
public function getOne($fieldQuery,$valueQuery)
{
	static $get=false;
$sql= "SELECT * FROM `".$this->mysql_table."` WHERE `".$fieldQuery."` = '".$valueQuery."'";
$sql = mysql_query($sql)
or die('sql'.mysql_error());
	if($row = mysql_fetch_array($sql))
	{
		return $row;
	}
	return false;
}

//返回指定列（1-100）
public function getSome($count,$fieldQuery,$valueQuery)
{
	
	$sql= "SELECT ".$count." FROM `".$this->mysql_table."` WHERE `".$fieldQuery."` = '".$valueQuery."'";
$sql = mysql_query($sql)
or die('sql'.mysql_error());
	if($row = mysql_fetch_array($sql))
	{
		for($i=0;$i<count($row)/2;$i++)
		{
			$get=$get.$row[$i].",";
		}
	}
return $get;
}

//返回指定列 指定 字段
public function getOneWord($fieldQuery,$valueQuery,$fieldReturn)
{
	
		$sql= "SELECT ".$fieldReturn." FROM `".$this->mysql_table."` WHERE `".$fieldQuery."` = '".$valueQuery."'";
$sql = mysql_query($sql)
or die('sql'.mysql_error());
	if($row = mysql_fetch_array($sql))
	{
	 return $row[$fieldReturn];	
	}
return false;
}

//添加一列
public function add($fields,$values)
{
	
	
		$sql="INSERT INTO ".$this->mysql_table." (".$fields.") VALUES (".$values.")";
		if (!mysql_query($sql))
		{
			return false;
		}
		return true;
	
	
}

//修改
public function update($field,$value,$fieldQuery,$valueQuery)
{
		$sql="UPDATE ".$this->mysql_table." SET ".$field." = '".$value."' WHERE ".$fieldQuery." = '".$valueQuery."' ";
		if (!mysql_query($sql))
		{
			return mysql_error();
		}
		return true;
}
	
//删除
public function delete($fieldQuery,$valueQuery)
{
	$sql="DELETE FROM ".$this->mysql_table." WHERE ".$fieldQuery." = ' ".$valueQuery."' ";
	if (!mysql_query($sql))
		{
			return mysql_error();
		}
		return true;
}


}

?>