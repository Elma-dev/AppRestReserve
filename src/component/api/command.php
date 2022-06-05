<?php
    require('connectdb.php');
    $method=$_SERVER['REQUEST_METHOD'];
    if($method=='POST'){
        $id=$_POST['id'];
        $table=$_POST['table'];
        $nbrPlat=$_POST['nbrPlat'];
        $prixTot=$_POST['prixTot'];
        $cache=0;
        $nomPlats=$_POST['nomPlats'];

        if($_POST['payType']=='cache'){
            $cache=1;
        }

        $r=$db->prepare("insert into commandes(numTable,idMenager,cache,accepte,prixTotal,nbrPlats,details) values($table,$id,$cache,0,$prixTot,$nbrPlat,'$nomPlats')");
        if($r->execute()){
            $resultat='Success';
            echo json_encode($resultat);
        };
        
    }

?>