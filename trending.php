<?php

require_once("TwitterAPIExchange.php");
require_once("config.php");

$file = "trending.json";

	$url = 'https://api.twitter.com/1.1/trends/place.json';
	$getfield = '?id=1';
	$requestMethod = 'GET';
	$twitter = new TwitterAPIExchange($settings);
	/*echo $twitter->setGetfield($getfield)
				 ->buildOauth($url, $requestMethod)
				 ->performRequest();*/
	$string = json_decode($twitter->setGetfield($getfield)
	             ->buildOauth($url, $requestMethod)
	             ->performRequest(),$assoc = TRUE);
	if($string["errors"][0]["message"] != "") {echo "<h3>Sorry, there was a problem.</h3><p>Twitter returned the following error message:</p><p><em>".$string[errors][0]["message"]."</em></p>";exit();}
	echo "<pre>";
	print_r($string);
	echo "</pre>";
	file_put_contents($file, json_encode($string));

