import connectDB from "../../../../utils/connectDB"
import Products from "../../../../models/productModel"

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProductsByCategory(req, res)
            break
    }
}

const getProductsByCategory = async (req, res) => {
    try{
        const { category } = req.query
        // console.log(category)
        const products = await Products.find({category: category})
        // console.log(products)
        if(!products) 
            return res.status(400).json({err: 'This product does not exist.'})

        res.json({
            products
        })

    } catch(err){
        return res.status(500).json({err: err.message})
    }
}