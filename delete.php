<?php
	//uhendan sessiooniga
	require("functions.php");
	
	$p = getsingleId($_GET["id"]);
	
	if(isset($_GET["delete"])){
		deleteart($_GET["id"]);
		header("Location: myprofile.php");
		exit();
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
		
		<img width="800" height="500" src="<?php echo $p->picturl;?>">
		
		<h1>Your image url: <br>
		<textarea style="font-size:20px" rows="3" cols="45"> <?php echo $p->picturl;?> </textarea>
		<br>
		<a href="?id=<?=$_GET["id"];?>&delete=true">Delete</a></h1>

</form>

  		<!--FOOTER PAGE TEXT-->
		<h1 class="downtext">Page was made by Kirill Kotkas and Ksenia Belorusskaja</h1>
		<br>
		
		</section>
  	
  		<script src="script.js"></script>

	</body>
</html>