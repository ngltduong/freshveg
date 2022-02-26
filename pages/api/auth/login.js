import connectDB from "../../../utils/connectDB"
import Users from "../../../models/userModel"
import {createAccessToken, createRefreshToken} from "../../../utils/generateToken"
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break
    }
}

const login = async (req, res) => {
    try{
        const {emailSignIn, passwordSignIn} = req.body
        // const errMsg = validate(fullname, surname, email, password, phone)
        // if(errMsg) return res.status(400).json({err: errMsg})

        console.log(emailSignIn)
        const userSignIn = await Users.findOne({email: emailSignIn})
        console.log(userSignIn)
        if(!userSignIn) {
            // console.log(emailSignIn)
            return res.status(400).json({err: 'This user does not exists.'})
        }
        const isMatch = await bcrypt.compare(passwordSignIn, userSignIn.password)
        if(!isMatch) return res.status(400).json({err: 'Incorrect password.'})

        const access_token = createAccessToken({id: userSignIn._id})
        const refresh_token = createRefreshToken({id: userSignIn._id})

        res.json({
            msg:'Login Success!',
            refresh_token,
            access_token,
            user: {
                fullname: userSignIn.fullname,
                surname: userSignIn.surname,
                email: userSignIn.email,
                role: userSignIn.role,
                avatar: userSignIn.avatar,
                root: userSignIn.root,
                phone: userSignIn.phone,
            }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}