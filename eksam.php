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
					<th><a href="gallerry.php">GALLERRY</a></th>
					<th>MY ARTS</th>
					<th><a class="blink" href="eksam.php">FAQ</a></th>
					<th><a href="?logout=1">SIGN OUT</a></th>
				</table>
			</div>
			
		<br><!--SPACE BETWEEN HEAD MENU AND PAINTER -->
		
		<!--CANVAS FOR PAINTING IMAGE-->
		<h1 class="painterdraw">Draw your image</h1>
  			<canvas id="canvas" width="800" height="500"> </canvas>
  		
		<!--INSTRUMENTS FOR PAINTER-->
		<h1 class="painterdraw">Select items</h1>
  			<div id="drawingTools">
  				
				<!--tools fro painting-->
  				<div id="otherTools">
				<h1 class="pagetext">Tools<h1>
					<button id="brushSize1" onclick="changeBrushSize(1)">SMALL</button>
					<button id="brushSize1" onclick="changeBrushSize(4)">NORMAL</button> <!--DEFAULD-->
					<button id="brushSize2" onclick="changeBrushSize(10)">LARGE</button><!--BRUSH SIZE 10SIZE-->
					<button id="brushSize3" onclick="changeBrushSize(30)">HUGE</button><!--BRUSH SIZE 20SIZE-->
					<button id="fillCanvas" onclick="fillCanvas('')">FILL</button><!--FILLING ALL CANVAS-->
					<button class="eraser" id="Eraser" onclick="changeColor('white')">ERASER</button><!--WHITE COLOR AS ERASER-->
					<button class="clears" id="clearCanvas" onclick="clearCanvas()">CLEAR ALL</button> <!--CLEARS ALL-->
					<button class="saves" id="saveImage" onclick="saveImage()">SAVE</button> <!--SAVE IMAGE ON OWN PC-->
  				</div>
				
				<!--palette-->
				<div id="colors">
				<h1 class="pagetext">Palette</h1>
					<input type="image"  name="cassete" src="images/0black.png" alt="submit" onclick="changeColor('black')"/>
					<input type="image"  name="cassete" src="images/0grey.png" alt="submit" onclick="changeColor('#404040')"/>
					<input type="image"  name="cassete" src="images/1greybrown.png" alt="submit" onclick="changeColor('#818054')"/>
					<input type="image"  name="cassete" src="images/2grey.png" alt="submit" onclick="changeColor('#605F4B')"/>
					<input type="image"  name="cassete" src="images/2grey2brown.png" alt="submit" onclick="changeColor('#54301A')"/>
					<input type="image"  name="cassete" src="images/2grey2brown2.png" alt="submit" onclick="changeColor('#776003')"/>
					<input type="image"  name="cassete" src="images/2grey2brown22.png" alt="submit" onclick="changeColor('#B25B1D')"/>
					<input type="image"  name="cassete" src="images/3lime.png" alt="submit" onclick="changeColor('#BFC928')"/>
					<input type="image"  name="cassete" src="images/4green.png" alt="submit" onclick="changeColor('#8BC83F')"/>
					<input type="image"  name="cassete" src="images/5darkgreen.png" alt="submit" onclick="changeColor('#4E6F18')"/>
					<input type="image"  name="cassete" src="images/6waveblue.png" alt="submit" onclick="changeColor('#2BB1A6')"/>
					<input type="image"  name="cassete" src="images/7bluegreen.png" alt="submit" onclick="changeColor('#008B5C')"/>
					<input type="image"  name="cassete" src="images/8darkbluegreen.png" alt="submit" onclick="changeColor('#005A58')"/>					
					<input type="image"  name="cassete" src="images/10darkenblue.png" alt="submit" onclick="changeColor('#016893')"/>
					<input type="image"  name="cassete" src="images/11darkenblue.png" alt="submit" onclick="changeColor('#2F536B')"/>
					<input type="image"  name="cassete" src="images/12pink.png" alt="submit" onclick="changeColor('#C2749E')"/>
					<input type="image"  name="cassete" src="images/14cherrydarkpink.png" alt="submit" onclick="changeColor('#79133B')"/>
					<input type="image"  name="cassete" src="images/15pinkydark.png" alt="submit" onclick="changeColor('#C6254F')"/>
					<input type="image"  name="cassete" src="images/16pinkyred.png" alt="submit" onclick="changeColor('#EA2B3A')"/>					
					<input type="image"  name="cassete" src="images/17red.png" alt="submit" onclick="changeColor('#C02D1B')"/>
					<input type="image"  name="cassete" src="images/17red2wine.png" alt="submit" onclick="changeColor('#7B1200')"/>
					<input type="image"  name="cassete" src="images/18yellordark.png" alt="submit" onclick="changeColor('#C5960C')"/>				
					<input type="image"  name="cassete" src="images/19yellow.png" alt="submit" onclick="changeColor('#F2CB01')"/>
					<input type="image"  name="cassete" src="images/22skinyellow2.png" alt="submit" onclick="changeColor('#FFE292')"/>
				</div>
				<br>
  				
  			</div>
  			
	
  		<!--FOOTER PAGE TEXT-->
		<h1 class="downtext">Page was made by Kirill Kotkas and Ksenia Belorusskaja</h1>
		<br>
		
		</section>
  	
  		<script src="script.js"></script>
  	
	</body>
</html>