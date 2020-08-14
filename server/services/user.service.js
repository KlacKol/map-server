import {UserSchema} from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "config";
import errorHandler from "../utils/errorHandler";

const expiresInToken = config.get('expiresInToken');
const expiresInRefreshToken = config.get('expiresInRefreshToken');

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
    return tokenFormation(candidate);
};

export const loginUser = async (data, res) => {
    const param = helperForLogin(data, res);
    const candidate = await UserSchema.findOne({[param]: data[param]});
    const passwordResult = bcrypt.compareSync(data.password, candidate.password);
    if (passwordResult) {
        return tokenFormation(candidate)
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
        userId: data._id,
        name: data.name,
        type: 'access'
    }, key, {expiresIn: expiresInToken});
};

const refreshTokenFormation = (data) => {
    const key = config.get('refreshKey');
    return jwt.sign({
        userId: data._id,
        name: data.name,
        type: 'refresh'
    }, key, {expiresIn: expiresInRefreshToken});
};
