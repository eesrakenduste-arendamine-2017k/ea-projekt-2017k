<?php
require_once("/home/vladsuto/config.php");
$dbName = "if16_vladsuto_wordgame";
$mysqli = new mysqli($serverHost, $serverUsername, $serverPassword, $dbName);
$stmt = $mysqli->prepare("SELECT word FROM words ORDER BY RAND() LIMIT 5");
$stmt->bind_result($words);

$stmt->execute();
$result = array();

while ($stmt->fetch()) {
    array_push($result, $words);
}
$stmt->close();

$arrayOfWords = array_values($result);
$wordsToGame = json_encode($arrayOfWords);

?>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Word search game</title>
    <link rel="stylesheet" href="css/wordsearch.css" />
    <link rel="stylesheet" href="css/style.css" />
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">
  </head>
  <body>
    <div class="wrap">
      <section id="ws-area"></section>
      <ul class="ws-words"></ul>
    </div>
    <script src="js/utility.js"></script>
	<script type="text/javascript">
		var default_settings = {
			'directions': ['W', 'N', 'WN', 'EN'],
			'gridSize': 10,
			'words' : <?php echo $wordsToGame; ?>,
			'wordsList' : [],
			'debug': false
		}
	</script>
    <script src="js/wordsearch.js"></script>
    <script type="text/javascript">
      var gameAreaEl = document.getElementById('ws-area');
      var gameobj = gameAreaEl.wordSearch();

      // Put words into `.ws-words`
      var words = gameobj.settings.wordsList,
        wordsWrap = document.querySelector('.ws-words');
      for (i in words) {
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'ws-word');
        liEl.innerText = words[i];
        wordsWrap.appendChild(liEl);
      }
    </script>
  </body>
</html>
