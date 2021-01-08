const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const consts = require('../consts/consts');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    }
},
{
    timestamps: true
});

// virtual property `fullName`
UserSchema.virtual('fullName').
    get(function () {
        return `${this.firstName} ${this.lastName}`;
    });

UserSchema.statics.verifyPassword = async (password, hashedpassword) => {
    return await bcryptjs.compare(password, hashedpassword);
};

UserSchema.statics.generatehashedPassword = async (password) => {
    return await bcryptjs.hash(password, 8);
}

UserSchema.methods.getPublicProfile = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ user: user.getPublicProfile() }, consts.SECRET_KEY, { expiresIn: consts.TOKEN_EXPIRES_IN });
    return token;
}



const User = mongoose.model('User', UserSchema);
module.exports = User;