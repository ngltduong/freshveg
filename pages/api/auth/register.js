import connectDB from "../../../utils/connectDB"
import Users from "../../../models/userModel"
import {validRegister} from "../../../utils/valid"
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break
    }
}

const register = async (req, res) => {
    try{
        const {fullname, surname, email, password, phone} = req.body
        const errMsg = validRegister(fullname, surname, email, password, phone)
        if(errMsg) return res.status(400).json({err: errMsg})

        const user = await Users.findOne({email})
        if(user) return res.status(400).json({err: 'This email already exists.'})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new Users({
            fullname, 
            surname, 
            email, 
            password: passwordHash, 
            phone
        })

        await newUser.save()

        res.json({msg: "Register Success!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}