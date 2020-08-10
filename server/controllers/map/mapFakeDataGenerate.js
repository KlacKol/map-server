import {Router} from 'express';
import {mapFakeDataGenerate} from "../../services/map.service";
const router = Router();

router.get("/generate/random", async (req,res) => {
    try {
        const data = await mapFakeDataGenerate();
        return res.status(201).json(data);
    } catch (e) {
        res.status(404).json({message: `error generate data: ${e}`})
    }
});

export default router