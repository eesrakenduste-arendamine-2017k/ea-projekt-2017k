<?php 
	
	
	require("functions.php");
	
	// kui on sisseloginud siis suunan data lehele
	if (isset($_SESSION["userId"])) {
		header("Location: eksam.php");
		exit();
	}
	
	
	$notice = "";
	//kas kasutaja tahab sisse logida
	if ( isset($_POST["loginEmail"]) && 
		 isset($_POST["loginPassword"]) &&
		 !empty($_POST["loginEmail"]) &&
		 !empty($_POST["loginPassword"]) 
	) {
		
		$notice = login($_POST["loginEmail"], $_POST["loginPassword"]);
		
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
  		
				<h1>Logi sisse</h1>
		<p style="color:red;"><?=$notice;?></p>
		<form method="POST" >
			
			<label>E-post</label><br>
			<input name="loginEmail" type="email">
			
			<br><br>
			<label>Parool</label><br>
			<input name="loginPassword" type="password">
			
			<br><br>
			
			<input type="submit" value="Logi sisse">
			<p><a href="register.php">Loo kasutaja</a></p>
		
		</form>
  			
			<br>

  		
		<h1 class="downtext">Page was made for university homework by Ksenia Belorusskaja</h1><br>
		
		</section>
  	
  		<script src="script.js"></script>
  	
	</body>
</html> 
