<?php

error_reporting(0);

session_start();

if(!isset($_SESSION['role']) AND !isset($_SESSION['id']))
 {
  exit;
 }

if (isset($_GET['i']) AND isset($_GET['t']) AND isset($_GET['d']) )
{

 require "../../inc/config.php";
 require "../../inc/sms.php"; 
 require "../../inc/functions.php"; 

 $id_reservation = intval($_GET['i']);
 $table_requete = mysqli_real_escape_string($con,$_GET['t']);
 $date = intval($_GET['d']);
 
 require "table.php";
 
 if ($table_requete == "taxiu") {
 
            mysqli_query($con, "UPDATE `".$table_requete."` SET statut_validation = 1 WHERE id ='".$id_reservation."' AND timestamp = '".$date."' ");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, date, timepicker, prix, email FROM `".$table_requete."` WHERE id = '".$id_reservation."' AND statut_validation = '1' AND (date = '".$date."' OR '".$date."') "));

 $destinataire = $requete['telephone'];
 $pnom = $requete['pnom'];
 $email = $requete['email'];
 $prix = $requete['prix'];
 $date = $requete['date'];
 $heure = $requete['timepicker'];
  
  if ($email != "") {
  sendEmail($email, "Subito | Réservation approuvée", "Bonjour $pnom, votre réservation est bien approuvée. pour la date $date à $heure.\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
  }
  SendSMS("$destinataire", "Bonjour $pnom, votre réservation est approuvée pour la date $date à $heure .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
 
 } else if ($table_requete == "requetes_entreprise") {
 
            mysqli_query($con, "UPDATE `".$table_requete."` SET statut_validation = 1 WHERE id ='".$id_reservation."' AND date = '".$date."' ");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, dateh_reservation, prix, email FROM `".$table_requete."` WHERE id = '".$id_reservation."' AND statut_validation = '1' AND (date = '".$date."' OR '".$date."') "));

 $destinataire = $requete['telephone'];
 $pnom = $requete['pnom'];
 $email = $requete['email'];
 $prix = $requete['prix'];
 $date = $requete['dateh_reservation'];
  
  if ($email != "") {
  sendEmail($email, "Subito | Réservation approuvée", "Bonjour $pnom, votre réservation est bien approuvée. pour la date $date .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
  }
  SendSMS("$destinataire", "Bonjour $pnom, votre réservation est approuvée pour la date $date .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
 
 } else if ($table_requete == "requetes_sanscompte") {
 
            mysqli_query($con, "UPDATE `".$table_requete."` SET statut_validation = 1 WHERE id ='".$id_reservation."' AND date = '".$date."' ");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, dateh_reservation, prix, email FROM `".$table_requete."` WHERE id = '".$id_reservation."' AND statut_validation = '1' AND (date = '".$date."' OR '".$date."') "));

 $destinataire = $requete['telephone'];
 $pnom = $requete['pnom'];
 $email = $requete['email'];
 $prix = $requete['prix'];
 $date = $requete['dateh_reservation'];
  
  if ($email != "") {
  sendEmail($email, "Subito | Réservation approuvée", "Bonjour $pnom, votre réservation est bien approuvée. pour la date $date .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
  }
  SendSMS("$destinataire", "Bonjour $pnom, votre réservation est approuvée pour la date $date .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
 
 } else if ($table_requete == "requetes_compte") {

            mysqli_query($con, "UPDATE `".$table_requete."` SET statut_validation = 1 WHERE id ='".$id_reservation."' AND date = '".$date."' ");

 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT requetes_compte.telephone, requetes_compte.pnom, dateh_reservation, prix, user.email FROM user, requetes_compte WHERE requetes_compte.id = '".$id_reservation."' AND requetes_compte.date = '".$date."' AND requetes_compte.id_user = user.id AND statut_validation = '1'"));
 
 $destinataire = $requete['telephone'];
 $pnom = $requete['pnom'];
 $email = $requete['email'];
 $prix = $requete['prix'];
 $dateh_reservation = $requete['dateh_reservation'];
 
  if ($email != "") {
  sendEmail($email, "Subito | Réservation approuvée", "Bonjour $pnom, votre réservation est bien approuvée. pour la date $dateh_reservation .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
  }  

  SendSMS("$destinataire", "Bonjour $pnom, votre réservation est approuvée pour la date $dateh_reservation .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
    
 } else if ($table_requete == "transfert_region") { 

             mysqli_query($con, "UPDATE `".$table_requete."` SET validation = 1 WHERE id ='".$id_reservation."' AND timestamp = '".$date."' ");

  $requete = mysqli_fetch_array(mysqli_query($con, "SELECT transfert_region.telephone, transfert_region.pnom, transfert_region.date, prix, user.email FROM user, transfert_region WHERE transfert_region.id = '".$id_reservation."' AND transfert_region.timestamp = '".$date."' AND transfert_region.id_user = user.id AND validation = '1'"));
 
 $destinataire = $requete['telephone'];
 $pnom = $requete['pnom'];
 $email = $requete['email'];
 $prix = $requete['prix'];
 $dateh_reservation = $requete['date'];
 
  if ($email != "") {
  sendEmail($email, "Subito | Réservation approuvée", "Bonjour $pnom, votre réservation est bien approuvée. pour la date $dateh_reservation .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
  }  
  SendSMS("$destinataire", "Bonjour $pnom, votre réservation est approuvée pour la date $dateh_reservation .\n\nPrix : $prix FCFA\n\nMerci beaucoup et à bientôt.");
 
  }
 
  header('Location: ' . $_SERVER['HTTP_REFERER']);

}

?>