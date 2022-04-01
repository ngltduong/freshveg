import connectDB from "../../../utils/connectDB"
import Products from "../../../models/productModel"

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getRandomProduct(req, res)
            break
    }
}

const getRandomProduct = async (req, res) => {
    try{

        const randomProduct = await Products.aggregate([{$sample: {size: 8}}])
        if(!randomProduct)
            return res.status(400).json({err: "Can't Get The Products"})
        res.json({
            randomProduct
        })

    } catch(err){
        return res.status(500).json({err: err.message})
    }
}