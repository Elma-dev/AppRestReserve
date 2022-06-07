<?php

    require_once("stripe-php-8.5.0/init.php");
    
    try{
        $stripe = new \Stripe\StripeClient("sk_test_51L7LjPEchne8mksri0ehPoEkSS5nRhYQ1C74xRSyc03acTwesLtvaBUNFDgQl1ERgb7VDPL1SrWafS2FUNsCJf0400XKi4zFeh");
        
        $stripe->paymentIntents->create(
            ['amount' => 5000, 'currency' => 'usd', 'payment_method' => "pm_card_visa",'description'=>'Commands Plats']
          );
        
    }
    catch(Exception $e){
        echo $e->getMessage();
    }



?>