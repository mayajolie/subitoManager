<?php

header('Access-Control-Allow-Origin: *');


if (!empty($_FILES["photo_id"]["name"]) AND isset($_POST['pnom']) AND isset($_POST['telephone']) AND isset($_POST['telephone2']) AND isset($_POST['adresse']) AND isset($_POST['cin']) AND isset($_POST['permis']) AND isset($_POST['anniversaire']) )

{

    include "connexion.php";

$pnom = mysqli_real_escape_string($con,$_POST['pnom']);
$telephone = mysqli_real_escape_string($con,$_POST['telephone']);
$telephone2 = mysqli_real_escape_string($con,$_POST['telephone2']);
$motdepasse = mysqli_real_escape_string($con,$_POST['motdepasse']);
$adresse = mysqli_real_escape_string($con,$_POST['adresse']);
$cin = mysqli_real_escape_string($con,$_POST['cin']);
$permis = mysqli_real_escape_string($con,$_POST['permis']);
$anniversaire = mysqli_real_escape_string($con,$_POST['anniversaire']);
 $date = time();

$query = 'INSERT INTO  chauffeur (pnom, telephone, telephone2, motdepasse, adresse,cin, permis, anniversaire, photo_id, date)
VALUES ("' .$_POST['pnom']. '", "' .$_POST['telephone']. '","' . $_POST['telephone2'] . '", "' . $_POST['motdepasse'] . '",
"' . $_POST['adresse'] . '", "' . $_POST['cin'] . '","' . $_POST['permis'] . '", "' . $_POST['anniversaire'] . '", "' . $_FILES['photo_id']['name'] . '", " '.$date.' ")';
$res = mysqli_query($con, $query);
if ($res) {
   return (mysqli_insert_id($con));
}else{
    return false;

}
}

