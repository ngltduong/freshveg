import connectDB from "../../../utils/connectDB"
import Products from "../../../models/productModel"
import auth from "../../../middleware/auth"
connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProductItem(req, res)
            break
        case "PUT":
            await updateProductItem(req, res)
            break
        case "DELETE":
            await deleteProductItem(req, res)
            break
    }
}

const getProductItem = async (req, res) => {
    try{
        
            const { id } = req.query
            const product = await Products.findOne({_id: id})
            if(!product) return res.status(400).json({err: 'This product does not exist.'})
    
            res.json({
                product
            })
    } catch(err){
        return res.status(500).json({err: err.message})
    }
}

const updateProductItem = async (req, res) => {
    try{
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: "Authentication is not valid"})
        
        let id
        if(req.query.id){
            id = req.query.id
        }
        const {product_id, title, price, inStock, description, content, category, slug, images} = req.body

        if(!product_id || !title || !price || !inStock || 
           !description || !content || category === 'all' || images.length === 0 )
           return res.status(400).json({err: "Please add all the fields."})

        await Products.findOneAndUpdate({_id: id}, {
            product_id, title: title.toLowerCase(), price, inStock, description, content, category, slug, images
           })

        res.json({msg: 'Success! Updated a product'})
    } catch(err){
        return res.status(500).json({err: err.message})
    }
}

const deleteProductItem = async (req, res) => {
    try{
        const result = await auth(req, res)
        if(result.role !== 'admin') 
            return res.status(400).json({err: "Authentication is not valid"})
        
        const { id } = req.query

        await Products.findByIdAndDelete({_id: id})

        res.json({
            msg: "Deleted a product!"
        })
        
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}