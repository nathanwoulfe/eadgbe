<?php
//Youtube Subscription RSS by 4rch0n, 2014//
//MAGIC! DON'T TOUCH!***************************************//
include 'config.php';
session_start();

	if (isset($_GET['code'])) {
	  $client->authenticate($_GET['code']);
	  $_SESSION['access_token'] = $client->getAccessToken();
	  $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
	  header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
	}
	
	if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
	  $client->setAccessToken($_SESSION['access_token']);
	} else {
	  $authUrl = $client->createAuthUrl();
	}

	if ( $_SESSION['access_token'])
	{
		print_r( $_SESSION['access_token'] );
		file_put_contents($pathToTokenFile.$tokenFileName, $_SESSION['access_token']);
		echo '<p><a class="login" href="'. $_SERVER['PHP_SELF'].'?logout">Log out!</a></p>';
	}
	else
	{
		echo '<a class="login" href="'.$authUrl.'">Connect Me!</a>';
		
	}

if (isset($_REQUEST['logout'])) {
  unset($_SESSION['access_token']);
}
//**********************************************************//
?>