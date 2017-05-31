<?php
//Liigutatud javascripti feed.js faili.
$words = file("./positive_words.txt", FILE_IGNORE_NEW_LINES);
$alltweets = array("nicely done", "great job", "amazing performance tonight, well done and keep it up");
$matchcount = 0;
foreach($alltweets as $tweet){
	foreach($words as $word){
		if (preg_match("/\b$word\b/", $tweet, $match)) {
			print_r($tweet."<br>");
			$matchcount++;
		}
	}
}

?>
