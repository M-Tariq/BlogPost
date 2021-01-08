const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');


//signup controller
var signup = async (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
    });
    //overwrite hashed password
    user.password = await User.generatehashedPassword(user.password);
    try {
        await user.save();
        return res.status(201).send(user.getPublicProfile());
    } catch (error) {
        return next({
            status: 409,
            message: error.message
        });
    }
}

var signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found. Please signup!");
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Email/Password wrong");
        }

        return res.status(200).send({
            token: await user.generateAuthToken(),
            user: user.getPublicProfile()
        });

    } catch (error) {
        return next({
            status: 401,
            message: error.message
        });

    }

}

var changePassword = async (req, res, next) => {
    try {
        const newHashedPassword = await User.generatehashedPassword(req.body.password);
        const result = await User.updateOne({ _id: req.user._id }, { $set: { password: newHashedPassword } });
        console.log(result);
        if (result.n != 1) {
            throw new Error("Password didn't change, Try again!")
        }
        return res.status(202).send({
            message: "Password changed successfuly!"
        });
    } catch (error) {
        return next({
            status: 412,
            message: error.message
        });
    }
}

var updateUser = async (req, res) => {
    try {
        const result = await User.updateOne({ _id: req.user._id }, { $set: req.body });
        if (result.n < 1) {
            throw new Error("Update profile failed!")
        }
        console.log(result);
        return res.status(202).send({
            message: "Profile updated successfully! ",
            result: ""+ result.n + " fields updated"
        });
    } catch (error) {
        return next({
            status: 412,
            message: error.message
        });
    }
}

var getLoggedInUser = async (req, res) => {
    return res.send(req.user);
}

var uploadProfilePic = async (req, res) => {
    User.uploadProfilePic();
    return res.send("Image uploaded");
}

module.exports = {
    signup, signin, getLoggedInUser, uploadProfilePic,
    updateUser, changePassword
};