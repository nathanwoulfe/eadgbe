<?php

set_include_path('src' . PATH_SEPARATOR . get_include_path());// CHANGE THIS!
//google php api you can get here from src dir:
//https://github.com/google/google-api-php-client
require_once 'Google/Client.php';

	$pathToTokenFile="";// CHANGE THIS!
	$tokenFileName="yt.token";// CHANGE THIS!

	
	//you can get all credentials here:
	//https://console.developers.google.com/project
	//create project-> then open created project->apis & auth -> credentials -> 
	// -> create new client id -> Web application
	
	$client_id = '834651211983-jpfabeq82c8mv7e7usdqt7ea3trb2aip.apps.googleusercontent.com';// CHANGE THIS!
	$client_secret = '-_d0z-ZVtetEyQuv4zbhoWCN';// CHANGE THIS!
	$redirect_uri = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'], FILTER_SANITIZE_URL);// CHANGE THIS!
	$applicationName = "eadg.be";// CHANGE THIS!

	//MAGIC! DON'T TOUCH!***************************************//
	$client = new Google_Client();
	$client->setAccessType('offline');
	$client->setClientId($client_id);
	$client->setClientSecret($client_secret);
	$client->setRedirectUri($redirect_uri);
	$client->addScope("https://www.googleapis.com/auth/youtube");
	//**********************************************************//
?>