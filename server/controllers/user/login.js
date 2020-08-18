import {Router} from 'express';

import {loginUser} from "../../services/user.service";
import errorHandler from "../../utils/errorHandler";

const router = Router();

router.post("/login", async (req,res) => {
    try {
        const {token, refreshToken} = await loginUser(req.body, res);
        return res.status(200).json({token, refreshToken});
    } catch (e) {
        errorHandler(res, 'error login: ', e);
    }
});

export default router