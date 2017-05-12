<?php

require_once("TwitterAPIExchange.php");
require_once("config.php");

$file_name = "cache.json";
$file2 = "feed.json";
if(isset($_POST["query"])){
	$url = 'https://api.twitter.com/1.1/search/tweets.json';
	//$getfield = '?q=%23'.$_POST["query"].'&geocode=59.438862,24.754472,100mi&count=100';
	$getfield = '?q=%23'.$_POST["query"].'&count=100';
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
	file_put_contents($file2, json_encode($string));
}

$file_data = json_decode(file_get_contents($file_name));
$delay = 5;

//kas on möödunud vähem kui delayga määrasime
if(strtotime(date("c")) - (strtotime($file_data->date)) < $delay ){
	//on liiga vähe möödas
	//echo json_encode($file_data);
	return;
}


$twitter = new TwitterAPIExchange($config);
$dataFromAPI = $twitter->setGetfield($getField)
->buildOauth($url, $requestMethod)
->performRequest();
//var_dump( json_decode($dataFromAPI)->statuses);
$object = new StdClass();
//millal tegime päringu
$object->date = date("c");
//saadud tweedid
$object->statuses = json_decode($dataFromAPI)->statuses;
//lisan vanad mis jäänud tekstifaili siia juurde
foreach($file_data->statuses as $old_status){
	$exists = false;
	foreach($object->statuses as $new_status){
		//kas on olemas
		if($old_status->id == $new_status->id){
			$exists = true;
		}
	}
	//ei olnud olemas
	if($exists == false){
		array_push($object->statuses, $old_status);
	}
}
//echo count($object->statuses);
file_put_contents($file_name, json_encode($object));
//echo json_encode($object);

?>