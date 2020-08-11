import {Router} from 'express';
import {addUser} from "../../services/user.service";
import {ValidateUser} from "../../middlewares/Validator";
import errorHandler from "../../utils/errorHandler";
const router = Router();

router.post("/registration", ValidateUser, async (req,res) => {
    try {
        const data = await addUser(req.body, res);
        return res.status(201).json(data);
    } catch (e) {
        errorHandler(res, 'error registration', e);
    }
});

export default router