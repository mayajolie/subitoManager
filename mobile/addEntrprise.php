<?php 
header('Access-Control-Allow-Origin: *');

if ( isset($_POST['libelle_entreprise']) AND isset($_POST['adresse']) AND isset($_POST['phone_entreprise']) AND isset($_POST['pnom_owner']) AND isset($_POST['phone_owner']) AND isset($_POST['tva']) AND isset($_POST['email1']) )

{

require "connexion.php";

$libelle_entreprise = mysqli_real_escape_string($con,$_POST['libelle_entreprise']);
$phone_entreprise = mysqli_real_escape_string($con,$_POST['phone_entreprise']);
$pnom_owner = mysqli_real_escape_string($con,$_POST['pnom_owner']);
$indicatif = mysqli_real_escape_string($con,$_POST['countryCode_en']);
$phone_owner = mysqli_real_escape_string($con,$_POST['phone_owner']);
//$phone_owner = $countryCode_en.$phone_owner;
$tva = mysqli_real_escape_string($con,$_POST['tva']);
$email1 = mysqli_real_escape_string($con,$_POST['email1']);
$email2 = mysqli_real_escape_string($con,$_POST['email2']);
$adresse = mysqli_real_escape_string($con,$_POST['adresse']);
$date = time();

$number_of_digits = 4;
//$token = chr(rand(65,90))."".(substr(number_format(time() * mt_rand(),0,'',''),0,$number_of_digits));
$token = "E".(rand(65,90))."".(substr(number_format(time() * mt_rand(),0,'',''),0,$number_of_digits));

$length = 7;
$password = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);

mysqli_query($con, "INSERT INTO entreprise (pnom_owner, adresse, indicatif, phone_owner, phone_entreprise, libelle_entreprise, password, tva, token, email1, email2, date) VALUES ('".$pnom_owner."', '".$adresse."', '".$indicatif."', '".$phone_owner."', '".$phone_entreprise."', '".$libelle_entreprise."', '".$password."', '".$tva."', '".$token."', '".$email1."', '".$email2."', '".$date."') ");

sendEmail($email1, "Création compte | Subito","Bonjour $pnom_owner, <br><br>Le compte Entreprise <b>$libelle_entreprise </b>est créee avec succés.<br><br>Vous pouvez désormais vous connecter avec votre email/mot de passe , changer votre mot de passe et acheter vos bons et plus encore.<br><br>Lien de connexion : <A href='https://subitotaxi.net'><b>https://subitotaxi.net</b></A><br><br>Votre mot de passe par défaut est :<b> $password</b><br><br>Votre code Unique : <b>$token </b><br><br>Pour toutes questions, vous pouvez nous contacter au +221 78 136 36 35 | 33 864 26 56.<br><br> Merci et à bientot.");

}

?>