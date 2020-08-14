import {Router} from 'express';
import {mapGetFilterDate} from "../../services/map.service";
import passport from "passport";
const router = Router();

router.post("/search", passport.authenticate('jwt', {session: false}),  async (req,res) => {
    try {
        const data = await mapGetFilterDate(req.body);
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: `error get search date: ${e}`});
    }
});

export default router