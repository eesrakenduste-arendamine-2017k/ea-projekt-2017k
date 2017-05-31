<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once("TwitterAPIExchange.php");
require_once("config.php");

$file_name = "cache.json";
$file2 = "feed.json";
if(isset($_POST["query"])){
	$url = 'https://api.twitter.com/1.1/search/tweets.json';
	//$getfield = '?q=%23'.$_POST["query"].'&geocode=59.438862,24.754472,100mi&count=100';
	$getfield = '?q=%23'.$_POST["query"].'&count=100&result_type=recent';
	$requestMethod = 'GET';
	$twitter = new TwitterAPIExchange($settings);
	/*echo $twitter->setGetfield($getfield)
				 ->buildOauth($url, $requestMethod)
				 ->performRequest();*/
	$string = json_decode($twitter->setGetfield($getfield)
	             ->buildOauth($url, $requestMethod)
	             ->performRequest());
	file_put_contents($file2, json_encode($string));
}else{
	$file_data = json_decode(file_get_contents($file2));
	echo "<pre>";
	print_r($file_data);
	echo "</pre>";
}


$delay = 5;

//kas on möödunud vähem kui delayga määrasime
/*if(strtotime(date("c")) - (strtotime($file_data->date)) < $delay ){
	//on liiga vähe möödas
	//echo json_encode($file_data);
	return;
}*/

/*
$twitter = new TwitterAPIExchange($settings);
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
*/
?>
