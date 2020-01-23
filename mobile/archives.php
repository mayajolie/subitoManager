<?php 
header('Access-Control-Allow-Origin: *');

include "connexion.php";

$date_now = date("Y-m-d H:i:s", strtotime('-24 hour')); // Format standard str_to_date | - 24H 
//echo $date_now; exit;
$list_reservation_All=mysqli_query($con, "
                                          SELECT * FROM (
                                          
                                                    SELECT id, date, null as id_user, pnom, telephone, dateh_reservation, adresse, numvol, type_transfert, null as depart, null as destination, CONCAT(nbre_personne, ':::', bagage, ':::', type_vehicule) as details, prix, mode_paiement, chauffeur, 'req_sc' AS `table` FROM requetes_sanscompte WHERE 1

                                                    UNION ALL 
                                                    SELECT id, date, id_entreprise as id_user, pnom, telephone, dateh_reservation, adresse, numvol, type_transfert, null as depart, null as destination, CONCAT(nbre_personne, ':::', bagage, ':::', type_vehicule) as details,  prix, mode_paiement, chauffeur, 'req_e' AS `table` FROM requetes_entreprise WHERE 1

                                                    UNION ALL
                                                    SELECT id, date, id_user, pnom, telephone, dateh_reservation, adresse, numvol, type_transfert, null as depart, null as destination, CONCAT(nbre_personne, ':::', bagage, ':::', type_vehicule) as details, prix, mode_paiement, chauffeur, 'req_ac' AS `table` FROM requetes_compte WHERE 1

                                                    UNION ALL
                                                    SELECT id, timestamp as date, id_user, pnom, telephone, CONCAT(date, '', time) as dateh_reservation, null as adresse, null as numvol, null as type_transfert, depart, destination, CONCAT(vehicule, ':::', distance) as details ,prix, mode_paiement, null as chauffeur, 'tr' AS `table` FROM transfert_region WHERE 1

                                                    UNION ALL
                                                    SELECT id, timestamp as date, id_user, pnom, telephone, CONCAT(date, '', timepicker) as dateh_reservation, null as adresse, null as numvol, null as type_transfert, depart, destination , null as details, prix, mode_paiement, null as chauffeur, 'tu' AS `table` FROM taxiu WHERE 1
                                          
                                                        ) dum WHERE STR_TO_DATE(dateh_reservation, '%d/%m/%Y %H:%i') < '$date_now' ORDER BY STR_TO_DATE(dateh_reservation,'%d/%m/%Y %H:%i') ASC
                                          ");


while ($e= mysqli_fetch_assoc($list_reservation_All)) {
        $output[]=$e;
    }

return print(json_encode($output));

?>