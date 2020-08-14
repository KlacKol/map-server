import {Router} from 'express';
import {mapFakeDataGenerate} from "../../services/map.service";
import errorHandler from "../../utils/errorHandler";
import passport from "passport";
const router = Router();

router.get("/generate/random", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const data = await mapFakeDataGenerate();
        return res.status(201).json(data);
    } catch (e) {
        errorHandler(res, 'error generate data: ', e);
    }
});

export default router