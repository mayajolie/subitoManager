<?php
header('Access-Control-Allow-Origin: *');

ob_start();

/*function sendEmail($to, $content_OBJET, $content_EMAIL)
{

// Set content-type header for sending HTML email
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// Additional headers
$headers .= 'From: SUBITO TAXI<contact@subitotaxi.net>' . "\r\n";

// Send email
mail($to,$content_OBJET,$content_EMAIL,$headers);

// Email  ------------------------------------------------------
}*/

require "connexion.php";
require "authentification.php";
require "calculfare.php";
require "sms.php";





/*if(!isset($_SESSION['username']) AND !isset($_SESSION['id']))
 {
  exit; //header("Location: index.php");
 }*/


if (isset($_POST['pnom']) AND 
    isset($_POST['mode_paiement']) AND 
    isset($_POST['adresse']) AND 
    isset($_POST['countryCode_na']) AND 
    isset($_POST['telephone']) AND 
    //!empty($_POST['email']) AND 
    isset($_POST['typetransfert']) AND 
    isset($_POST['vehicule']) AND 
    isset($_POST['date']) AND 
    isset($_POST['timepicker']) AND 
    isset($_POST['bagage']) AND 
    isset($_POST['nbre_personne']) AND 
    isset($_POST['numvol']) AND !empty($_POST['numvol']))

{

 $pnom = $_POST['pnom'];
 $mode_paiement = $_POST['mode_paiement'];
 $adresse = $_POST['adresse'];
 $countryCode = $_POST['countryCode_na'];
 $telephone = $_POST['telephone'];
 $numvol = $_POST['numvol'];
 $typetransfert = $_POST['typetransfert'];
 $vehicule = $_POST['vehicule'];
 
 $datetimealler = $_POST['date'];
 $timepicker = $_POST['timepicker'];
 $datetimealler = $datetimealler." ".$timepicker;
 
 $nbre_personne = $_POST['nbre_personne'];
 $bagage = $_POST['bagage'];
 $email = $_POST['email'];
 $commentaire = $_POST['commentaire'];

 $date = time();
 $prix = $_SESSION['price'];
 $telephone = $countryCode.$telephone;

 // Bons de commande 
 if (isset($_POST['mode_paiement']) && $_POST['mode_paiement'] == 'BonTransfert') {
 $query_bonscommande = mysqli_fetch_array(mysqli_query($con,"SELECT * from user WHERE id = '".$_SESSION['id']."' "));
 if ($query_bonscommande['bonscommande'] == 0 ) { echo "bc_zero"; exit; } else { mysqli_query($con, "UPDATE user SET bonscommande = bonscommande - 1 WHERE id = '".$_SESSION['id']."' ") ; }
 }
 // Bons de commande 
 
 if ($typetransfert != "3")
 { 
 $result=mysqli_query($con, "INSERT INTO requetes_compte ( id_user,pnom, adresse, type_transfert, bagage, nbre_personne, type_vehicule, telephone, numvol, date, dateh_reservation, prix, mode_paiement, commentaire) VALUE ('','".$pnom."', '".$adresse."', '".$typetransfert."', '".$bagage."', '".$nbre_personne."', '".$vehicule."' ,'".$telephone."', '".$numvol."', '".$date."', '".$datetimealler."', '".$prix."', '".$mode_paiement."', '".$commentaire."') ");
//$result=mysqli_query($con, "INSERT INTO requetes_sanscompte (id_user, pnom, adresse, type_transfert, bagage, nbre_personne, type_vehicule, telephone, numvol, date, dateh_reservation, prix, mode_paiement, email, commentaire) VALUE ('".$pnom."', '".$adresse."', '".$typetransfert."', '".$bagage."', '".$nbre_personne."', '".$vehicule."' ,'".$telephone."', '".$numvol."', '".$date."', '".$datetimealler."', '".$prix."', '".$mode_paiement."', '".$email."', '".$commentaire."') ");
 }
 else if ($typetransfert == "3")
 {
         
 $dateretour = $_POST['date-retour'];
 $heureretour = $_POST['timepicker-retour'];
 $datetimeretour = $dateretour." ".$heureretour;
 

 $result=mysqli_query($con, "INSERT INTO requetes_compte (id_user, pnom, adresse, type_transfert, bagage, nbre_personne, type_vehicule, telephone, numvol, date, dateh_reservation, dateh_reservation_retour, prix, mode_paiement, commentaire) VALUE ('".$_SESSION['id']."', '".$pnom."', '".$adresse."', '".$typetransfert."', '".$bagage."', '".$nbre_personne."', '".$vehicule."' ,'".$telephone."', '".$numvol."' ,'".$date."', '".$datetimealler."', '".$datetimeretour."', '".$prix."', '".$mode_paiement."', '".$commentaire."') ");
//$result=mysqli_query($con, "INSERT INTO requetes_sanscompte (id_user, pnom, adresse, type_transfert, bagage, nbre_personne, type_vehicule, telephone, numvol, date, dateh_reservation, dateh_reservation_retour, prix, mode_paiement, email, commentaire) VALUE ('".$pnom."', '".$adresse."', '".$typetransfert."', '".$bagage."', '".$nbre_personne."', '".$vehicule."' ,'".$telephone."', '".$numvol."' ,'".$date."', '".$datetimealler."', '".$datetimeretour."', '".$prix."', '".$mode_paiement."', '".$email."', '".$commentaire."') ");
 }
 
 if($result)
 {
    SendSMS("$telephone", "Bonjour $pnom, votre réservation est approuvée pour la date $date .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");

 sendEmail($email, "Nouvelle réservation | Subito", "Bonjour $pnom, votre réservation est bien enregistrée. Vous receverez un SMS et Email de confirmation une fois validée.\n\nMerci beaucoup et à bientôt");
  echo "success";
 }
 else
 {
  echo "fail777777";
 }
 //exit();
}

ob_end_flush();

?>