<?php

    if (isset($table_requete) AND $table_requete == 'req_sc') $table_requete = "requetes_sanscompte";
    if (isset($table_requete) AND $table_requete == 'req_e') $table_requete = "requetes_entreprise";
    if (isset($table_requete) AND $table_requete == 'req_ac') $table_requete = "requetes_compte";
    if (isset($table_requete) AND $table_requete == 'tr') $table_requete = "transfert_region";
    if (isset($table_requete) AND $table_requete == 'tu') $table_requete = "taxiu";

?>