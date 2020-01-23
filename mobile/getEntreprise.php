<?php 
header('Access-Control-Allow-Origin: *');

include "connexion.php";
$q=mysqli_query($con,"SELECT * FROM entreprise ORDER BY entreprise.id DESC ");
while ($t= mysqli_fetch_assoc($q)) {
    $output[]=$t;
}
return print(json_encode($output));