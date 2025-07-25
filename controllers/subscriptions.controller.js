import Subscription from '../models/subscription.model.js'

export const getAllSubscriptions =async(req, res, next)=>{
    try{
        const allSubscriptions = await Subscription.find({user: req.user._id});

        if (!allSubscription) {
            return res.status(404).json({
                success: false,
                message: "Subscriptions not found"
            });
        }
        res.status(200).json({
            success:true,
            count: allSubscriptions.length,
            message:'Subscription fetched successfully',
            data: allSubscriptions
        });

    }catch(err){
        next(err);
    }
};

export const getSubscription = async(req, res, next)=>{
    try{
        const subscription = await Subscription.findOne({_id:req.params.id, user:req.user._id});
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Subscription fetched successfully",
            data: subscription
        });
    }catch(err){
        next(err);
    }
}

export const createSubscription =async (req, res, next)=>{
    try{
         const {
            name,
            price,
            frequency,
            category,
            paymentMethod,
            startDate,
            renewalDate
        } = req.body;

        const subscription = await Subscription.create({
            name,
            price,
            frequency,
            category,
            paymentMethod,
            startDate,
            renewalDate,
            user:req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription
        });

    }catch(err){
        next(err);
    }
};

export const deleteSubscription = async(req, res, next)=>{
    try{
        const deletedSubscription = await Subscription.findOneAndDelete({_id:req.params.id, user:req.user._id});

        if(!deletedSubscription){
            return res.statuscode(404).json({success:false, message:"Subscription not found"});
        }

        res.status(200).json({success: true, message:"Subscription deleted successfully"});

    }catch(err){
        next(err);
    }
} 

