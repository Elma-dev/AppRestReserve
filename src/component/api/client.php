<?php
    require('connectdb.php');
    $method=$_SERVER['REQUEST_METHOD'];
    if($method=='POST'){
        $id=$_POST['id'];
        $r=$db->prepare("select plats.id as idPlat,nomCat,nomPlat,prix,descr,imgurl from plats plats join categorie on plats.idCat=categorie.id natural join menu where idMenager=$id group by nomCat,nomPlat,prix,descr,imgurl,plats.id;");
        if($r->execute()){
            $result=$r->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        }
    }

?>
