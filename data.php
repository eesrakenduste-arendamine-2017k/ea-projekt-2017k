<?php 
	//ühendan sessiooniga
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
	
	

	

	
?>
		<center>
			<style>	
		body {
			background-image:	url("http://www.astro.spbu.ru/staff/afk/Teaching/Seminars/XimFak/bg/Fon5.gif");
			background-repeat: repeat;
			background-position: center top;
			background-attachment: fixed;
			}
		</style>
<h1>Data</h1>

<p>
	Tere tulemast <?=$_SESSION["userEmail"];?>!
	<a href="?logout=1">logi välja</a>
</p>

<h2>Salvesta sündmus</h2>
<form method="POST" >
	
	<label>Nimi</label><br>
	<input name="nimi" type="text">
	
	<br><br>
	
	<label>Perekonnanimi</label><br>
	<input name="pnimi" type="text">
	
	<br><br>
	<label>Vanus</label><br>
	<input name="vanus" type="text">
	

	<br><br>
	<label>Text</label><br>
	<input name="text" type="text">
	
	<br><br>
	
	<input type="submit" value="Salvesta">

</form>

<h2>Arhiiv</h2>

<?php

	$html = "<table>";
		
		$html .= "<tr>";
			$html .= "<td>ID</td>";
			$html .= "<th>Nimi</th>";
			$html .= "<th>Perekonnanimi</th>";
			$html .= "<th>Vanus</th>";
			$html .= "<th>Text</th>";
		$html .= "</tr>";
		
		// iga liikme kohta massiivis
		foreach ($people as $p) {
		
		$html .= "<tr>";
			$html .= "<td>".$p->id."</td>";
			$html .= "<td>".$p->nimi."</td>";
			$html .= "<td>".$p->pnimi."</td>";
			$html .= "<td>".$p->vanus."</td>";
			$html .= "<td>".$p->text."</td>";
		$html .= "</tr>";
		
		}
	
	$html .= "</table>";
	echo $html;


?>

