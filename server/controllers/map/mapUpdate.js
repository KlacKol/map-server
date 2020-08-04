import {Router} from 'express';
import {mapUpdate} from "../../services/map.service";
const router = Router();

router.put("/:id", async (req,res) => {
    try {
        const data = await mapUpdate(req.params.id, req.body);
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: 'error edit'})
    }
});

export default router