<?php
header('Access-Control-Allow-Origin: *');
require "connexion.php";

if ( isset($_POST['username']) AND isset($_POST['password']) )
{

$username = mysqli_real_escape_string($con,$_POST['username']);
$password = mysqli_real_escape_string($con,$_POST['password']);

$request = mysqli_query($con,"SELECT * FROM manager WHERE email = '".$username."' AND password = '".$password."'");

if(count($row=mysqli_fetch_array($request))>0)
  {

  session_start();

  $_SESSION['role']=$row['role'];
  $_SESSION['id']=$row['id'];
  $_SESSION['pnom']=$row['pnom'];

  return print(json_encode($row));

}
else
  {
  echo "fail";

}
}

?>