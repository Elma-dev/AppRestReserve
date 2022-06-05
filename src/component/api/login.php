<?php
    require('connectdb.php');

    $email='';
    $password='';
    $r='';

    $method=$_SERVER['REQUEST_METHOD'];

    if($method=='POST'){
        $email=sha1($_POST['email']);
        $password=sha1($_POST['password']);
        $r=$db->prepare("select * from usersinfo where email='$email' and password='$password'");
        if($r->execute()){
            $result=$r->fetchAll(PDO::FETCH_ASSOC);
            if(count($result)>0){
                $response=['status'=>1,'message'=>'Success'];
                $result['status']=1;
                
                echo json_encode($result );
            }else{
                $response=['status'=>0,'message'=>'Failed'];
                echo json_encode($response);
            }
        }
            
    }

    
    


?>