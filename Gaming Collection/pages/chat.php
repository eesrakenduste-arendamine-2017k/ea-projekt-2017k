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

<div id="animatePage">
	<div style="display:block">
		<form method="POST">
			<div class="input-group input-group-sm" style="width:100%">
				<div class="row" id="ChatBoxEntry" style="text-align:center">
					<textarea name="message" id="message" style="
						color:Black;height:100px;width:50%;display:block;margin-left:auto;margin-right:auto;margin-bottom:20px">
					</textarea> <?php echo $messageError ?>
				</div>
				<div class="row">
					<input class="btn btn-success btn-block" style="width:25%;margin-left:auto;margin-right:auto;" type="submit" value="Submit" id = "Submit">
				</div>
			</div>
		</form>
	</div>

	<div style="overflow-x:auto">
		<?php 
			
		$view = $data->getAllDataChat();

			$html = "<table class='table table-bordered'>";
			
				$html .= "<tr>";
					$html .= "<h3>Messages</h3>";
					$html .= "<th>Username</th>";
					$html .= "<th>Message</th>";
					$html .= "<th>Posted</th>";
				$html .= "</tr>";
				
				foreach ($view as $v) {
					
					$html .= "<tr>";
						$html .= "<td>".$v->email."</td>";
						$html .= "<td>".$v->message."</td>";
						$html .= "<td>".$v->posted."</td>";
					$html .= "</tr>";
				}
				
			$html .= "</table>";
			
			echo $html;
			
		?>
	</div>
</div>