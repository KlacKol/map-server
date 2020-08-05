import {Router} from 'express';
import {mapUpdate} from "../../services/map.service";
import {Validator} from "../../middlewares/Validator";
const router = Router();

router.put("/:id", Validator, async (req,res) => {
    try {
        const data = await mapUpdate(req.params.id, req.body);
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: 'error edit'})
    }
});

export default router