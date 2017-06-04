<?php
require ("functions.php");
require ("../header.php");
if (!isset($_SESSION["userId"])) {
	header("Location: esileht.php");}


	$email = $_SESSION["userEmail"];
	$messageError = "";
	$post = 1;
	$deleted = 1;


	if (isset ($_POST["message"]))
		{
		if(empty($_POST["message"])){
			$messageError = "Field must be filled";}
		}

	if (isset ($_POST["message"]))
		{
		if(strlen($_POST["message"])>300){
			$messageError = "Message too long, MAX 300";}
		}

	if(isset ($_POST["message"]) &&
		$messageError == ""){
		$date = date("Y-m-d h:i:sa");
		$message = $_POST["message"];
		if ($post == 1){
			$data->dataentryChatroom ($Helper->cleanInput($email), $Helper->cleanInput($message), $Helper->cleanInput($date));}
		}


?>

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
					<button type="button" class="btn btn-block" style="background-color:black; vertical-align: middle;" onclick="window.location.href='data.php'">
						<font style="color:white">Home</font>
				</div>
				<br>
			<?php } ?>
		<form method="POST">
			<div class="input-group input-group-sm">
				<div class="row" id = "ChatBoxEntry" style = "text-align: center;">
					<?php echo $email ?>
					<br><br>
					<textarea rows="4" cols="50" name = "message" id = "message" style = "color:Black;"></textarea> <?php echo $messageError ?>
				</div>
				<br>
				<div class="row">
					<input class="btn btn-success btn-block" type="submit" value="Submit" id = "Submit">
				</div>
			</div>
		</form>


<?php 
	
$view = $data->getAllDataChat();

	$html = "<table class='table table-bordered' id='consoleTable1' style='display:none'>";
	
		$html .= "<tr>";
			$html .= "<h3 id='consoleTable2' style='display:none'>Console</h3>";
			$html .= "<th>Username</th>";
			$html .= "<th>Message</th>";
			$html .= "<th>Posted</th>";
		$html .= "</tr>";
		
		foreach ($view as $v) {
			
			$html .= "<tr>";
				$html .= "<td id='consoleContent'>".$v->email."</td>";
				$html .= "<td>".$v->message."</td>";
				$html .= "<td>".$v->posted."</td>";
			$html .= "</tr>";
		}
		
	$html .= "</table>";
	
	echo $html;
	
?>