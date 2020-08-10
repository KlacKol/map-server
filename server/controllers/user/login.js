import {Router} from 'express';
import {loginUser} from "../../services/user.service";
const router = Router();

router.post("/login", async (req,res) => {
    try {
        const data = await loginUser(req.body, res);
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: `error login: ${e}`})
    }
});

export default router