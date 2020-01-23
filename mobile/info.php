<?php
header('Access-Control-Allow-Origin: *');

if (isset($_POST['pnom']))
{
 require "connexion.php";
 
 $login = mysqli_real_escape_string($con,$_POST['pnom']); 

 $query="SELECT * FROM user WHERE pnom like'%".$login."%' OR telephone like'%".$login."%'";

 $result = mysqli_query($con,$query);

$users_arr = array();

    while( $row = mysqli_fetch_array($result) ){
        $userid = $row['id'];
        $pnom = $row['pnom'];
        $email = $row['email'];
        $telephone = $row['telephone'];
        $adresse = $row['adresse'];

        $users_arr[] = array("id" => $userid, "pnom" => $pnom,"email" => $email, "telephone" =>$telephone, "adresse" =>$adresse);
    }

    // encoding array to json format
    echo json_encode($users_arr);
    exit;
}
 //$select=mysqli_query($con, "SELECT * FROM user WHERE pnom='$login' OR telephone = '$login' or activation_code='$login' ");
/*
 while ($t= mysqli_fetch_assoc($select)) {
    $output[]=$t;
}
return print(json_encode($output));
}
 /*if(count($row=mysqli_fetch_array($select))>0)
 {
  
  session_start();

  $_SESSION['pnom']=$row['pnom'];
  $_SESSION['id']=$row['id'];
  $_SESSION['particulier']="Y";
  
  echo "success";
 }
 else
 {
  echo "fail";
 }
 exit();
}*/

?>