import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "config";
import createError from 'http-errors'

import {UserSchema} from "../models/User";
import errorHandler from "../utils/errorHandler";
import {clientRedis} from "../../index";

const expiresInToken = config.get('expiresInToken');
const expiresInRefreshToken = config.get('expiresInRefreshToken');
const tokenKey = config.get('jwtKey');
const refreshKey = config.get('refreshKey');

export const getUserById = async (id) => {
    return UserSchema.findById(id);
};

export const deleteRefToken = async (id) => {
    return clientRedis.del(`${id}`);
};

export const refreshUserToken = async ({refreshToken}) => {
    try {
        return await jwt.verify(refreshToken, refreshKey, async (err, payload) => {
            if (err) {
                return createError.Unauthorized();
            }
            const refreshInRedis = await clientRedis.get(String(payload.userId));
            if (refreshInRedis) {
                const token = tokenFormation(payload.userId, payload.name);
                const refreshToken = refreshTokenFormation(payload.userId, payload.name);
                await saveToRedisRfToken(refreshToken, payload.userId);
                return {token, refreshToken}
            }
        })
    } catch (e) {
        console.log(e);
    }
};


export const addUser = async (data, res) => {
    const userExist = await UserSchema.findOne({email: data.email});
    if (userExist) {
        return res.status(409).json({message: 'user exist with this email'})
    }
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    const candidate = await UserSchema.create(data);
    const token = tokenFormation(candidate._id, candidate.name);
    const refreshToken = refreshTokenFormation(candidate._id, candidate.name);
    await saveToRedisRfToken(refreshToken, candidate._id);
    return {token, refreshToken};
};

export const loginUser = async (data, res) => {
    const param = helperForLogin(data, res);
    const candidate = await UserSchema.findOne({[param]: data[param]});
    if (candidate) {
        const passwordResult = bcrypt.compareSync(data.password, candidate.password);
        const token = tokenFormation(candidate._id, candidate.name);
        const refreshToken = refreshTokenFormation(candidate._id, candidate.name);
        if (passwordResult) {
            await saveToRedisRfToken(refreshToken, candidate._id);
            return {token, refreshToken}
        } else {
            return res.status(401).json({message: `wrong password or ${param}`})
        }
    } else {
        return res.status(404).json({message: `User with this ${param} is not registered.`})
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

const tokenFormation = (userId, name) => {
    return jwt.sign({
        userId,
        name,
        type: 'access'
    }, tokenKey, {expiresIn: expiresInToken});
};

const refreshTokenFormation = (userId, name) => {
    return jwt.sign({
        userId,
        name,
        type: 'refresh'
    }, refreshKey, {expiresIn: expiresInRefreshToken});
};

const saveToRedisRfToken = async (refreshToken, userId) => {
    await clientRedis.setex([`${userId}`, expiresInRefreshToken, `${refreshToken}`]);
};
