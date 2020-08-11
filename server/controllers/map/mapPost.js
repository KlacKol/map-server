import {Router} from 'express';
import {mapAdd} from "../../services/map.service";
import {ValidateMap} from "../../middlewares/Validator";
import errorHandler from "../../utils/errorHandler";
const router = Router();

router.post("/create", ValidateMap, async (req,res) => {
    try {
        const data = await mapAdd(req.body);
        return res.status(201).json(data);
    } catch (e) {
        errorHandler(res, 'error post: ', e);
    }
});

export default router