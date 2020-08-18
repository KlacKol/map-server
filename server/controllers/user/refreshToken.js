import {Router} from 'express';

import {refreshUserToken} from "../../services/user.service";
import errorHandler from "../../utils/errorHandler";

const router = Router();

router.post("/refresh", async (req,res) => {
    try {
        const {token, refreshToken} = await refreshUserToken(req.body);
        return res.status(200).json({token, refreshToken});
    } catch (e) {
        errorHandler(res, 'error refreshToken: ', e);
    }
});

export default router