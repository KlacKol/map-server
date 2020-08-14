import {Router} from 'express';
import {loginUser} from "../../services/user.service";
import errorHandler from "../../utils/errorHandler";
const router = Router();

router.post("/refresh", async (req,res) => {
    try {
        const data = await loginUser(req.body, res);
        return res.cookie('refresh_token', data, {
            httpOnly: true,
        })
    } catch (e) {
        errorHandler(res, 'error login: ', e);
    }
});

export default router