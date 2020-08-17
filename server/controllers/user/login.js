import {Router} from 'express';
import config from "config";

import {loginUser} from "../../services/user.service";
import errorHandler from "../../utils/errorHandler";
import {clientRedis} from "../../../index";

const router = Router();
const expiresInRefreshToken = config.get('expiresInRefreshToken');

router.post("/login", async (req,res) => {
    try {
        clientRedis.keys('*', (err, res) => {
            res.map(key => clientRedis.get(key, (err, res) => console.log(res, 'get all')))
        });
        const {token, refreshToken} = await loginUser(req.body, res);
        return res.status(200).json({token, refreshToken});
    } catch (e) {
        errorHandler(res, 'error login: ', e);
    }
});

export default router