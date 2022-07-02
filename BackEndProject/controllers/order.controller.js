const orderModel = require("../database/models/order.model")

class Order {
    static add = async (req, res) => {
        //detail => req.body, userId=> req.user
        try {
            const orderData = new orderModel({
                ...req.body.id,
                userId: req.user._id
            })
            await orderData.save()
            res.status(200).send({
                apiStatus: true,
                data: orderData,
                message: "added"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }
    static updateOrder = async (req, res) => {
        try {
            const updateOrder = await orderModel.findByIdAndUpdate(req.params.id)
            updateOrder.data = req.body.data
            await updateOrder.save()
            res.status(200).send({
                apiStatus: true,
                data: updateOrder,
                message: "Update Product Order"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    //delete Order
    static deleteOrder = async (req, res) => {
        try {
            const orderData = await orderModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: orderData,
                message: "Delete Product Order"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    //show Order
    static myOrder = async (req, res) => {
        try {
            const orderData = await orderModel.find({ userId: req.user._id })
            res.status(200).send({
                apiStatus: true,
                data: orderData,
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    /* 
    static myCart = async(req,res)=>{
        // await productModel.find({userId:req.user._id})
        try{
            await req.user.populate("myCart")
            res.status(200).send({data:req.user.myCart})
        }
        catch(e){
            res.status(500).send({err:e.message})
        }
    }
*/

    //showAll
    static allOrder = async (req, res) => {

        try {
            allOrder = await orderModel.find();
            res.status(200).send({
                apiStatus: true,
                data: allOrder,
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, error: e, message: e.message })
        }
    }

    //statusOrder
    static statusOrder = async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth() - 1));

        try {
            const order = orderModel.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        $month: "$createdAt"
                    },
                    sales: "$amount"
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" }
                    },
                },
            ]);
            await order.save()
            res.status(200).send({
                apiStatus: true,
                data: order,
                message: "added"
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }
}
module.exports = Order