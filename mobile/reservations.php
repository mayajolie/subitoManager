				
			
<?php 



include "connexion.php";

$q=mysqli_query($con,"SELECT requetes_compte. * FROM requetes_compte, user where  user.id = requetes_compte.id_user AND statut_validation = 1 AND cancelled = 0");
$entr=mysqli_query($con,"SELECT requetes_entreprise. * FROM requetes_entreprise, entreprise where entreprise.id = requetes_entreprise.id_entreprise AND statut_validation = 1 AND cancelled = 0");
  while ($e= mysqli_fetch_assoc($q)) {
    $output[]=$e;
  }
 
  while ($e= mysqli_fetch_assoc($entr)) {
    $output[]=$e;

    $libell= $e['id_entreprise'];
    $lib=mysqli_query($con,"SELECT libelle_entreprise FROM entreprise WHERE id = '.$libell.'");
    while ($li= mysqli_fetch_assoc($lib)) {
      $output[]=$li;
    echo $li;
    die;
    }
  }
 



/* $q=mysqli_query($con, "SELECT requetes_compte.* FROM requetes_compte,user where  user.id = requetes_compte.id_user AND statut_validation = 1 AND cancelled = 0");
 $en=mysqli_query($con,"SELECT  requetes_entreprise.* FROM requetes_entreprise,entreprise where  entreprise.id = requetes_entreprise.id_entreprise AND statut_validation = 1 AND cancelled = 0");
 while($m=mysqli_fetch_assoc($en)){
  print(json_encode($m));
  echo" <h2>saut</h2>"; 
}  
 while($e=mysqli_fetch_assoc($q)){
  
print_r($e);
echo" <h2>saut</h2>";
      }
  

  

  
  /*     $dat= explode(' ',$e["dateh_reservation"]);
     $m= $dat[0];
     echo $m;
    $date=str_replace('/','-',$m);
     $d= date("m-d-y",strtotime($m));     

    $tab_jours = array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
    $tab_joursA = array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
    $Y=strftime("%A", strtotime($date));
    for ($j=0; $j <sizeof($tab_joursA) ; $j++) { 

      //  echo $tab_jours[$j];

        if ($tab_joursA[$j]==$Y) {
            echo $tab_jours[$j];
            
           // dump($value);

        }
    } */

  
 
  
?>
