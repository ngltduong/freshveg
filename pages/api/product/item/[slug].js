import connectDB from "../../../../utils/connectDB"
import Products from "../../../../models/productModel"
import auth from "../../../../middleware/auth"
connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break
        case "PUT":
            await updateProduct(req, res)
            break
    }
}

const getProduct = async (req, res) => {
    try{
        
            const { slug } = req.query
            // console.log(slug)
            const product = await Products.findOne({slug: slug})
            if(!product) return res.status(400).json({err: 'This product does not exist.'})
    
            res.json({
                product
            })
        
    } catch(err){
        return res.status(500).json({err: err.message})
    }
}

const updateProduct = async (req, res) => {
    try{
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: "Authentication is not valid"})
        
        let newSlug
        if(req.query.slug){
            newSlug = req.query.slug
        }
        const {product_id, title, price, inStock, description, content, category, slug, images} = req.body

        if(!product_id || !title || !price || !inStock || 
           !description || !content || category === 'all' || images.length === 0 )
           return res.status(400).json({err: "Please add all the fields."})

        await Products.findOneAndUpdate({slug: newSlug}, {
            product_id, title: title.toLowerCase(), price, inStock, description, content, category, slug, images
           })

        res.json({msg: 'Success! Updated a product'})
    } catch(err){
        return res.status(500).json({err: err.message})
    }
}