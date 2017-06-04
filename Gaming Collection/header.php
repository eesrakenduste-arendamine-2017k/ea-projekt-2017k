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
		
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	<header style="
		top:0;
		width:100%;
		z-index:1000
	">
			<div class="row page-header" style="background-color:#000000;height:75px;top:0">
				<div class="col-xs-offset-1 col-xs-4">
						<h2>
							<font style="font-family:verdana;font-weight:bold;color:white">
								Personal Gaming Collection
							</font>
						<h2>
				</div>
				
				<div class="col-xs-offset-4 col-xs-2">
					<nav class="navbar-header" style="background-color:black;height:74px;padding:21px">
						<div class="container-fluid" style="background-color:black">
							<div class="navbar-header">	

						</div>
					</nav
			</div>
	</header>
	</head>
	<body style="
		background-color:#efefef;
	">