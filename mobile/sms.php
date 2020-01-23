<?php

include('httpful.phar');

function SendSMS ($recipient,$content)
{

$sms_from = 'SUBITO';
$sms_to = $recipient;
$sms_text = $content;
$signature = '43fd8414ca4e6e89e2e2ab90478d058a';

$params = array(
'sms_from' => $sms_from,
'sms_to' => $sms_to,
'sms_text' => $sms_text,
'signature' => $signature
);
$uri = 'http://41.219.0.108/api-sms-smpp/sms/send';
$response = \Httpful\Request::post($uri)
->body(http_build_query($params))
->send();

}

//SendSMS('221772918604',"Mon message test");
?>