<?php

	require("functions.php");

	require("Helper.class.php");
	$Helper = new Helper();

	require ("user.class.php");
	$User = new User($mysqli);

	//kui kasutaja on sisse loginud, siis suuna index lehele
	if(isset ($_SESSION["userId"])) {
		header("Location: index.html");
		exit();

	}

$loginUsernameError = "";
	$loginUsername = "";

	if (isset ($_POST["loginUsername"])) {

		// oli olemas, ehk keegi vajutas nuppu
		//kas oli tühi
		if (empty ($_POST["loginUsername"])) {

			//oli tõesti tühi
			$loginUsernameError = "See väli on kohustuslik";

		} else {
			//kõik korras, kasutaja koht ei ole tühi ja on olemas
			$loginUsername = $_POST["loginUsername"];

		}

	}

$loginUsernameError = "";
	$loginUsername = "";

	if (isset ($_POST["loginUsername"])) {

		// oli olemas, ehk keegi vajutas nuppu
		//kas oli tühi
		if (empty ($_POST["loginUsername"])) {

			//oli tõesti tühi
			$loginEmailError = "See väli on kohustuslik";

		} else {
			//kõik korras, kasutaja koht ei ole tühi ja on olemas
			$loginEmail = $_POST["loginUsername"];

		}

	}

$loginPasswordError = "";
	$loginPassword = "";

	//kas on üldse olemas
	if (isset ($_POST["loginPassword"])) {

		// oli olemas, ehk keegi vajutas nuppu
		//kas oli tühi
		if (empty ($_POST["loginPassword"])) {

			//oli tõesti tühi
			$loginPasswordError = "See väli on kohustuslik";

		} else {

			//oli midagi, ei olnud tühi

			// kas pikkus vähemalt 4
			if (strlen ($_POST["loginPassword"]) < 8 ) {

				$loginPasswordError = "Parool peab olema vähemalt 8 tm pikk!";
			}
		}
	}

$signupUsernameError = "";
	$signupUsername = "";

	if (isset ($_POST["signupUsername"])) {

		// oli olemas, ehk keegi vajutas nuppu
		//kas oli tühi
		if (empty ($_POST["signupUsername"])) {

			//oli tõesti tühi
			$signupUsernameError = "See väli on kohustuslik";

		} else {
			//kõik korras, kasutaja koht ei ole tühi ja on olemas
			$signupUsername = $_POST["signupUsername"];

		}

	}

$signupEmailError = "";
	$signupEmail = "";

	if (isset ($_POST["signupEmail"])) {

		// oli olemas, ehk keegi vajutas nuppu
		//kas oli tühi
		if (empty ($_POST["signupEmail"])) {

			//oli tõesti tühi
			$signupEmailError = "See väli on kohustuslik";

		} else {
			//kõik korras, kasutaja koht ei ole tühi ja on olemas
			$signupEmail = $_POST["signupEmail"];

		}

	}

$signupPasswordError = "";


	//kas on üldse olemas
	if (isset ($_POST["signupPassword"])) {

		// oli olemas, ehk keegi vajutas nuppu
		//kas oli tühi
		if (empty ($_POST["signupPassword"])) {

			//oli tõesti tühi
			$signupPasswordError = "See väli on kohustuslik";

		} else {

			//oli midagi, ei olnud tühi

			// kas pikkus vähemalt 4
			// kuna kassas on kõigil oma 4-kohaline kood, võiks seda sama kasutada, et ei oleks liiga palju uusi paroole
			if (strlen ($_POST["signupPassword"]) < 8 ) {

				$signupPasswordError = "Parool peab olema vähemalt 8 tm pikk!";
			}
		}
	}


	if (isset($_POST["signupUsername"]) &&
			isset($_POST["signupEmail"]) &&
		 	isset($_POST["signupPassword"]) &&
		 	$signupUsernameError == "" &&
		 	$signupEmailError == "" &&
		 	empty($signupPasswordError)
		) {

			// ühtegi viga ei ole, kõik vajalik olemas

			echo "salvestan...<br>";

			$password = hash("sha512", $_POST["signupPassword"]);

			//kutsun funktsiooni, et salvestada
			$User->signup($signupUsername, $signupEmail, $password);

	}

	$notice = "";
	//mõlemad login vormi väljad on täidetud
	if (	isset($_POST["loginUsername"]) &&
				isset($_POST["loginPassword"]) &&
				!empty($_POST["loginUsername"]) &&
				!empty($_POST["loginPassword"])
	) {

			$notice = $User->login($_POST["loginUsername"], $_POST["loginPassword"]);

			if(isset($notice->success)){
 				header("Location: index.html");
 				exit();
 			}else {
 				$notice = $notice->error;
 				var_dump($notice->error);
 			}
	}

?>
<?php require("header.php"); ?>
	<!--<div class="container">
	<div class="row">-->

<!DOCTYPE html>
<html>
	<head>
	<style>
	body {
		background-color: #DFDFE3;
	}
	input[type="submit"] {
		padding: 12px 20px;
		margin: 8px 0;
		box-sizing: border-box;
		border: none;
		background-color: #F08080;
		color: white;
		font-family: 'Lato', sans-serif;
		font-size: 16px;
	}

	input {
		padding: 12px 20px;
		margin: 8px 0;
		box-sizing: border-box;
		border: none;
		border-bottom: 2px solid LightBlue;
		text-align: center;
		font-family: 'Lato', sans-serif;
		font-size: 16px;
	}
		<title>Sisselogimise leht</title>
	</style>
	</head>
	<body>
		<h1 style="text-align:center; font-family:'Courier New', Courier, monospace;">Logi sisse</h1>


		<form method="POST" style="text-align:center;">

			<input placeholder="Kasutaja" name="loginUsername" type="text" value="<?php echo $loginUsername; ?>">  <?php echo $loginUsernameError; ?>

			<br><br>

			<input placeholder="Parool" name="loginPassword" type="password">  <?php echo $loginPasswordError; ?>


			<br><br>

			<input type="submit">

		</form>

		</p>
	</body>
</html>
<html>
	<body>
	<br><br><br><br>
		<h1 style="text-align:center; font-family:'Courier New', Courier, monospace;">Loo kasutaja</h1>


		<form method="POST" style="text-align:center;">
			<input placeholder="Eesnimi" name="Firstname" type="text">
			<br><br>

			<input placeholder="Perekonnanimi" name="Lastname" type="text">
			<br><br>

			<input placeholder="Kasutajanimi" type="text" name="signupUsername" value="<?php echo $signupUsername; ?>">  <?php echo $signupUsernameError; ?>
			<br><br>
			<input placeholder="Email" type="email" name="signupEmail" value="<?php echo $signupEmail; ?>">  <?php echo $signupEmailError; ?>
			<br><br>
			<input placeholder="Parool" type="password" name="signupPassword"> <?=$signupPasswordError;?>

			<br><br>

				<input type="submit" value="Loo kasutaja">

		</form>

	</body>
</html>
