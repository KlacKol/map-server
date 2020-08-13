import {UserSchema} from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "config";
import errorHandler from "../utils/errorHandler";



export const getUserById = async (id) => {
    return UserSchema.findById(id);
};


export const addUser = async (data, res) => {
    const userExist = await UserSchema.findOne({email: data.email});
    if (userExist) {
        return res.status(409).json({message: 'user exist with this email'})
    }
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    const candidate = await UserSchema.create(data);
    const token = tokenFormation(candidate);
    return {
        expiresIn: 3600,
        token: `Bearer ${token}`,
    }
};

export const loginUser = async (data, res) => {
    const param = helperForLogin(data, res);
    const candidate = await UserSchema.findOne({[param]: data[param]});
    const passwordResult = bcrypt.compareSync(data.password, candidate.password);
    if (passwordResult) {

        const token = tokenFormation(candidate);
        return {
            expiresIn: 3600,
            token: `Bearer ${token}`,
        }
    } else {
        return res.status(401).json({message: `wrong password or ${param}`})
    }
};

const helperForLogin = (data, res) => {
    if (data.email) {
        return 'email'
    } else if (data.name) {
        return 'name'
    } else {
        return errorHandler(res, 'data dont have email or name', '')
    }
};

const tokenFormation = (data) => {
    const key = config.get('jwtKey');
    return jwt.sign({
        email: data.email,
        name: data.name,
        userId: data._id
    }, key, {expiresIn: 3600});


}
