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
					<th><a href="myprofile.php">MY ARTS</th>
					<th><a class="blink" href="eksam.php">PAINTER</a></th>
					<th><a href="?logout=1">SIGN OUT</a></th>
				</table>
			</div>
			
		<br><!--SPACE BETWEEN HEAD MENU AND PAINTER -->
<h1 class="painterdraw">Welcome !</h1>
<h2 class="welcometext"><br> This page was made by Kirill Kotkas and Ksenia Belorusskaja
for univesity project.<br> Copyright to app painter by William Malone and VCR Games.<br><br>
</h2>
		
<h1 class="painterdraw">Upload your art</h1>
<form method="POST" >
	
	<label>Picture url</label><br>
	<input class="holder" name="picturl" type="url">
	
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

		$html .= "</tr>";
		
		// iga liikme kohta massiivis
		foreach ($people as $p) {
		
		$html .= "<tr>";
			$html .= "<td><img width='700px' height='400px' src='".$p->picturl."'/></td>";
			$html .= "<td>".$p->pictname."</td>";
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