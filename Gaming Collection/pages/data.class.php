<?php

class data{
	
	
	private $connection;
	
	function __construct($mysqli){
		$this->connection = $mysqli;}


		function deleteEntryComputer ($email, $game)	{
		
		
		$stmt = $this->connection->prepare("
			UPDATE trackComputer
			SET deleted = 1
			WHERE email=? AND game =? 
		");
		
		$stmt->bind_param("ss", $email, $game);
		
		if ($stmt->execute()){
				echo "Success";
				} 	
	
			
	}


		function deleteEntryConsole ($email, $game)	{
		
		
		$stmt = $this->connection->prepare("
			UPDATE trackConsole
			SET deleted = 1
			WHERE email=? AND game =? 
		");
		
		$stmt->bind_param("ss", $email, $game);
		
		if ($stmt->execute()){
				echo "Success";
				} 	
	
			
	}

		function deleteEntryPortable ($email, $game)	{
		
		
		$stmt = $this->connection->prepare("
			UPDATE trackPortable
			SET deleted = 1
			WHERE email=? AND game =? 
		");
		
		$stmt->bind_param("ss", $email, $game);
		
		if ($stmt->execute()){
				echo "Success";
				} 	
	
			
	}
		
		function deleteEntryBoard ($email, $game)	{
		
		
		$stmt = $this->connection->prepare("
			UPDATE trackBoard
			SET deleted = 1
			WHERE email=? AND game =? 
		");
		
		$stmt->bind_param("ss", $email, $game);
		
		if ($stmt->execute()){
				echo "Success";
				} 	
	
			
	}

		function deleteEntryCard ($email, $game)	{
		
		
		$stmt = $this->connection->prepare("
			UPDATE trackCard
			SET deleted = 1
			WHERE email=? AND game =? 
		");
		
		$stmt->bind_param("ss", $email, $game);
		
		if ($stmt->execute()){
				echo "Success";
				} 	
	
			
	}
		
		
		function dataentryComputer ($game, $amount, $email) {
		
		
			$stmt = $this->connection->prepare("
		
				INSERT INTO trackComputer(amount, game, email) VALUE (?, ?, ?)
			
				");
			echo $this->connection->error;
		
			$stmt->bind_param("iss", $game, $amount, $email);
		
				if ($stmt->execute()){
				echo "Success";
				} 			
	}


			function dataentryConsole ($game, $amount, $email) {
		
		
			$stmt = $this->connection->prepare("
		
				INSERT INTO trackConsole(amount, game, email) VALUE (?, ?, ?)
			
				");
			echo $this->connection->error;
		
			$stmt->bind_param("iss", $game, $amount, $email);
		
				if ($stmt->execute()){
				echo "Success";
				} 			
	}

		
			function dataentryPortable ($game, $amount, $email) {
		
		
			$stmt = $this->connection->prepare("
		
				INSERT INTO trackPortable(amount, game, email) VALUE (?, ?, ?)
			
				");
			echo $this->connection->error;
		
			$stmt->bind_param("iss", $game, $amount, $email);
		
				if ($stmt->execute()){
				echo "Success";
				} 			
	}

			function dataentryBoard ($game, $amount, $email) {
		
		
			$stmt = $this->connection->prepare("
		
				INSERT INTO trackBoard(amount, game, email) VALUE (?, ?, ?)
			
				");
			echo $this->connection->error;
		
			$stmt->bind_param("iss", $game, $amount, $email);
		
				if ($stmt->execute()){
				echo "Success";
				} 			
	}

			function dataentryCard ($game, $amount, $email) {
		
		
			$stmt = $this->connection->prepare("
		
				INSERT INTO trackCard(amount, game, email) VALUE (?, ?, ?)
			
				");
			echo $this->connection->error;
		
			$stmt->bind_param("iss", $game, $amount, $email);
		
				if ($stmt->execute()){
				echo "Success";
				} 			
	}	
	

			function dataentryChatroom ($email, $message, $date) {
		
		
			$stmt = $this->connection->prepare("
		
				INSERT INTO chatRoom(email, message, posted) VALUE (?, ?, ?)
			
				");
			echo $this->connection->error;
		
			$stmt->bind_param("sss", $email, $message, $date);
		
				if ($stmt->execute()){
				echo "";
				} 			
	}
	
	
	
	
		function getCountDataComputer($email) {
		

		$stmt = $this->connection->prepare("
			SELECT SUM(amount)
			FROM trackComputer
			WHERE email = ? 
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $amount;
		
	}
	
		function getCountDataConsole($email) {
		

		$stmt = $this->connection->prepare("
			SELECT SUM(amount)
			FROM trackConsole
			WHERE email = ? 
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $amount;
		
	}
	
		function getCountDataPortable($email) {
		

		$stmt = $this->connection->prepare("
			SELECT SUM(amount)
			FROM trackPortable
			WHERE email = ? 
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $amount;
		
	}
	
		function getCountDataBoard($email) {
		

		$stmt = $this->connection->prepare("
			SELECT SUM(amount)
			FROM trackBoard
			WHERE email = ? 
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $amount;
		
	}
	
		function getCountDataCard($email) {
		

		$stmt = $this->connection->prepare("
			SELECT SUM(amount)
			FROM trackCard
			WHERE email = ? 
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount);
		$stmt->execute();
		$stmt->fetch();
		$stmt->close();
		
		return $amount;
		
	}
	
		function getAllDataChat() {
		

		$stmt = $this->connection->prepare("
			SELECT message, posted, email
			FROM chatRoom
			
		");
		$stmt->bind_result($message, $posted, $emailD);
		$stmt->execute();
		
		$results = array();
		
		
		while ($stmt->fetch()) {
			
			$info = new StdClass();
			$info->message = $message;
			$info->posted = $posted;
			$info->email = $emailD;
			
			
			array_push($results, $info);
			
		}
		
		return $results;
		
	}

	
	

	function getAllDataComputer($email) {
		

		$stmt = $this->connection->prepare("
			SELECT amount, game, email
			FROM trackComputer
			WHERE email = ? 
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount, $game, $emailD);
		$stmt->execute();
		
		$results = array();
		
		
		while ($stmt->fetch()) {
			
			$info = new StdClass();
			$info->amount = $amount;
			$info->game = $game;
			$info->email = $emailD;
			
			
			array_push($results, $info);
			
		}
		
		return $results;
		
	}

		function getAllDataConsole($email) {
		

		$stmt = $this->connection->prepare("
			SELECT amount, game, email
			FROM trackConsole
			WHERE email = ?
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount, $game, $emailD);
		$stmt->execute();
		
		$results = array();
		
		
		while ($stmt->fetch()) {
			
			$info = new StdClass();
			$info->amount = $amount;
			$info->game = $game;
			$info->email = $emailD;
			
			
			array_push($results, $info);
			
		}
		
		return $results;
		
	}

		function getAllDataPortable($email) {
		

		$stmt = $this->connection->prepare("
			SELECT amount, game, email
			FROM trackPortable
			WHERE email = ?
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount, $game, $emailD);
		$stmt->execute();
		
		$results = array();
		
		
		while ($stmt->fetch()) {
			
			$info = new StdClass();
			$info->amount = $amount;
			$info->game = $game;
			$info->email = $emailD;
			
			
			array_push($results, $info);
			
		}
		
		return $results;
		
	}

		function getAllDataBoard($email) {
		

		$stmt = $this->connection->prepare("
			SELECT amount, game, email
			FROM trackBoard
			WHERE email = ?
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount, $game, $emailD);
		$stmt->execute();
		
		$results = array();
		
		
		while ($stmt->fetch()) {
			
			$info = new StdClass();
			$info->amount = $amount;
			$info->game = $game;
			$info->email = $emailD;
			
			
			array_push($results, $info);
			
		}
		
		return $results;
		
	}

		function getAllDataCard($email) {
		

		$stmt = $this->connection->prepare("
			SELECT amount, game, email
			FROM trackCard
			WHERE email = ?
			AND deleted IS NULL
			
		");
		$stmt->bind_param("s", $email);
		$stmt->bind_result($amount, $game, $emailD);
		$stmt->execute();
		
		$results = array();
		
		
		while ($stmt->fetch()) {
			
			$info = new StdClass();
			$info->amount = $amount;
			$info->game = $game;
			$info->email = $emailD;
			
			
			array_push($results, $info);
			
		}
		
		return $results;
		
	}
}



?>