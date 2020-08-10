import {Router} from 'express';
import passport from 'passport';

import {mapGetAll} from "../../services/map.service";

const router = Router();

router.get("/", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const data = await mapGetAll();
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: `error get all: ${e}`});
    }
});

export default router