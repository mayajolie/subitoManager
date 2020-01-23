			
<?php 
header('Access-Control-Allow-Origin: *');

include "connexion.php";


function get_entreprise_Name($id)
{
require "../inc/config.php";
$pnom_chauffer=mysqli_fetch_array(mysqli_query($con, "SELECT libelle_entreprise FROM entreprise WHERE id = '".$id."' "));
return $pnom_chauffer['libelle_entreprise'];
}                                          
 

$date_now = date("Y-m-d H:i:s", strtotime('-24 hour')); // Format standard str_to_date | - 24H 
//echo $date_now; exit;
$list_reservation_All=mysqli_query($con, "
                                          SELECT * FROM (
                                          
                                                    SELECT id, date, null as id_user, pnom, telephone, dateh_reservation, adresse, numvol, type_transfert, null as depart, null as destination, CONCAT(nbre_personne, ':::', bagage, ':::', type_vehicule) as details, prix, mode_paiement, chauffeur, 'req_sc' AS `table` FROM requetes_sanscompte WHERE statut_validation = 1 AND cancelled = 0

                                                    UNION ALL 
                                                    SELECT id, date, id_entreprise as id_user, pnom, telephone, dateh_reservation, adresse, numvol, type_transfert, null as depart, null as destination, CONCAT(nbre_personne, ':::', bagage, ':::', type_vehicule) as details,  prix, mode_paiement, chauffeur, 'req_e' AS `table` FROM requetes_entreprise WHERE statut_validation = 1 AND cancelled = 0

                                                    UNION ALL
                                                    SELECT id, date, id_user, pnom, telephone, dateh_reservation, adresse, numvol, type_transfert, null as depart, null as destination, CONCAT(nbre_personne, ':::', bagage, ':::', type_vehicule) as details, prix, mode_paiement, chauffeur, 'req_ac' AS `table` FROM requetes_compte WHERE statut_validation = 1 AND cancelled = 0

                                                    UNION ALL
                                                    SELECT id, timestamp as date, id_user, pnom, telephone, CONCAT(date, '', time) as dateh_reservation, null as adresse, null as numvol, null as type_transfert, depart, destination, CONCAT(vehicule, ':::', distance) as details ,prix, mode_paiement, null as chauffeur, 'tr' AS `table` FROM transfert_region WHERE validation = 1 AND cancelled = 0

                                                    UNION ALL
                                                    SELECT id, timestamp as date, id_user, pnom, telephone, CONCAT(date, '', timepicker) as dateh_reservation, null as adresse, null as numvol, null as type_transfert, depart, destination , null as details, prix, mode_paiement, null as chauffeur, 'tu' AS `table` FROM taxiu WHERE statut_validation = 1 AND cancelled = 0
                                          
                                                        ) dum WHERE STR_TO_DATE(dateh_reservation, '%d/%m/%Y %H:%i') >= '$date_now' ORDER BY STR_TO_DATE(dateh_reservation,'%d/%m/%Y %H:%i') ASC
                                          ");

while ($e= mysqli_fetch_assoc($list_reservation_All)) {

        if ($e['table'] == 'req_e') {
        
             //$e = mysqli_fetch_array(mysqli_query($con, "SELECT requetes_entreprise.id, requetes_entreprise.date, libelle_entreprise, requetes_entreprise.pnom, requetes_entreprise.telephone, requetes_entreprise.dateh_reservation, requetes_entreprise.adresse, requetes_entreprise.numvol, requetes_entreprise.type_transfert, CONCAT(nbre_personne, ':::', bagage, ':::', type_vehicule) as details,  requetes_entreprise.prix, requetes_entreprise.mode_paiement, 'req_e' AS `table` FROM requetes_entreprise, entreprise WHERE requetes_entreprise.id = '".$e['id']."' AND statut_validation = 1 AND cancelled = 0"));
        $e = mysqli_fetch_array(mysqli_query($con, "SELECT requetes_entreprise.*, entreprise.libelle_entreprise as libelle_entreprise, 'req_e' AS `table` FROM `requetes_entreprise`, entreprise WHERE `requetes_entreprise`.id = '".$e['id']."' AND `requetes_entreprise`.`id_entreprise`=entreprise.id " ));

        }
        
        $output[]=$e;
    
}
return print(json_encode($output));

 /*while ($reservations= mysqli_fetch_array($list_reservation_All)) { 
                     if ($reservations['table'] == "req_sc" || $reservations['table'] == "req_ac" || $reservations['table'] == "req_e") { echo "Navette" ; } elseif ( $reservations['table'] == 'tr' ) { echo "T. Reg" ;} elseif ( $reservations['table'] == 3 ) { echo "Aller & Retour" ;} 
                     echo $reservations['table'] != 'req_e' ? '<b><span style="color:red">Particulier</span></b>' : '<b><span style="color:blue">Entreprise</span></b>' ; 
                     echo $reservations['pnom'] ; 
                     echo $reservations['telephone'] ; 
                     echo $reservations['dateh_reservation'] ; 
                    
                     if ($reservations['table'] != "tr" AND $reservations['type_transfert'] == 1) { echo $reservations['adresse'] ; } 
                     if ($reservations['table'] != "tr" AND $reservations['type_transfert'] == 2) { echo "AIBD"; } 
                     if ($reservations['table'] != "tr" AND $reservations['type_transfert'] == 3) { echo $reservations['adresse']."-> AIBD" ; } 
                     if ($reservations['table'] == "tr") { $depart = explode(":::", $reservations['adresse']) ; echo $depart[0]; } 
                    </td>

                    <td>
                     if ($reservations['table'] != "tr" AND $reservations['type_transfert'] == '1') { echo "AIBD" ; } 
                     if ($reservations['table'] != "tr" AND $reservations['type_transfert'] == 2) { echo $reservations['adresse']; } 
                     if ($reservations['table'] != "tr" AND $reservations['type_transfert'] == 3) { echo "AIBD ->".$reservations['adresse'] ; } 
                     if ($reservations['table'] == "tr") { $destination = explode(":::", $reservations['adresse']) ; echo $destination[1]; }
                    
                     $details = explode(":::", $reservations['details']) ; 
                    
                    if ($reservations['table'] != "tr") {
                     echo " ".$details[0] ; <br><br>
                    <i class="icon-bag"></i> echo " ".$details[1] ; <br><br>
                    <i class="icon-car"></i> echo " ".$details[2] ; <br><br>
                    <i class="icon-coins"></i>  echo $reservations['prix'] ;  F<br><br>
                    <i class="icon-airplane2"></i> Vol :  echo $reservations['numvol'] == null ? "N/A" : $reservations['numvol']  ; 									
                    
                     } else 
                    
                    if ($reservations['table'] == "tr") { 
                    <i class="icon-car"></i> echo " ".$details[0] ; <br><br>
                    <i class="icon-meter-fast"></i> echo " ".$details[1] ;  km<br><br>
                    <i class="icon-coins"></i>  echo $reservations['prix'] ;  F<br>
                    
                     } 
                    

                     echo $reservations['mode_paiement'] ; 
                     echo $reservations['chauffeur'] == null ? 'N/A' : get_chauffeur($reservations['chauffeur']) ; 
                                                        
                    <td class="text-center">
                        <ul class="icons-list">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="icon-menu9"></i>
                                </a>

                                <ul class="dropdown-menu dropdown-menu-right" style="width:max-content">
                                
                                     if ($reservations['statut_validation'] == "0") { 												
                                  <li><a onclick="if (confirm('Voulez-vous continuer ?')){return true;}else{event.stopPropagation(); event.preventDefault();};" href="inc/validate.php?d= echo $reservations['date'];&i=<?php echo $reservations['id'];&t=<?php echo $reservations['table'];"><i class="icon-undo"></i> Valider la réservation</a></li>
                                    <?php } 
                                    
                                    <li><a onclick="if (confirm('Voulez-vous continuer ?')){return true;}else{event.stopPropagation(); event.preventDefault();};" href="inc/cancel.php?d=<?php echo $reservations['date'];&i=<?php echo $reservations['id'];&t=<?php echo $reservations['table'];"><i class="icon-warning"></i> Décliner la réservation</a></li>
                                    
                                    <?php if ($reservations['table'] != "tr") { 
                                    <li><a onclick="if (confirm('Voulez-vous continuer ?')){return true;}else{event.stopPropagation(); event.preventDefault();};" href="#" data-toggle="modal" data-target="#modal_form_inline<?php echo $reservations['id'];"> Assigner un chauffeur<i class="icon-user-plus"></i></A></li>
                                    <?php } 
                                    
                                    <?php if ($reservations['statut_paiement'] == "0") { 
                                    <li><a onclick="if (confirm('Voulez-vous continuer ?')){return true;}else{event.stopPropagation(); event.preventDefault();};" href="inc/paid.php?d=<?php echo $reservations['date'];&i=<?php echo $reservations['id'];&t=<?php echo $reservations['table'];"><i class="icon-coins"></i> Paiement effectué</a></li>
                                    <?php } 
                                    
                                    <?php if ($role == 'admin') { 
                                    <li><a onclick="if (confirm('Voulez-vous continuer ?')){return true;}else{event.stopPropagation(); event.preventDefault();};" href="inc/delete.php?d=<?php echo $reservations['date'];&i=<?php echo $reservations['id'];&t=<?php echo $reservations['table'];"><i class="icon-cross2 text-danger"></i> Supprimer la réservation</a></li>
          <?php } 
                                </ul>
                            </li>
                        </ul>
                    </td>
    
    </tr>

<!-- Inline form modal -->
<div id="modal_form_inline<?php echo $reservations['id'];" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content text-center">
            <div class="modal-header">
      
                        
                        <div class="form-control-feedback">
                            <i class="icon-user text-muted"></i>
                        </div>
                    </div>

                </div>

                <div class="modal-footer text-center">
                    <button type="button" onclick="add_chauffeur(<?php echo $reservations['id'];?>); return false;" class="btn btn-primary">Valider <i class="icon-plus22"></i></button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- /inline form modal -->


<?php } ?





















//===========================pour les entreprises============================//
 /* while ($e= mysqli_fetch_assoc($entr)) {
    $libell= $e['id_entreprise'];
    //le nom de l'entreprise
    $lib=mysqli_query($con,"SELECT libelle_entreprise FROM entreprise WHERE id = $libell");
    while ($li=mysqli_fetch_assoc($lib)) {
    $aff= $li['libelle_entreprise'];
    }
    $dat= explode(' ',$e["dateh_reservation"]);
        $m= $dat[0];
       $date=str_replace('/','-',$m);
        $d= date("d-m-y",strtotime($m));     
       $tab_jours = array('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi','Dimanche');
       $tab_joursA = array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday');
       $Y=strftime("%A", strtotime($date));
       for ($j=0; $j <sizeof($tab_joursA) ; $j++) { 
           if ($tab_joursA[$j]==$Y) {
             $jr= $tab_jours[$j];
           }}
           if ($jr=="Lundi") {
            $output[]=$e;
        }

}*/
    //===========================pour les pariculiers=======================//
    
     
    

   
 

 