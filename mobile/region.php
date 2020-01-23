<?php
header('Access-Control-Allow-Origin: *');
require "connexion.php";






if (isset($_POST['pnom']) AND 
    isset($_POST['depart']) AND 
    isset($_POST['arriver']) AND 
    isset($_POST['countryCode_na']) AND 
    isset($_POST['telephone']) AND 
    //!empty($_POST['email']) AND 
    isset($_POST['date']) AND 
    isset($_POST['timepicker']) AND 
    isset($_POST['vehicule']) AND 
    isset($_POST['email']))
    {
 $pnom = $_POST['pnom'];
 $arriver = $_POST['arriver'];
 $depart = $_POST['depart'];
 $countryCode = $_POST['countryCode_na'];
 $telephone = $_POST['telephone'];
 $email = $_POST['email'];
 $vehicule = $_POST['vehicule'];


 
 
 $datetimealler = $_POST['date'];
 $timepicker = $_POST['timepicker'];
 //$datetimealler = $datetimealler." ".$timepicker;
 
 $date = time();
 //$prix = $_SESSION['price'];
 //$user=$_SESSION['id'];
 $telephone = $countryCode.$telephone;
 
 $result=mysqli_query($con, "INSERT INTO transfert_region (id_user, depart, destination, date, time,pnom, telephone,  email, vehicule, prix, distance,commentaire, timestamp) VALUE ( '', '".$depart."', '".$arriver."', '".$datetimealler."', '".$timepicker."' ,'".$pnom."', '".$telephone."', '".$email."',  '".$vehicule."', '0', '0', ' ' ,'".$date."') ");
//$result=mysqli_query($con, "INSERT INTO requetes_sanscompte (id_user, pnom, adresse, type_transfert, bagage, nbre_personne, type_vehicule, telephone, numvol, date, dateh_reservation, prix, mode_paiement, email, commentaire) VALUE ('".$pnom."', '".$adresse."', '".$typetransfert."', '".$bagage."', '".$nbre_personne."', '".$vehicule."' ,'".$telephone."', '".$numvol."', '".$date."', '".$datetimealler."', '".$prix."', '".$mode_paiement."', '".$email."', '".$commentaire."') ");

if($result)
{
sendEmail( "Nouvelle réservation | Subito", "Bonjour $pnom, votre réservation est bien enregistrée. Vous receverez un SMS et Email de confirmation une fois validée.\n\nMerci beaucoup et à bientôt");
 echo "success";
}
else
{
 echo "fail";
}

}