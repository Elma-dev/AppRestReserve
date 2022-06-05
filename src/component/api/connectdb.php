<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers', 'Content-Type');
    header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');

    
    try{
        $db=new PDO('mysql:host=localhost;dbname=usersbd;charset:utf-8','root','root');
    }catch(Exception $e){
        die("Erreur".$e->getMessage());
    }


?>