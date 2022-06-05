<?php
    require('connectdb.php');
    
    $method=$_SERVER['REQUEST_METHOD'];

    
    if($method=='POST'){
        $id=$_POST['id'];
        $idTable=$_POST['idTable'];

        if(isset($_POST['idCommande'])){
            $idCommande=$_POST['idCommande'];
            $r=$db->prepare("update commandes set accepte=1 where idCommande=$idCommande");
            $r->execute();
        }
        else if(isset($_POST['idHome'])){
            $id=$_POST['idHome'];
            $r=$db->prepare("select * from usersinfo natural join tables where id=$id");
            if($r->execute()){
                $resultat=$r->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($resultat);
                
            }
        }
        else if(isset($_POST['active'])){
            $active=$_POST['active'];
            $r=$db->prepare("update tables set active=$active where id=$id and idTable=$idTable");
            $r->execute();
        }
        else{
            $r=$db->prepare("select * from usersinfo natural join tables join commandes on idTable=numTable where id=$id and idTable=$idTable");
            
            if($r->execute()){
                $resultat=$r->fetchAll(PDO::FETCH_ASSOC);
                if(count($resultat)==0){
                    $r=$db->prepare("select * from usersinfo natural join tables where id=$id and  idTable=$idTable");
                    if($r->execute())$resultat=$r->fetchAll(PDO::FETCH_ASSOC);
                }
                echo json_encode($resultat);
            }
        }
    }




?>