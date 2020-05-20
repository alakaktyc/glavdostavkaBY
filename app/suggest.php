<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>подсказки для главдоставки</title>
  </head>
  <body>
    <section class="container">
      <h1>Подсказки по адресу на английском</h1>
      <input id="address" name="address" type="text" />
    </section>
  </body>



<?php
class TooManyRequests extends Exception { }

class Dadata {
    //private $base_url = "http://glavdostavka.rstudio.space/suggestions/api/4_1/rs";
    private $base_url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs";
    private $token;
    private $handle;

    function __construct($token) {
        $this->token = $token;
    }

    public function init() {
        $this->handle = curl_init();
        curl_setopt($this->handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->handle, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Accept: application/json",
            "Authorization: Token " . $this->token
        ));
        curl_setopt($this->handle, CURLOPT_POST, 1);
    }

    /**
     * See https://dadata.ru/api/outward/ for details.
     */
    public function findById($type, $fields) {
        $url = $this->base_url . "/findById/$type";
        return $this->executeRequest($url, $fields);
    }

    /**
     * See https://dadata.ru/api/geolocate/ for details.
     */
    public function geolocate($lat, $lon, $count = 10, $radius_meters = 100) {
        $url = $this->base_url . "/geolocate/address";
        $fields = array(
            "lat" => $lat,
            "lon" => $lon,
            "count" => $count,
            "radius_meters" => $radius_meters
        );
        return $this->executeRequest($url, $fields);
    }

    /**
     * See https://dadata.ru/api/iplocate/ for details.
     */
    public function iplocate($ip) {
        $url = $this->base_url . "/iplocate/address?ip=" . $ip;
        return $this->executeRequest($url, $fields = null);
    }

    /**
     * See https://dadata.ru/api/suggest/ for details.
     */
    public function suggest($type, $fields) {
        $url = $this->base_url . "/suggest/$type";
        return $this->executeRequest($url, $fields);
    }

    public function close() {
        curl_close($this->handle);
    }

    private function executeRequest($url, $fields) {
        curl_setopt($this->handle, CURLOPT_URL, $url);
        if ($fields != null) {
            curl_setopt($this->handle, CURLOPT_POST, 1);
            curl_setopt($this->handle, CURLOPT_POSTFIELDS, json_encode($fields));
        } else {
            curl_setopt($this->handle, CURLOPT_POST, 0);
        }
        $result = $this->exec();
        $result = json_decode($result, true);
        return $result;
    }

    private function exec() {
        $result = curl_exec($this->handle);
        $info = curl_getinfo($this->handle);
        if ($info['http_code'] == 429) {
            throw new TooManyRequests();
        } elseif ($info['http_code'] != 200) {
            throw new Exception('Request failed with http code ' . $info['http_code'] . ': ' . $result);
        }
        return $result;
    }
}

// Метод init() следует вызвать один раз в начале,
// затем можно сколько угодно раз вызывать suggest()
// и в конце следует один раз вызвать метод close().
//
// За счёт этого не создаются новые сетевые соединения на каждый запрос,
// а переиспользуется существующее.

$dadata = new Dadata("268bdeef7d27e7b8b6025f31c19c773fa7db71db");
$dadata->init();

//$fields = array("query"=>"100", "count"=>2);
//$result = $dadata->suggest("employees", $fields);
//print_r($result);

$fields = array("query"=>"Москва", "count"=>2);
$result = $dadata->suggest("address", $fields);
echo '<pre>';
print_r($result);
echo '</pre>';


$dadata->close();
?>

</html>
