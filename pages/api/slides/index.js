import connectDB from "../../../utils/connectDB"
import Slides from "../../../models/slidersModel"

connectDB()

export default async (req, res) => {
    switch(req.method){
        case"GET":
            await getSlides(req, res)
            break
    }
}

const getSlides = async (req, res) => {
    try{

        const slides = await Slides.find()
        // console.log(slides)
        // if(!slides)
        //     return res.status(400).json({err: "The Slides does not exist"})

        res.json({slides})

    } catch(err){
        return res.status(500).json({err: err.message})
    }

}