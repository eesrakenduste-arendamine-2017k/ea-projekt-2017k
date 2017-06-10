<?php 
	
	
	require("functions.php");
	
	// kui on sisseloginud siis suunan data lehele
	if (isset($_SESSION["userId"])) {
		header("Location: eksam.php");
		exit();
	}
	
	//var_dump($_GET);
	
	//echo "<br>";
	
	//var_dump($_POST);
	
	//MUUTUJAD
	$signupEmailError = "*";
	$signupEmail = "";
	
	//kas keegi vajutas nuppu ja see on olemas
	
	if (isset ($_POST["signupEmail"])) {
		
		//on olemas
		// kas epost on tuhi
		if (empty ($_POST["signupEmail"])) {
			
			// on tuhi
			$signupEmailError = "* Vali on kohustuslik!";
			
		} else {
			// email on olemas ja oige
			$signupEmail = $_POST["signupEmail"];
			
		}
		
	} 
	
 
	
	
	$signupPasswordError = "*";
	
	if (isset ($_POST["signupPassword"])) {
		
		if (empty ($_POST["signupPassword"])) {
			
			$signupPasswordError = "* Vali on kohustuslik!";
			
		} else {
			
			// parool ei olnud tuhi
			
			if ( strlen($_POST["signupPassword"]) < 8 ) {
				
				$signupPasswordError = "* Parool peab olema vahemalt 8 tahemarkki pikk!";
				
			}
			
		}
		
		/* GENDER */
		
		if (!isset ($_POST["gender"])) {
			
			//error
		}else {
			// annad vaartuse
		}
		
	}
	
	//vaikimisi vaartus
	$gender = "";
	
	if (isset ($_POST["gender"])) {
		if (empty ($_POST["gender"])) {
			$genderError = "* Vali on kohustuslik!";
		} else {
			$gender = $_POST["gender"];
		}
		
	} 
	
	
	
	
	if ( $signupEmailError == "*" AND
		 $signupPasswordError == "*" &&
		 isset($_POST["signupPassword"]) 
	  ) {
		
		//vigu ei olnud, koik on olemas	
		echo "Salvestan...<br>";
		echo "email ".$signupEmail."<br>";
		echo "parool ".$_POST["signupPassword"]."<br>";
		
		$password = hash("sha512", $_POST["signupPassword"]);
		
		echo $password."<br>";
		
		signup($signupEmail, $password, $signupName, $signupNimi);
		
		
	}
	

?>
 <!DOCTYPE html>
  <html>
    
  	<head>
  	<link rel="stylesheet" type="text/css" href="style.css">
  	</head>
  
  	<body>
  		
  		<section>
		
		<header> <h1 class="headertext">P A I N T E R</h1> </header>
			<div class="menustyle">
				<table>
					<th>GO BACK</th>
					<th>MENU</th>
					<th>GALLERY</th>
				</table>
			</div>
		<br>
  		
		<h1>Loo kasutaja</h1>
		
		<form method="POST" >
			
			<label>E-post</label><br>
			<input name="signupEmail" type="email" value="<?=$signupEmail;?>"> <?php echo $signupEmailError; ?>
			
			<br><br>
			
			<label>Parool</label><br>
			<input name="signupPassword" type="password"> <?php echo $signupPasswordError; ?>
			
			<br><br>
			
			<input type="submit" value="Loo kasutaja">
			<p><a href="login.php"><-Tagasi</a></p>
		
		</form>
  			
			<br>

  		
		<h1 class="downtext">Page was made for university homework by Ksenia Belorusskaja</h1><br>
		
		</section>
  	
  		<script src="script.js"></script>
  	
	</body>
</html> 