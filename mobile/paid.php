<?php
header('Access-Control-Allow-Origin: *');

error_reporting(0);

session_start();

/*if(!isset($_SESSION['role']) AND !isset($_SESSION['id']))
 {
  //header("Location: ../index.php");
  exit;
 }
*/
if (isset($_GET['i']) AND isset($_GET['t']) AND isset($_GET['d']) )
{

 require "connexion.php";
 require "sms.php"; 

 $id_reservation = intval($_GET['i']);
 $table_requete = mysqli_real_escape_string($con,$_GET['t']);
 $date = mysqli_real_escape_string($con,$_GET['d']);

 require "table.php";

if ($table_requete == "requetes_compte" OR $table_requete == "requetes_sanscompte") {
            
            mysqli_query($con, "UPDATE `".$table_requete."` SET statut_paiement = '1' WHERE date = '".$date."' AND id ='".$id_reservation."' AND statut_validation = '1' AND cancelled = 0 ");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, dateh_reservation, prix FROM $table_requete WHERE date = '".$date."' AND id = '".$id_reservation."' AND statut_validation = '1' "));
 $destinataire = $requete['telephone'];
 $pnom = $requete['pnom'];

 SendSMS("$destinataire", "Bonjour $pnom, votre paiement est bien enregistré et votre facture est disponible dans votre compte.\n\nMerci beaucoup et à bientôt");
 
 } else if ($table_requete == "transfert_region") {
            
            mysqli_query($con, "UPDATE `".$table_requete."` SET paiement = '1' WHERE timestamp = '".$date."' AND id ='".$id_reservation."' AND validation = '1' AND cancelled = 0");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, date, prix FROM $table_requete WHERE timestamp = '".$date."' AND id = '".$id_reservation."' AND validation = '1' "));
 
 $destinataire = $requete['telephone'];
 $pnom = $requete['pnom'];

 SendSMS("$destinataire", "Bonjour $pnom, votre paiement est bien enregistré et votre facture est disponible dans votre compte.\n\nMerci beaucoup et à bientôt");
 
 }
 
 
 header('Location: ' . $_SERVER['HTTP_REFERER']);

}

?>