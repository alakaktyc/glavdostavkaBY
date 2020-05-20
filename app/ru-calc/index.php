<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
    	$API_URL = 'http://api.glavdostavka.ru';
    	$API_KEY = '116867/afc1da8b96c36298bcdd7365c537e669'; // пример ключа (подставить свой!)

      $api_method = '/order/calc/';
      //$api_method = '/service/shipping_city_to/';
    	//$api_method = '/service/extra/';

    	$get_params = [
    		'id'      => uniqid(mt_rand(), true),
    		'auth'    => $API_KEY,
    		];

        $post_params = [
      	   'from_city_id' => 557,
      	   'to_city_id' => 545377,
      	   'cargo' => [
      		  0 => [
      			 'amount' => 2,
      			 'weight' => 100,
      			 'length' => 2,
      			 'width' => 1,
      			 'height' => 3,
      			 'one_place' => false // 1 место с габаритами 2,1,3
      		  ]
      	   ]
      	];

    	$url = $API_URL.$api_method;
    	$url.= '?'.http_build_query($get_params);
    	if (!empty($post_params))
    		$post_params = http_build_query($post_params);

    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_URL, $url);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    	curl_setopt($ch, CURLOPT_POST, true);
    	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_params);

    	$response = curl_exec($ch);
    	if ($response === false)
    		throw new Exception(sprintf('Api connect error: "%s"', curl_error($ch)), 500);

    	curl_close($ch);

    	$response = json_decode($response, true);
      echo '<pre>';
      print_r($response);
      echo '</pre>';
    ?>
  </body>
</html>
