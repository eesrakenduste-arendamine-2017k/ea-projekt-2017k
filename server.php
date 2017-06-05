<?php

  define("FILENAME","database.txt");
  if(isset($_POST["save"]) && !empty($_POST["save"])){
    saveToFile($_POST["save"]);
  }

  function saveToFile($stringToSave){
    $object = new StdClass();
    $object->players = $stringToSave;
    $jsonString = json_encode($object);
    if(file_put_contents(FILENAME, $jsonString)){
      echo ('{"message":"saved successfully"}');
    }
  }

?>
