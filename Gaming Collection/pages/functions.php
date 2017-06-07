<?php 

	require("config.php");
	
	session_start();
	
	$database = "if16_krisv97";
	$mysqli = new mysqli($serverHost, $serverUsername, $serverPassword, $database);
	
	
	require("User.class.php");
	$User = new User($mysqli);
	require("data.class.php");
	$data = new data($mysqli);
	require("Helper.class.php");
	$Helper = new Helper($mysqli);
	

?>