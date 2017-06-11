<?php 
	require("../../config.php");
	
	// see fail peab olema siis seotud kõigiga kus
	// tahame sessiooni kasutada
	// saab kasutada nüüd $_SESSION muutujat
	session_start();
	
	$database = "if16_kirikotk_4";
	// functions.php
	
	function signup($email, $password, $name, $nimi) {
		
		$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		
		$stmt = $mysqli->prepare("INSERT INTO er_users (email, password) VALUE (?, ?)");
		echo $mysqli->error;
		
		$stmt->bind_param("ss", $email, $password);
		
		if ( $stmt->execute() ) {
			echo "õnnestus";
		} else {
			echo "ERROR ".$stmt->error;
		}
		
	}
	
	
	function login($email, $password) {
		
		$notice = "";
		
		$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		
		$stmt = $mysqli->prepare("
			SELECT id, email, password, created
			FROM er_users
			WHERE email = ?
		");
		
		echo $mysqli->error;
		
		//asendan küsimärgi
		$stmt->bind_param("s", $email);
		
		//rea kohta tulba väärtus
		$stmt->bind_result($id, $emailFromDb, $passwordFromDb, $created);
		
		$stmt->execute();
		
		//ainult SELECT'i puhul
		if($stmt->fetch()) {
			// oli olemas, rida käes
			//kasutaja sisestas sisselogimiseks
			$hash = hash("sha512", $password);
			
			if ($hash == $passwordFromDb) {
				echo "Kasutaja $id logis sisse";
				
				$_SESSION["userId"] = $id;
				$_SESSION["userEmail"] = $emailFromDb;
				//echo "ERROR";
				
				header("Location: gallerry.php");
				
			} else {
				$notice = "parool vale";
			}
			
			
		} else {
			
			//ei olnud ühtegi rida
			$notice = "Sellise emailiga ".$email." kasutajat ei ole olemas";
		}
		
		
		$stmt->close();
		$mysqli->close();
		
		return $notice;
		
	
	}

	function saveEvent($picturl, $pictname) {
		
		$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		
		$stmt = $mysqli->prepare("INSERT INTO er_pict (picturl, pictname, email) VALUE (?, ?, ?)");
		echo $mysqli->error;
		
		$stmt->bind_param("sss", $picturl, $pictname, $_SESSION["userEmail"]);
		
		if ( $stmt->execute() ) {
			echo "Picture have saved";
		} else {
			echo "ERROR ".$stmt->error;
		}
		
	}
	
	
	function getAllPeople() {
		
		$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
		
		$stmt = $mysqli->prepare("
		SELECT id, picturl, pictname, email
		FROM er_pict
		");
		$stmt->bind_result($id, $picturl, $pictname, $email);
		$stmt->execute();
		
		$results = array();
		
		while($stmt->fetch()) {
			
			$human = new StdClass();
			$human->id = $id;
			$human->picturl = $picturl;
			$human->pictname = $pictname;
			$human->email = $email;
			
			array_push($results, $human);
			
		}
		return $results;
		
	}
	
	function cleanInput($input) {
		
		$input = trim($input);

		$input = stripslashes($input);

		$input = htmlspecialchars($input);
		
		return $input;
		
	}
	

?>