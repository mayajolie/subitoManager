<?php

    //$con=mysqli_connect("subitotajotaxi.mysql.db","subitotajotaxi","SubitoByC0NelSi19","subitotajotaxi");
      $con=mysqli_connect("localhost","root","","subitotajotaxi");
         mysqli_set_charset($con,"utf8");

    // Check connection
    if (mysqli_connect_errno())
      {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }
      
      $emailAdmin = 'contact@subitotaxi.net'; //'contact@subitotaxi.net';
?>