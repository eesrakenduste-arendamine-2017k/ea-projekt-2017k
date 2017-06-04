<?php
require ("functions.php");
if (!isset($_SESSION["userId"])) {
	header("Location: esileht.php");
}
	$email = $_SESSION["userEmail"];
	$gameError = ""; 
	$amountError = "";
	$game = " ";
	$amount = " ";
	$selectionError = "";
	$selection = "";
	$displayComputer = 0;
	$displayConsole = 0;
	$displayPortable = 0;
	$displayBoard = 0;
	$displayCard = 0;
	$displaySum = 0;
	
if (isset ($_POST["Game"]))
		{
		if( empty ($_POST["Game"])){
			$gameError = "Field must be filled";}
		}
if (isset ($_POST["Amount"]))
		{
		if( empty ($_POST["Amount"])){
			$amountError = "Field must be filled";}
		}
if (isset ($_POST["Media"]))
			{
		if (empty ($_POST["Media"])){
			$selectionError = "Field must be filled";}	
			}		
	
		
if($gameError == ""  &&
	$amountError == ""	&&
	isset($_POST["Game"]) &&
	isset($_POST["Media"]) &&
	isset($_POST["Amount"]))
	{$game = $_POST["Game"];
		$amount = $_POST["Amount"];
			$selection = $_POST["Media"];
				if($selection == "Computer"){
					$data->dataentryComputer ($Helper->cleanInput($amount), $Helper->cleanInput($game), $Helper->cleanInput($email));}
									
				if($selection == "Console"){
					$data->dataentryConsole ($Helper->cleanInput($amount), $Helper->cleanInput($game), $Helper->cleanInput($email));}	
								
				if($selection == "Portable"){
					$data->dataentryPortable ($Helper->cleanInput($amount), $Helper->cleanInput($game), $Helper->cleanInput($email));}
									
				if($selection == "Board"){
					$data->dataentryBoard ($Helper->cleanInput($amount), $Helper->cleanInput($game), $Helper->cleanInput($email));}	
								
				if($selection == "Card"){
					$data->dataentryCard ($Helper->cleanInput($amount), $Helper->cleanInput($game), $Helper->cleanInput($email));}
					
					header("Location: data.php");}
	
 
$displayComputer = $data->getCountDataComputer($email);
$displayConsole = $data->getCountDataConsole($email);
$displayPortable = $data->getCountDataPortable($email);
$displayBoard = $data->getCountDataBoard($email);
$displayCard = $data->getCountDataCard($email);
$displaySum = $displayComputer + $displayConsole + $displayPortable + $displayBoard + $displayCard;
 ?>
 
 
 
 
 
 
 

<?php require ("../header.php"); ?>
<link rel="stylesheet" type="text/css" href="style.css">
<script type="text/javascript" src = "tables.js"></script>

<div class="container">
	<div class="col-md-2">
		<?php
			if (isset($_SESSION["userId"])) {?>
				<div class="row">
					<button type="button" class="btn btn-block" style="background-color:black" onclick="window.location.href='?logout=1'">
						<font style="color:white">Log out</font>
				</div>
				<br>
				<div class="row">
					<button type="button" class="btn btn-block" style="background-color:black; vertical-align: middle;" onclick="window.location.href='edit.php'">
						<font style="color:white">Edit</font>
				</div>
				<br>
				<div class="row">
					<button type="button" class="btn btn-block" style="background-color:black; vertical-align: middle;" onclick="window.location.href='chat.php'">
						<font style="color:white">Chat</font>
				</div>
				<br>
			<?php } ?>
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
			<div class="input-group input-group-sm" style="width:100%">
				<div class="row">
					<input class="form-control" name="Game" placeholder="Game" type="text"> <?php echo $gameError ?>
				</div>
				<div class="row">
					<input class="form-control" name="Amount" placeholder="Amount" type="number"> <?php echo $amountError ?>
				</div>
				<br>
				<div class="row">
					<input class="btn btn-success btn-block" type="submit" value="Submit" id = "Submit">
				</div>
			</div>
		</form>

		<br><br>
		
		<div class = "row" id = "counter" style ="Color:White; background-color: Black; border-style:dotted; text-align: center; font-weight:bold;"  >
			<p> Computer = <?php echo $displayComputer ?> </p>
			<p> Console = <?php echo $displayConsole ?> </p>
			<p> Portable = <?php echo $displayPortable ?> </p>
			<p> Board = <?php echo $displayBoard ?> </p>
			<p> Card = <?php echo $displayCard ?> </p>
			<p> SUM = <?php echo $displaySum ?> </p>
		</div>
		
	</div>
	
	<div class="col col-md-offset-3 col-xs-offset-0">

	<h1>Collection</h1>
	
	
<?php 
	
$view = $data->getAllDataComputer($email);

	$html = "<table class='table table-bordered' id='computerTable1' style='display:none'>";
	
		$html .= "<tr>";
			$html .= "<h3 id='computerTable2' style='display:none'>Computer</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td id='computerContent'>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>


<?php 
	
$view = $data->getAllDataConsole($email);

	$html = "<table class='table table-bordered' id='consoleTable1' style='display:none'>";
	
		$html .= "<tr>";
			$html .= "<h3 id='consoleTable2' style='display:none'>Console</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td id='consoleContent'>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>

<?php 
	
$view = $data->getAllDataPortable($email);

	$html = "<table class='table table-bordered' id='portableTable1' style='display:none'>";
	
		$html .= "<tr>";
			$html .= "<h3 id='portableTable2' style='display:none'>Portable</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td id='portableContent'>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>
<?php 
	
$view = $data->getAllDataBoard($email);

	$html = "<table class='table table-bordered' id='boardTable1' style='display:none'>";
	
		$html .= "<tr>";
			$html .= "<h3 id='boardTable2' style='display:none'>Board Games</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td id='boardContent'>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>
<?php 
	
$view = $data->getAllDataCard($email);

	$html = "<table class='table table-bordered' id='cardTable1' style='display:none'>";
	
		$html .= "<tr>";
			$html .= "<h3 id='cardTable2' style='display:none'>Card Games</h3>";
			$html .= "<th>Game</th>";
			$html .= "<th>Amount</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td id='cardContent'>".$v->game."</td>";
				$html .= "<td>".$v->amount."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>

	</div>
</div>
<?php require("../footer.php"); ?>