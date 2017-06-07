<?php require "../header.php"; ?>
<html>
<head>
	<title>Ussim�ng</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="kujundus.css">
	<script type="text/javascript" src="ussimang.js"></script>
</head>
<body>
	<section>
		<canvas id="paber" width="480" height="480" style="
			margin-bottom: 0px;
			padding-bottom: 0px;
			border: solid;
			border-radius:5px;
			background-image: url('snek.jpg');
			transition: 2.5s;
		"></canvas>
		
		<h2>Score: <span id="score"></span></h2>
		<p id="instructions">M�ngu alustamiseks vajuta "Start Game" nupule</p>
		<button id="startBtn" type="button">Start Game</button>
	</section>
</body>

</html>