<?php
//Youtube Subscription RSS by 4rch0n, 2014//
//MAGIC! DON'T TOUCH!***************************************//
include 'config.php';

	if(!isset($_GET['channel'])) die('Give me channel/user ID - from https://www.youtube.com/account_advanced');

	$channel = $_GET['channel'];

	$url = "http://gdata.youtube.com/feeds/base/users/".$channel."/newsubscriptionvideos?max-results=49&alt=json";

	$token = file_get_contents($pathToTokenFile.$tokenFileName);
	$client->setAccessToken($token);

	$token = $client->getAccessToken();
	$token = json_decode($token);
	
	if($client->getAuth()->isAccessTokenExpired())
	{
		$client->refreshToken($token->refresh_token);
		$token = $client->getAccessToken();
		file_put_contents($pathToTokenFile.$tokenFileName,$token);
		$token = json_decode($token);
	}

	$access_token = $token->access_token;

	$curlHeadder = array("Authorization: Bearer ".$access_token);
	$timeout = 0; 
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url); 
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_USERAGENT, $applicationName);
	curl_setopt($ch, CURLOPT_VERBOSE, 0);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout); 
	curl_setopt($ch, CURLOPT_HTTPHEADER, $curlHeadder);
	$curlResponse = curl_exec ($ch); 
	$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
	$response['header'] = substr($curlResponse, 0, $header_size);
	$response['body'] = substr($curlResponse, $header_size);
	
	header('Content-type: application/rss+xml; charset=utf-8');


    $json = json_decode($response['body']);
    $feed = $json->feed->entry;
    print_r('<pre>');
    print_r($json->feed->entry);
    print_r('</pre>');

    $fp = fopen('yt.json', 'w');
    fwrite($fp, json_encode($json));
    fclose($fp);

//**********************************************************//
?>
