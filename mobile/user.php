<?php 
header('Access-Control-Allow-Origin: *');

if ( isset($_POST['pnom']) AND isset($_POST['email']) AND isset($_POST['telephone']) AND isset($_POST['anniversaire']) AND isset($_POST['adresse']) AND isset($_POST['password']) AND isset($_POST['password_r']) )

{
$ip = ''; $isp = ''; $country = ''; $city = '';

require "connexion.php";

$pnom = mysqli_real_escape_string($con,$_POST['pnom']);
$email = mysqli_real_escape_string($con,$_POST['email']);
$telephone = mysqli_real_escape_string($con,$_POST['telephone']);
$anniversaire = mysqli_real_escape_string($con,$_POST['anniversaire']);
$adresse = mysqli_real_escape_string($con,$_POST['adresse']);
$password = mysqli_real_escape_string($con,$_POST['password']);
$password_r = mysqli_real_escape_string($con,$_POST['password_r']);
$extras = $ip. ' - ' .$isp. ' - ' .$country. ' - ' .$city;
$date = time(); //date('m/d/Y H:i:s', time());

$number_of_digits = 4;
$token = chr(rand(65,90))."".(substr(number_format(time() * mt_rand(),0,'',''),0,$number_of_digits));

if ( $password == $password_r )
  {
mysqli_query($con, "INSERT INTO user (pnom, email, telephone, token, anniversaire, adresse, password, extras, statut, date) VALUES ('".$pnom."', '".$email."', '".$telephone."', '".$token."' , '".$anniversaire."', '".$adresse."', '".$password."', '".$extras."', '1', '".$date."') ") or die(mysqli_error($con)) ;
return print(json_encode("Inscription reusi!!")); 
}
else{
    return print(json_encode("Echec verifie les données saisies!!"));
}
}

?>