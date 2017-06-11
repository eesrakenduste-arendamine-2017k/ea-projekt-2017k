<?php
	//uhendan sessiooniga
	require("functions.php");
	
	$people = getUserInfo();

	if (isset($_GET["logout"])) {
		
		session_destroy();
		
		header("Location: login.php");	
	}
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
<?php

	$html = "<table class='table1'>";
		
		$html .= "<tr>";
			$html .= "<th>Picture</th>";
			$html .= "<th>Picture name</th>";
			$html .= "<th>Picture creator</th>";
			$html .= "<th> *** </th>";
		$html .= "</tr>";
		
		// iga liikme kohta massiivis
		foreach ($people as $p) {
		
		$html .= "<tr>";
			$html .= "<td><img width='150' height='150' src='".$p->picturl."'/></td>";
			$html .= "<td>".$p->pictname."</td>";
			$html .= "<td>".$p->email."</td>";
			$html .= "<td><a href='delete.php?id=".$p->id."'>See full/Delete</a></td>";
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