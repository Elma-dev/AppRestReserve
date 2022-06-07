<?php
    require_once("stripe-php-8.5.0/init.php");
    $stripe = new \Stripe\StripeClient("sk_test_51L7LjPEchne8mksri0ehPoEkSS5nRhYQ1C74xRSyc03acTwesLtvaBUNFDgQl1ERgb7VDPL1SrWafS2FUNsCJf0400XKi4zFeh");
    $amount=$_POST['amount'];
    $id=$_POST['id'];
    try{
        $stripe = new \Stripe\StripeClient("sk_test_51L7LjPEchne8mksri0ehPoEkSS5nRhYQ1C74xRSyc03acTwesLtvaBUNFDgQl1ERgb7VDPL1SrWafS2FUNsCJf0400XKi4zFeh");
        
        $stripe->paymentIntents->create(
            ['amount' => $amount*100, 'currency' => 'mad', 'payment_method' => "$id",'description'=>'Commands Plats','confirm'=>true]
        );
        echo json_encode("Valide");
        
    }
    catch(Exception $e){
        echo $e->getMessage();
    }




?>