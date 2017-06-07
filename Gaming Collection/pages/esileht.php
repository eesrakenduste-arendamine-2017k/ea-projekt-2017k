<?php

require("functions.php");

if (isset($_SESSION["userId"])) {
	header("Location: data.php");
}
$signupUsername = "";
$signupError = "";
$signupPasswordError = "";

if(isset($_POST["signupUsername"]) &&
	!empty($_POST["signupUsername"])) {
	$signupUsername = $_POST["signupUsername"];
} if(isset($_POST["signupUsername"]) &&
	empty($_POST["signupUsername"])) {
	$signupError = "Fields must be filled";
}

if(isset($_POST["signupPassword"]) &&
	!empty($_POST["signupPassword"])) {
	$signupPassword = $_POST["signupPassword"];
} if(isset($_POST["signupPassword"]) &&
	empty($_POST["signupPassword"])) {
	$signupError = "Field must be filled";
}

if(isset($_POST["signupPassword"])){
	if(empty($_POST["signupPassword"]))
	$signupError = "Fields must be filled";
	} if(isset($_POST["signupPassword"]) &&
	!empty($_POST["signupPassword"]) &&
	strlen($_POST["signupPassword"]) <8){
		$signupError = "";
		$signupPasswordError = "Password must be longer than 8 symbols";
}

$loginUsername = "";
$loginError = "";

if(isset($_POST["loginUsername"]) &&
	!empty($_POST["loginUsername"])) {
	$loginUsername = $_POST["loginUsername"];
} if(isset($_POST["loginUsername"]) &&
	empty($_POST["loginUsername"])) {
	$loginError = "Fields must be filled";
}

if(isset($_POST["loginPassword"]) &&
	!empty($_POST["loginPassword"])) {
	$loginPassword = $_POST["loginPassword"];
} if(isset($_POST["loginPassword"]) &&
	empty($_POST["loginPassword"])) {
	$loginError = "Fields must be filled";
}

if ($signupError == "" &&
	$signupPasswordError == "" &&
	isset($_POST["signupUsername"]) && 
	isset($_POST["signupPassword"])) {
		$password = hash("sha512", $_POST["signupPassword"]);
		echo "<script>alert('Success!');</script>";
		
		$User->signup($Helper->cleanInput($signupUsername),$Helper->cleanInput($password));
	}

$notice = "";
if ( isset($_POST["loginUsername"]) && 
		 isset($_POST["loginPassword"]) && 
		 !empty($_POST["loginUsername"]) &&
		 !empty($_POST["loginPassword"]) 
	) {
		
		$notice = $User->login($Helper->cleanInput($_POST["loginUsername"]),$Helper->cleanInput($_POST["loginPassword"]));
		
	}

?>
<?php require "../header.php"; ?>
<link rel="stylesheet" type="text/css" href="style.css">
<div class="container">
	<div class="col-md-2">
	<br>
		<form method="POST">
				<div class="input-group input-group-sm" style="width:100%">
					<div class="row">
						<input class="form-control" name="loginUsername" placeholder="Username" type="username" value="<?= $loginUsername; ?>">
					</div>
					
					<div class="row">
						<input class="form-control" name="loginPassword" placeholder="Password" type="password">
					</div>
					<?php
						echo $loginError;
						echo $notice;
					?>
					<br>
					
					<div class="row">
						<input class="btn btn-success btn-block" type="submit" value="Log in">
					</div>
				</div>
		</form>
		
		<br><br>
		
		<form method="POST">
				<div class="input-group input-group-sm" style="width:100%">
					<div class="row">
							<input class="form-control" name="signupUsername" placeholder="Username" type="username" value="<?=$signupUsername;?>">
					</div>
					
					<div class="row">
						<input class="form-control" name="signupPassword" placeholder="Password" type="password">
						<?php 
						echo $signupError;
						echo $signupPasswordError;
						?>
					</div>
					<br>
					
					<div class="row">
						<input class="btn btn-primary btn-block" type="submit" value="Sign up">
					</div>
				</div>
		</form>
	</div>
	
	<div class="col col-xs-offset-3">

		<p>
			<div class="col">
			Welcome to the database of your personal gaming collection! <br></br>
			Here we host a free to use database for you to add and subtract games from.
			
			</div>
			<br></br>
			<div class="col">
			<img src="http://www.wtfgamersonly.com/wp-content/uploads/2017/03/gaming.jpg" alt="Gaming" style="width:720px;height:420px;">
			</div>
		<p>
		</p>
	</div>
</div>
<?php require("../footer.php"); ?>