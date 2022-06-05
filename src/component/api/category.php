<?php
    require('connectdb.php');
    $method=$_SERVER['REQUEST_METHOD'];
    

    if($method=='POST'){
        $id=$_POST['id'];
        
        if($_POST['idPlat']){
            $idPlat=$_POST['idPlat'];
            $r=$db->prepare("delete from plats where id=$idPlat;");
        }
        else if($_POST['nomCat']){
            
            $nomCat=$_POST['nomCat'];
            $nomPlat=$_POST['nomPlat'];
            $description=$_POST['description'];
            $url=$_POST['url'];
            $prix=$_POST['prix'];

            $r=$db->prepare("select id from categorie where nomCat='$nomCat';");
            $r->execute();
            $idCat=$r->fetchAll();
            $idCat=$idCat[0]['id'];

            $r=$db->prepare("insert into plats values(null,$idCat,'$nomPlat','$description',$prix,'$url')");

        }
        else{
            $r=$db->prepare("select nomCat from categorie natural join menu where idMenager=$id group by nomCat;");
        }

        if($r->execute()){
            $result=$r->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        }

    }



?>