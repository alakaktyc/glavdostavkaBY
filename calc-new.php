<?php

$soap_url = 'http://195.222.65.76:8080/TMF/ws/d_exchange.1cws?wsdl';
$soap_login = 'zagr';
$soap_passwd = '123123';

$description = htmlspecialchars($_POST["Description"]);
$departure = htmlspecialchars($_POST["Departure"]);
$destination = htmlspecialchars($_POST["Destination"]);
$dimensionsOnePlace = htmlspecialchars($_POST["Dimensions_one_place"]);
$oversized = htmlspecialchars($_POST["Oversized"]);
$weight = $_POST["weight"];
$volume = htmlspecialchars($_POST["Volume"]);
$numberPackages = htmlspecialchars($_POST["Number_Packages"]);
$length = htmlspecialchars($_POST["Length"]);
$width = htmlspecialchars($_POST["Width"]);
$height = htmlspecialchars($_POST["Height"]);
$customerDelivery = htmlspecialchars($_POST["Customer_delivery"]);
$date = htmlspecialchars($_POST["Date_download"]);
if ($date) {
  $dateDownload = $date;
} else {
  $dateDownload = date("Y-m-d");
}

//$dateDownload = '2020-04-30';


$xml = '<PACKAGE xmlns="http://www.sample-package.org" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
$xml .= '<Departure>'.$departure.'</Departure>';
$xml .= '<Destination>'.$destination.'</Destination>';
$xml .= '<Dimensions_one_place>'.$dimensionsOnePlace.'</Dimensions_one_place>';
$xml .= '<Oversized>false</Oversized>';
$xml .= '<Customer_delivery>'.$customerDelivery.'</Customer_delivery>';
$xml .= '<Date_download>'.$dateDownload.'</Date_download>';
$xml .= '<Detail_Rows>';
if ($description) {
  $xml .= '<Description>'.$description.'</Description>';
} else {
  $xml .= '<Description>груз</Description>';
}
$xml .= '<Weight>'.$weight.'</Weight>';
$xml .= '<Volume>'.$volume.'</Volume>';
$xml .= '<Number_Packages>'.$numberPackages.'</Number_Packages>';
$xml .= '<Length>'.$length.'</Length>';
$xml .= '<Width>'.$width.'</Width>';
$xml .= '<Height>'.$height.'</Height>';
$xml .= '<Oversized>false</Oversized>';
$xml .= '</Detail_Rows>';
/*
$xml .= '<Detail_Rows>';
if ($description) {
  $xml .= '<Description>'.$description.'</Description>';
} else {
  $xml .= '<Description>груз</Description>';
}
$xml .= '<Weight>'.$weight.'</Weight>';
$xml .= '<Volume>'.$volume.'</Volume>';
$xml .= '<Number_Packages>'.$numberPackages.'</Number_Packages>';
$xml .= '<Length>'.$length.'</Length>';
$xml .= '<Width>'.$width.'</Width>';
$xml .= '<Height>'.$height.'</Height>';
$xml .= '<Oversized>false</Oversized>';
$xml .= '</Detail_Rows>';
*/
$xml .= '<AdditionalServices>';
$xml .= '<Additiona_Point>true</Additiona_Point>';
$xml .= '<Delivery_Evening>false</Delivery_Evening>';
$xml .= '<Delivery_Time>true</Delivery_Time>';
$xml .= '<Driver_Services>0</Driver_Services>';
$xml .= '<Removable_Curtain>1</Removable_Curtain>';
$xml .= '<Loader_Service>0</Loader_Service>';
$xml .= '</AdditionalServices>';

$xml .= '</PACKAGE>';

/*
$xml = '<PACKAGE xmlns="http://www.sample-package.org" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
$xml .= '<Departure>5000000000</Departure>';
$xml .= '<Destination>4401000000</Destination>';
$xml .= '<Dimensions_one_place>false</Dimensions_one_place>';
$xml .= '<Oversized>false</Oversized>';
$xml .= '<Customer_delivery>false</Customer_delivery>';
$xml .= '<Date_download>2020-04-30</Date_download>';
$xml .= '<Detail_Rows>';
$xml .= '<Description>Товар 2</Description>';
$xml .= '<Weight>1550</Weight>';
$xml .= '<Volume>0</Volume>';
$xml .= '<Number_Packages>2</Number_Packages>';
$xml .= '<Length>0.67</Length>';
$xml .= '<Width>0.95</Width>';
$xml .= '<Height>0.45</Height>';
$xml .= '<Oversized>false</Oversized>';
$xml .= '</Detail_Rows>';
$xml .= '<Detail_Rows>';
$xml .= '<Description>Товар 2</Description>';
$xml .= '<Weight>1550</Weight>';
$xml .= '<Volume>0</Volume>';
$xml .= '<Number_Packages>2</Number_Packages>';
$xml .= '<Length>0.67</Length>';
$xml .= '<Width>0.95</Width>';
$xml .= '<Height>0.45</Height>';
$xml .= '<Oversized>false</Oversized>';
$xml .= '</Detail_Rows>';
$xml .= '<AdditionalServices>';
$xml .= '<Additiona_Point>true</Additiona_Point>';
$xml .= '<Delivery_Evening>false</Delivery_Evening>';
$xml .= '<Delivery_Time>true</Delivery_Time>';
$xml .= '<Driver_Services>0</Driver_Services>';
$xml .= '<Removable_Curtain>1</Removable_Curtain>';
$xml .= '<Loader_Service>0</Loader_Service>';
$xml .= '</AdditionalServices>';
$xml .= '</PACKAGE>';
*/

/*
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
    //$array = json_decode($json);

} catch (Exception $e) {
    die($e->getMessage());
}
//Date_download":"2020-03-27","Date_delivery":"2020-03-30


$arResponse = array(
  'Date_download' => $xml->Date_download,
  'Date_delivery' => $xml->Date_delivery,
  'Cost_Delivery' => $xml->Cost_Delivery
  );

echo json_encode($arResponse);
*/
//echo json_encode(['message' => $weight[0]]);

foreach ($weight as $key => $value) {
  echo $value; ?>
<br>
<?
}

//return $weight[0];
//echo $dateDownload;

//$json = json_encode($xml);

//echo $json;

//echo $xml->Cost_Delivery;
