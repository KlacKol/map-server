import {Router} from 'express';
import {mapGetFilterDate} from "../../services/map.service";
const router = Router();

router.post("/search", async (req,res) => {
    try {
        const data = await mapGetFilterDate(req.body);
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: 'error get'});
    }
});

export default router