import Stripe from "stripe"
const stripe=new Stripe("sk_test_51L7LjPEchne8mksri0ehPoEkSS5nRhYQ1C74xRSyc03acTwesLtvaBUNFDgQl1ERgb7VDPL1SrWafS2FUNsCJf0400XKi4zFeh")
export default async(req,res)=>{
    const {id,mount}=req.body;
    console.log("Hi HI")
    try{
        const payment=await stripe.paymentIntents.create({
            amount,
            currency:'MAD',
            description:'Plats',
            payment_method:id,
            confirm:true
        })
        console.log(payment);
        return res.status(200).json({
            confirm:'abc123'
        })
    }
    catch(error){

    }

}
