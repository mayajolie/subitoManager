<?php

/*session_start();

if(!isset($_SESSION['role']) AND !isset($_SESSION['id']))
 {
  exit;
 }
*/
header('Access-Control-Allow-Origin: *');

if (isset($_GET['i']) AND isset($_GET['t']) AND isset($_GET['d']) )
{

require "connexion.php";
require "sms.php";

 $date = intval($_GET['d']);
 $id_reservation = intval($_GET['i']);
 $table_requete = mysqli_real_escape_string($con,$_GET['t']);
 
  require "table.php";
  
  if ($table_requete == "requetes_sanscompte") {
  
 mysqli_query($con, "UPDATE `".$table_requete."` SET cancelled = 1 WHERE id = '".$id_reservation."' AND date = '".$date."' ");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, dateh_reservation FROM `".$table_requete."` WHERE id = '".$id_reservation."' AND date = '".$date."' "));
 
 $pnom = $requete['pnom'] ;
 $telephone = $requete['telephone'] ;
 $dateh_reservation = $requete['dateh_reservation'] ;
 
 SendSMS("$telephone", "Bonjour $pnom.\n\nNous sommes désolés, votre réservation n'est malheureusement pas approuvée pour la date $dateh_reservation .\n\nMerci de revoir pour une autre date svp.");
  
  } else if ($table_requete == "requetes_compte") {
  
 mysqli_query($con, "UPDATE `".$table_requete."` SET cancelled = 1 WHERE id = '".$id_reservation."' AND date = '".$date."' ");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, dateh_reservation FROM `".$table_requete."` WHERE id = '".$id_reservation."' AND date = '".$date."' "));
 
 $pnom = $requete['pnom'] ;
 $telephone = $requete['telephone'] ;
 $dateh_reservation = $requete['dateh_reservation'] ;
 
 SendSMS("$telephone", "Bonjour $pnom.\n\nNous sommes désolés, votre réservation n'est malheureusement pas approuvée pour la date $dateh_reservation .\n\nMerci de revoir pour une autre date svp.");
  
  
  } else if ($table_requete == "transfert_region") {
  
 mysqli_query($con, "UPDATE `".$table_requete."` SET cancelled = 1 WHERE id = '".$id_reservation."' AND timestamp = '".$date."' ");
 
 $requete = mysqli_fetch_array(mysqli_query($con, "SELECT telephone, pnom, date FROM `".$table_requete."` WHERE id = '".$id_reservation."' AND timestamp = '".$date."' "));
 
 $pnom = $requete['pnom'] ;
 $telephone = $requete['telephone'] ;
 $dateh_reservation = $requete['date'] ;
 
 SendSMS("$telephone", "Bonjour $pnom.\n\nNous sommes désolés, votre réservation n'est malheureusement pas approuvée pour la date $dateh_reservation .\n\nMerci de revoir pour une autre date svp.");
  
  
  }

 header('Location: ' . $_SERVER['HTTP_REFERER']);
  
}

?>