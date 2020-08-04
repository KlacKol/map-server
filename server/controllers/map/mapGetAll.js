import {Router} from 'express';
import {mapGetAll} from "../../services/map.service";
const router = Router();

router.get("/", async (req,res) => {
    try {
        const data = await mapGetAll();
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: 'error get'});
    }
});

export default router