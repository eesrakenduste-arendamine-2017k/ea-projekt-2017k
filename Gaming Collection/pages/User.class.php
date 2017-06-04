<?php class User{
	
	private $connection;
	
	function __construct($mysqli){
		$this->connection = $mysqli;
	}
	
	function login($loginUsername, $password) {
		
		$notice = "";
		
		$stmt = $this->connection->prepare("
			SELECT id, username, password, created
			FROM userSample
			WHERE username = ?
		");
		
		echo $this->connection->error;

		$stmt->bind_param("s", $loginUsername);
		$stmt->bind_result($id, $usernameFromDb, $passwordFromDb, $created);
		$stmt->execute();

		if($stmt->fetch()) {
			$hash = hash("sha512", $password);
			
			if ($hash == $passwordFromDb) {
				echo "Kasutaja $id logis sisse";
				
				$_SESSION["userId"] = $id;
				$_SESSION["userEmail"] = $usernameFromDb;
				
				header("Location: data.php");
				exit();
				
			} else {
				$notice = "parool vale";
			}
		} else {
			$notice = "Sellise emailiga kasutajat ei ole olemas";
		}
		$stmt->close();
		
		return $notice;
	}

	function signup($username, $password) {
		$stmt = $this->connection->prepare("INSERT INTO userSample (username, password) VALUE (?, ?)");
		echo $this->connection->error;
		$stmt->bind_param("ss", $username, $password);
		
		if ( $stmt->execute() ) {
			echo "";
		} else {
			echo " ".$stmt->error;
		}
	}
	
}
	
?>