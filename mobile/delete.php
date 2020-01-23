<?php

error_reporting(0);

session_start();

/*if(!isset($_SESSION['role']) AND !isset($_SESSION['id']))
 {
  exit;
 }
*/
if (isset($_GET['i']) AND isset($_GET['t']) AND isset($_GET['d']) )
{

require "connexion.php";

 $date = intval($_GET['d']);
 $id_reservation = intval($_GET['i']);
 $table_requete = mysqli_real_escape_string($con,$_GET['t']);
 
 require "table.php"; 
 
 if ($table_requete != "transfert_region" OR $table_requete != "taxiu") {
 
 mysqli_query($con, "DELETE FROM `".$table_requete."` WHERE id ='".$id_reservation."' AND date = '".$date."' ");
 
 } else if ($table_requete == "transfert_region" OR $table_requete == "taxiu") {
 
 mysqli_query($con, "DELETE FROM `".$table_requete."` WHERE id ='".$id_reservation."' AND timestamp = '".$date."' ");
 
 }
 
 header('Location: ' . $_SERVER['HTTP_REFERER']);
  
}

if (isset($_GET['id']) AND isset($_GET['arg']) AND $_GET['arg']=='fdr' )
{

require "connexion.php";

$id = intval($_GET['id']);
  
 mysqli_query($con, "DELETE FROM `feuillederoute` WHERE id ='".$id."' ");
 
 header('Location: ' . $_SERVER['HTTP_REFERER']);
  
}


?>