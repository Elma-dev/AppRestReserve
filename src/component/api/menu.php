<?php

require('connectdb.php');
$method=$_SERVER['REQUEST_METHOD'];

if($method="POST"){
    $id=$_POST['id'];
    
    $nameCat=$_POST['nameCat'];
    //print_r($_POST);
    $r=$db->prepare("select idMenu from menu where idMenager=$id");
    $r->execute();
    $idMenu=$r->fetchAll();
    $idMenu=$idMenu[0]['idMenu'];

    $r=$db->prepare("insert into categorie values (null,'$nameCat',$idMenu)");
    $r->execute();
}



?>