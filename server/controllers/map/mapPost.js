import {Router} from 'express';
import {mapAdd} from "../../services/map.service";
import {ValidateMap} from "../../middlewares/Validator";
import errorHandler from "../../utils/errorHandler";
import passport from "passport";
const router = Router();

router.post("/create", passport.authenticate('jwt', {session: false}), ValidateMap, async (req,res) => {
    try {
        const data = await mapAdd(req.body);
        return res.status(201).json(data);
    } catch (e) {
        errorHandler(res, 'error post: ', e);
    }
});

export default router