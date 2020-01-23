<?php
header('Access-Control-Allow-Origin: *');

    include "connexion.php";
    

    $code = $_GET['id'];
    
    $rs = mysqli_query($con, "SELECT * FROM entreprise where id = '$code'");
    
    if ($rs != null) {    
    while ($e=mysqli_fetch_assoc($rs)) {
            $output[]=$e;
    }
}

    return print(json_encode($output));