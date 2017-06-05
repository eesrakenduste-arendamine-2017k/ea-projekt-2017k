<?php

	require("config.php");

	// functions.php
	session_start();

	/* ÜHENDUS */
	$database = "if16_elleivan";
	$mysqli = new mysqli($serverHost, $serverUsername, $serverPassword, $database);

?>
