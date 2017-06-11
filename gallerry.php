<?php 
	//uhendan sessiooniga
	require("functions.php");
	
	//kui ei ole sisseloginud, suunan login lehele
	if (!isset($_SESSION["userId"])) {
		header("Location: login.php");
		exit();
	}
	
	
	//kas aadressireal on logout
	if (isset($_GET["logout"])) {
		
		session_destroy();
		
		header("Location: login.php");
		
	}
	
	
	if ( isset($_POST["picturl"]) && 
		 isset($_POST["pictname"]) &&
		 !empty($_POST["picturl"]) &&
		 !empty($_POST["pictname"]) 
	) {
		
		$picturl = cleanInput($_POST["picturl"]);
		
		$pictname = cleanInput($_POST["pictname"]);
		
		
		
		saveEvent(cleanInput($_POST["picturl"]), $pictname);
		
	}
	
	$people = getAllPeople();
	

	
?>
<!DOCTYPE html>
  <html>
    
  	<head>
  	<link rel="stylesheet" type="text/css" href="style.css">
  	</head>
  
  	<body>
  		
  		<section>
		
		<!--HEADER-->
		<header> <h1 class="headertext">P A I N T E R</h1> </header>
			<!--UNDER HEADER MENU -->
			<div class="menustyle">
				<table>
					<th>GO BACK</th>
					<th>GALLERRY</th>
					<th>MY ARTS</th>
					<th><p class="blink" href="FAQ.php">FAQ</p></th>
					<th><a href="?logout=1">SIGN OUT</a></th>
				</table>
			</div>
			
		<br><!--SPACE BETWEEN HEAD MENU AND PAINTER -->
		
<h2>Upload picture</h2>
<form method="POST" >
	
	<label>Picture url</label><br>
	<input name="picturl" type="text">
	
	<br><br>
	
	<label>Picture name</label><br>
	<input name="pictname" type="text">
	
	<br><br>
	
	<input type="submit" value="Save">

</form>

  			
	
  		<!--FOOTER PAGE TEXT-->
		<h1 class="downtext">Page was made by Kirill Kotkas and Ksenia Belorusskaja</h1>
		<br>
		
		</section>
  	
  		<script src="script.js"></script>
  	
	</body>
</html>