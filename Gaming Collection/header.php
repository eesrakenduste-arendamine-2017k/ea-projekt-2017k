<!DOCTYPE html>
<?php
		if (isset($_GET["logout"])) {
		session_destroy();
		header("Location: esileht.php");
	}
?>
<html>
	<head>
	<title>Collection</title>
	<link rel="stylesheet" type="text/css" href="pages/style.css">
		
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
			<div style="background:linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.9));
				margin-top:0px;margin-bottom:20px;padding:11.25px">
				<div>
					<h2 style="text-align:center">
						<font style="font-family:verdana;font-weight:bold;color:white;font-size:30px">
							Personal Gaming Collection
						</font>
					<h2>
				</div>
				<div style="text-align:center">
					<button type="button" class="navButton" onclick="window.location.href='esileht.php'">HOME
					<button type="button" class="navButton" style="margin-left:40px" onclick="window.location.href='chat.php'">CHAT
				</div>
			</div>
	</head>
	<body style="background-color:#efefef;">