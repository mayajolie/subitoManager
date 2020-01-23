<?php 
header('Access-Control-Allow-Origin: *');
//session_start();
//echo '2000';


if (
    isset($_POST['vehicule']) AND 
    isset($_POST['bagage']) AND 
    isset($_POST['nbre_personne']) //AND 
    )
{



$vehicule = $_POST['vehicule'];
$nbre_personne = $_POST['nbre_personne'];
$bagage = $_POST['bagage'];

if ($nbre_personne <= 2 AND $bagage <= 3 AND $vehicule == "Berline") { echo '20000'; $_SESSION['price'] = "20000" ;  } // berline  
     elseif ($nbre_personne <= 2 AND $bagage <= 3 AND $vehicule == "MonoEspace") { echo '25000'; $_SESSION['price'] = "25000" ;  } // berline
     elseif ($nbre_personne <= 2 AND $bagage <= 3 AND $vehicule == "Van") { echo '45000'; $_SESSION['price'] = "45000" ; } // berline
     elseif ($nbre_personne <= 2 AND $bagage <= 3 AND ($vehicule == "MiniBus" || $vehicule == "Mbus")) { echo '60000'; $_SESSION['price'] = "60000" ;  } // berline
     elseif ($nbre_personne <= 2 AND $bagage <= 3 AND $vehicule == "Bus") { echo '80000'; $_SESSION['price'] = "80000" ;  } // berline
     
     elseif (($nbre_personne >= 3 AND $nbre_personne <= 4) AND $bagage <= 8 AND $vehicule == "MonoEspace") { echo '30000' ; $_SESSION['price'] = "30000";  } // monospace
     elseif (($nbre_personne >= 3 AND $nbre_personne <= 4) AND $bagage <= 8 AND $vehicule == "Van") { echo '45000' ; $_SESSION['price'] = "45000";  } // monospace
     elseif (($nbre_personne >= 3 AND $nbre_personne <= 4) AND $bagage <= 8 AND ($vehicule == "MiniBus" || $vehicule == "Mbus")) { echo '60000' ; $_SESSION['price'] = "60000";  } // monospace
     elseif (($nbre_personne >= 3 AND $nbre_personne <= 4) AND $bagage <= 8 AND $vehicule == "Bus") { echo '80000' ; $_SESSION['price'] = "80000";  } // monospace
     
     elseif (($nbre_personne == 57 || $nbre_personne <= 7) AND ($bagage <= 12 || $bagage == 112 || $bagage == 1320) AND $vehicule == "Van") { echo '45000' ; $_SESSION['price'] = "45000"; } // VAn
     elseif (($nbre_personne == 57 || $nbre_personne <= 7) AND ($bagage <= 12 || $bagage == 112 || $bagage == 1320) AND ($vehicule == "MiniBus" || $vehicule == "Mbus")) { echo '60000' ; $_SESSION['price'] = "60000"; } // VAn
     elseif (($nbre_personne == 57 || $nbre_personne <= 7) AND ($bagage <= 12 || $bagage == 112 || $bagage == 1320) AND $vehicule == "Bus") { echo '80000' ; $_SESSION['price'] = "80000";  } // VAn
     
     elseif (($nbre_personne == 815 AND ($vehicule == "MiniBus" || $vehicule == "Mbus"))) { echo '100000' ; $_SESSION['price'] = "100000";  } // MiniBus
     elseif ((($nbre_personne == 815 || $nbre_personne == 1627 || $nbre_personne == 2850) AND $vehicule == "Bus")) { echo '150000' ; $_SESSION['price'] = "150000";  } // Bus

}


?>