import {Router} from 'express';
import {mapFakeDataGenerate} from "../../services/map.service";
import errorHandler from "../../utils/errorHandler";
const router = Router();

router.get("/generate/random", async (req,res) => {
    try {
        const data = await mapFakeDataGenerate();
        return res.status(201).json(data);
    } catch (e) {
        errorHandler(res, 'error generate data: ', e);
    }
});

export default router