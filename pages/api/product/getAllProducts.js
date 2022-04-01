import connectDB from "../../../utils/connectDB"
import Products from "../../../models/productModel"

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getAllProducts(req, res)
            break
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await Products.find()
        if(!products)
            return res.status(400).json({err: "Empty products"})
        res.json({
            products
        })
    } catch(err){

    }
}
