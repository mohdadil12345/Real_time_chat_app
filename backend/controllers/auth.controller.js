import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {



    try {

        const { fullName, username, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });


        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });




        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });



    } catch (error) {
        console.log(error)
    }

}


// {
//     "fullName": "john Doe",
//       "username": "johndoe",
//       "password": "adil123",
//       "confirmPassword": "adil123",
//       "gender": "male"
// }





export const login = async (req, res) => {
    console.log("login user")


}


export const logout = (req, res) => {
    console.log("logout user")

}