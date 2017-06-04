<?php
	//edit.php
	require("functions.php");	
	$email = $_SESSION["userEmail"];
	$gameID = "";
	$gameError = "";
	$selectionError = "";




	if (isset ($_POST["Media"]))
			{
		if (empty ($_POST["Media"])){
			$selectionError = "Field must be filled";}	
			}		
	
	if (isset ($_POST["Game"]))
		{
		if( empty ($_POST["Game"])){
			$gameError = "Field must be filled";}
		}


	if($gameError == ""  &&
		$selectionError == ""	&&
		isset($_POST["Game"]) &&
		isset($_POST["Media"]))
				{$game = $_POST["Game"];
					$selection = $_POST["Media"];

						if($selection == "Computer"){
							$data->deleteEntryComputer ($Helper->cleanInput($email), $Helper->cleanInput($game));}

								echo "<script>alert('Success!');</script>";
								
								header("Location: edit.php");}


	
?>
<?php require("../header.php"); ?>
<br><br>
<link rel="stylesheet" type="text/css" href="style.css">


<div class="container">
	<div class="col-md-2">
				<div class="row">
					<button type="button" class="btn btn-block" style="background-color:black; vertical-align: middle;"><a href="data.php"><font style="color:white">Back</font></a>
				</div>
				<br><br>
			<form method="POST">
			<div class="row">
				<select name="Media" class="form-control"> <?php echo $selectionError ?>
					<option value="None">Choose your platform</option>
					<option value="Computer" >Computer</option>
					<option value="Console">Console</option>
					<option value="Portable">Portable</option>
					<option value="Board">Board</option>
					<option value="Card">Card</option>
				</select>
			</div>

			<div class="input-group input-group-sm">
				<div class="row">
					<input class="form-control" name="Game" placeholder="Game" type="text"> 
				</div>
				<br>
				<div class="row">
					<input class="btn btn-success btn-block" type="submit" value="Delete">
				</div>
			</div>
		  
		</div>

	<div class="col col-xs-offset-3">

	<h1>Collection</h1>
	
	
<?php 
	
$view = $data->getAllDataComputer($email);

	$html = "<table class='table table-bordered'>";
	
		$html .= "<tr>";
			$html .= "<h3>Computer</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>


<?php 
	
$view = $data->getAllDataConsole($email);

	$html = "<table class='table table-bordered'>";
	
		$html .= "<tr>";
			$html .= "<h3>Console</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>

<?php 
	
$view = $data->getAllDataPortable($email);

	$html = "<table class='table table-bordered'>";
	
		$html .= "<tr>";
			$html .= "<h3>Portable</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>
<?php 
	
$view = $data->getAllDataBoard($email);

	$html = "<table class='table table-bordered'>";
	
		$html .= "<tr>";
			$html .= "<h3>Board Games</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>
<?php 
	
$view = $data->getAllDataCard($email);

	$html = "<table class='table table-bordered'>";
	
		$html .= "<tr>";
			$html .= "<h3>Card Games</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>

	</div>
</div>
  
 <?php require("../footer.php"); ?>