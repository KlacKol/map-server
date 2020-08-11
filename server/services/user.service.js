import {UserSchema} from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "config";



export const getUserById = async (id) => {
    return UserSchema.findById(id);
};


export const addUser = async (data, res) => {
    const userEmail = await UserSchema.findOne({email: data.email});
    const userName = await UserSchema.findOne({name: data.name});
    if (userEmail) {
        return res.status(409).json({message: 'user exist with this email'})
    } else if (userName) {
        return res.status(409).json({message: 'user exist with this name'})
    }
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    return UserSchema.create(data);
};

export const loginUser = async (data, res) => {
    const candidate = await helperForLogin(data);
    const passwordResult = bcrypt.compareSync(data.password, candidate.password);
    if (passwordResult) {
        const key = config.get('jwtKey');
        const token = jwt.sign({
            email: candidate.email,
            name: candidate.name,
            userId: candidate._id
        }, key, {expiresIn: 3600});
        return {
            expiresIn: 3600,
            token: `Bearer ${token}`,
            name: candidate.name,
            email: candidate.email,
            userId: candidate._id
        }
    } else {
        return res.status(401).json({message: `wrong password or ${param}`})
    }
};

const helperForLogin = async (data) => {
    if (data.email) {
        return UserSchema.findOne({email: data.email});
    } else if (data.name) {
        return UserSchema.findOne({name: data.name});
    }
};
