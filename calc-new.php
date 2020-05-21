<?php

$soap_url = 'http://195.222.65.76:8080/TMF/ws/d_exchange.1cws?wsdl';
$soap_login = 'zagr';
$soap_passwd = '123123';

$cityCatalog = file_get_contents('assets/json/loc.json');

$cityCatalogArr = json_decode($cityCatalog,TRUE);

$description = htmlspecialchars($_POST["Description"]);
$departure = htmlspecialchars($_POST["Departure"]);
$destination = htmlspecialchars($_POST["Destination"]);
$dimensionsOnePlace = $_POST["Dimensions_one_place"];
$oversized = $_POST["Oversized"];
$weight = $_POST["weight"];
$volume = $_POST["volume"];
$numberPackages = $_POST["Number_Packages"];
$length = $_POST["length"];
$width = $_POST["width"];
$height = $_POST["height"];
$customerDelivery = htmlspecialchars($_POST["Customer_delivery"]);
$date = $_POST["Date_download"];
if ($date) {
  $dateDownload = $date;
} else {
  $dateDownload = date("Y-m-d");
}

$departureKey = false;
$destinationKey = false;

foreach ($cityCatalogArr  as $key => $cityCatalogItem){
  if ($cityCatalogItem['location'] == $departure) {
    $departureCode = $cityCatalogItem['code'];
    $departureKey = true;
  }
  if ($cityCatalogItem['location'] == $destination) {
    $destinationCode = $cityCatalogItem['code'];
    $destinationKey = true;
  }
}

if ($customerDelivery) {
  $customerDelivery = true;
} else {
  $customerDelivery = 'false';
}

$xml = '<PACKAGE xmlns="http://www.sample-package.org" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
$xml .= '<Departure>'.$departureCode.'</Departure>';
$xml .= '<Destination>'.$destinationCode.'</Destination>';
$xml .= '<Dimensions_one_place>false</Dimensions_one_place>';
$xml .= '<Oversized>false</Oversized>';

$xml .= '<Customer_delivery>'.$customerDelivery.'</Customer_delivery>';
$xml .= '<Date_download>'.$dateDownload.'</Date_download>';

foreach ($weight as $key => $value) {
  $xml .= '<Detail_Rows>';
  if ($description) {
    $xml .= '<Description>'.$description.'</Description>';
  } else {
    $xml .= '<Description>груз'.$key.'</Description>';
  }
  $xml .= '<Weight>'. (float) $weight[$key].'</Weight>';
  $xml .= '<Volume>'.(float) $volume[$key].'</Volume>';
  $xml .= '<Number_Packages>'.(int) $numberPackages[$key].'</Number_Packages>';
  $xml .= '<Length>'.(float) $length[$key].'</Length>';
  $xml .= '<Width>'.(float) $width[$key].'</Width>';
  $xml .= '<Height>'.(float) $height[$key].'</Height>';
  $xml .= '<Oversized>false</Oversized>';
  $xml .= '</Detail_Rows>';
}

$xml .= '<AdditionalServices>';
$xml .= '<Additiona_Point>true</Additiona_Point>';
$xml .= '<Delivery_Evening>false</Delivery_Evening>';
$xml .= '<Delivery_Time>true</Delivery_Time>';
$xml .= '<Driver_Services>0</Driver_Services>';
$xml .= '<Removable_Curtain>1</Removable_Curtain>';
$xml .= '<Loader_Service>0</Loader_Service>';
$xml .= '</AdditionalServices>';

$xml .= '</PACKAGE>';

if (($departureKey)&&($destinationKey)) {
  try {
      $soap = new SoapClient($soap_url, [
          'login'             => $soap_login,
          'password'          => $soap_passwd,
          'soap_version'      => SOAP_1_2,
          'exceptions'        => true,
          'cache_wsdl'        => WSDL_CACHE_NONE,
          'trace'                     => 1,
      ]);

      $result = $soap->__call('getCostCalculator', [
          'DeliveryCalculator' => [
              'DeliveryOptions' => $xml
          ],
      ]);

      $xml = new SimpleXMLElement($result->return);

      $json = json_encode($xml);

  } catch (Exception $e) {
      die($e->getMessage());
  }

  echo $json;
} else {
  echo json_encode([
    'Warning_Customer' => 'не правильно указан город отправления или доставки!',
    'Message' => 'тестовое сообщение'
]);
  exit;
}
