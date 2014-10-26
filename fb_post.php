<?php
    require_once("fb_php_sdk/src/facebook.php"); // set the right path
    require_once('TwitterAPIExchange.php'); // get twitter up in here

    file_put_contents("cron.log", "\r\n/****/\r\nCron called at " . gmDate('Y-m-d\TH:i:s\Z') . "\r\n", FILE_APPEND);

    $url="yt.json";
    $raw = file_get_contents($url,0,null,null);
    $json = json_decode($raw, true);
    $entries = $json['feed']['entry'];    

    $latest = $entries[0];
    $id = substr($latest['id']['$t'], strpos($latest['id']['$t'], "videos/") + 7);

    // get minutes from last update
    $now = gmDate('Y-m-d\TH:i:s\Z');
    $now_time = strtotime($now);

    $pubDate = $latest['published']['$t'];
    $pubDate_time = strtotime($pubDate);    
    $minutesSinceUpdate = round(abs($now_time - $pubDate_time) / 60);

    $count = -1;
  
    foreach ($entries as $item) {
        $pubDate = $item['published']['$t'];        
        $pubDate_time = strtotime($pubDate);    
        $age = round(abs($now_time - $pubDate_time) / 60);  

        if ($age < 180) {
            $count++;
        }        
    }  


    $messageSuffix = "";
    if ($count == 1) {
        echo $count;
        $messageSuffix = "PLUS: " . $count . " other new video since our last update";
    } else if ($count > 1) {
        echo $count;
        $messageSuffix = "PLUS: " . $count . " more new videos since our last update";        
    }

    if ($minutesSinceUpdate < 180) {

        $config = array();
        $config['appId'] = '[appId';
        $config['secret'] = '[secret]';
        $config['fileUpload'] = false; // optional
        $fb = new Facebook($config);
    
        $title = $latest['title']['$t'];

        $params = array(
            "access_token" => "[token]",
            "message" => "NEW VIDEO: " . $title . " 
            " . $messageSuffix . "
            " . "
            " . "Don't wait for Facebook updates - http://eadg.be",
            "link" => "http://eadg.be/#/" . $id,
            "name" => "EADG.Be",
            "caption" => "Guitar videos. Nothing else.",
            "picture" => "http://i.ytimg.com/vi/" . $id . "/0.jpg",
            "description" => "WATCH NOW: " . $title
        );    
        echo '<pre>';
        print_r($params);
        echo '</pre>';
        
        file_put_contents("cron.log", "Found " . $count + 1 . " new items\r\n", FILE_APPEND);        

        // twitter time...

        $settings = array(
            'oauth_access_token' => "[token]",
            'oauth_access_token_secret' => "[secret]",
            'consumer_key' => "[key]",
            'consumer_secret' => "[consumer_secret]"
        );

        $url = 'https://api.twitter.com/1.1/statuses/update.json';
        $requestMethod = 'POST';

        $postfields = array(
            'status' => 'NEW VIDEO: ' . $title . ' http://eadg.be/#/' . $id
        );

        $twitter = new TwitterAPIExchange($settings);
        echo $twitter->buildOauth($url, $requestMethod)
                     ->setPostfields($postfields)
                     ->performRequest();
                     
        $errorCount = 0;
        postToFacebook($params, $fb);
       
    } else {        
        file_put_contents("cron.log", "No new posts found\r\n", FILE_APPEND);
    }

    function postToFacebook($params, $fb) {
        try {
            $ret = $fb->api('/536951096380113/feed', 'POST', $params);
            echo 'Successfully posted to Facebook Fan Page';
            file_put_contents("cron.log",  "Successfully posted to Facebook Fan Page\r\n", FILE_APPEND);
        } catch(Exception $e) {
            
            if ($errorCount < 2) {
                postToFacebook($params, $fb);
                file_put_contents("cron.log",  "Something went wrong, trying again\r\n", FILE_APPEND);
                $errorCount++;
            }
            else {
                $e = str_replace('"', "", $e);
                $e = str_replace("'", "", $e);
                echo 'Error ' . $e;
                file_put_contents("cron.log",  "Something went really wrong: " . $e . "\r\n", FILE_APPEND);
            }   
        }
    }

    file_put_contents("cron.log", "Cron job complete \r\n/****/", FILE_APPEND);
?>
