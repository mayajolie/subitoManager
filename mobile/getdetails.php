<?php
header('Access-Control-Allow-Origin: *');
if (isset($_GET['id']) AND isset($_GET['t'])  )
{
    include "connexion.php";
    $code = $_GET['id'];
    $table_requete = mysqli_real_escape_string($con,$_GET['t']);
    require "table.php";

$list_reservation_All=mysqli_query($con, "SELECT * FROM `".$table_requete."` WHERE id = '".$code."'");
   while ($e=mysqli_fetch_assoc($list_reservation_All)) {
    
    if ($e['chauffeur'] != '') {
        $e = mysqli_fetch_array(mysqli_query($con, "SELECT `".$table_requete."`.*, chauffeur.pnom as pnom_chauffeur FROM `".$table_requete."`, chauffeur WHERE `".$table_requete."`.id = '".$code."' AND `".$table_requete."`.chauffeur=chauffeur.id " ));
    }
    
    
     $output[]=$e;

 }

    return print(json_encode($output));


}
