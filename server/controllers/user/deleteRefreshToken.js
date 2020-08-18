import {Router} from 'express';

import errorHandler from "../../utils/errorHandler";
import {deleteRefToken} from "../../services/user.service";

const router = Router();

router.delete("/refresh/:id", async (req,res) => {
    try {
        const success = await deleteRefToken(req.params.id);
        console.log(success, 'success');
        if (success) {
            return res.status(204).end();
        }
        return res.status(404).end();
    } catch (e) {
        errorHandler(res, 'error deleteRefreshToken-id: ', e);
    }
});

export default router