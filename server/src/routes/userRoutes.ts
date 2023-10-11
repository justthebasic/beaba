import {Router} from "express";
import UserController from "../controllers/UserController";

const router = Router();


router.get('/api/users', UserController.listUser);
router.post('/api/users', UserController.createUser);

export default router;
