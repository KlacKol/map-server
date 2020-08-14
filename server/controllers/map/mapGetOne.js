import {Router} from 'express';
import {mapGetOne} from "../../services/map.service";
import passport from "passport";
const router = Router();

router.get("/:id", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const data = await mapGetOne(req.params.id);
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: `error get by Id: ${e}`});
    }
});

export default router