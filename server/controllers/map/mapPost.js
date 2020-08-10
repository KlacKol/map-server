import {Router} from 'express';
import {mapAdd} from "../../services/map.service";
import {ValidateMap} from "../../middlewares/Validator";
const router = Router();

router.post("/create", ValidateMap, async (req,res) => {
    try {
        const data = await mapAdd(req.body);
        return res.status(201).json(data);
    } catch (e) {
        res.status(404).json({message: `error post: ${e}`})
    }
});

export default router