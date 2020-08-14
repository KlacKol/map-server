import {Router} from 'express';
import {mapDelete} from "../../services/map.service";
import errorHandler from "../../utils/errorHandler";
import passport from "passport";
const router = Router();

router.delete("/:id", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const success = await mapDelete(req.params.id);
        if (success) {
            return res.status(204).end();
        }
        return res.status(404).end();
    } catch (e) {
        errorHandler(res, 'error delete-id: ', e);
    }
});

export default router