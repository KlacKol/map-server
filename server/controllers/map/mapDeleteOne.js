import {Router} from 'express';
import {mapDelete} from "../../services/map.service";
const router = Router();

router.delete("/:id", async (req,res) => {
    try {
        const success = await mapDelete(req.params.id);
        if (success) {
            return res.status(204).end();
        }
        return res.status(404).end();
    } catch (e) {
        res.status(404).json({message: `error delete-id: ${e}`})
    }
});

export default router