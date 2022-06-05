<?php
    require('connectdb.php');
    $method=$_SERVER['REQUEST_METHOD'];

    if($method=="POST"){

        $nomPlat=$_POST['nomPlat'];
        $descr=$_POST['descr'];
        $imgurl=$_POST['imgurl'];
        $prix=$_POST['prix'];
        $idPlat=$_POST['idPlat'];
        $r=$db->prepare("update plats set nomPlat='$nomPlat',descr='$descr',imgUrl='$imgurl',prix=$prix where id=$idPlat");
        if($r->execute()){
            $resultat='Success';
            echo json_encode($resultat);
        }
    }


?>