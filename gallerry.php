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
					<th><a href="gallerry.php">GALLERY</a></th>
					<th>MY ARTS</th>
					<th><a class="blink" href="eksam.php">PAINTER</a></th>
					<th><a href="?logout=1">SIGN OUT</a></th>
				</table>
			</div>
			
		<br><!--SPACE BETWEEN HEAD MENU AND PAINTER -->
		
<h2>Upload picture</h2>
<form method="POST" >
	
	<label>Picture url</label><br>
	<input class="holder" name="picturl" type="text">
	
	<br><br>
	
	<label>Picture name</label><br>
	<input class="holder" name="pictname" type="text">
	
	<br><br>
	
	<input name="pagebutton" type="submit" value="Save">
	<br><br>

</form>

<h2>Pictures</h2>

<?php

	$html = "<table class=table1>";
		
		$html .= "<tr>";

			$html .= "<th>Picture</th>";
			$html .= "<th>Picture name</th>";
			$html .= "<th>Picture creator</th>";

		$html .= "</tr>";
		
		// iga liikme kohta massiivis
		foreach ($people as $p) {
		
		$html .= "<tr>";
			$html .= "<td><img width='800' height='500' src='".$p->picturl."'/></td>";
			$html .= "<td>".$p->pictname."</td>";
			$html .= "<td>".$p->email."</td>";
		$html .= "</tr>";
		
		}
	
	$html .= "</table>";
	echo $html;


?>

  			
	
  		<!--FOOTER PAGE TEXT-->
		<h1 class="downtext">Page was made by Kirill Kotkas and Ksenia Belorusskaja</h1>
		<br>
		
		</section>
  	
  		<script src="script.js"></script>
  	
	</body>
</html>