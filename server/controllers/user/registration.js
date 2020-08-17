import {Router} from 'express';
import config from "config";

import {clientRedis} from "../../../index";
import {addUser} from "../../services/user.service";
import {ValidateUser} from "../../middlewares/Validator";
import errorHandler from "../../utils/errorHandler";

const router = Router();
const expiresInRefreshToken = config.get('expiresInRefreshToken');

router.post("/registration", ValidateUser, async (req,res) => {
    try {
        const {token, refreshToken} = await addUser(req.body, res);
        // clientRedis.get(String(userId), (err, res) => {
        //     console.log(res, 'get one')
        // });
        // clientRedis.keys('*', (err, res) => {
        //     res.map(key => clientRedis.get(key, (err, res) => console.log(res, 'get all')))
        // });
        // clientRedis.flushdb(() => console.log('success'));
        return res.status(201).json({token, refreshToken});
    } catch (e) {
        errorHandler(res, 'error registration', e);
    }
});

export default router