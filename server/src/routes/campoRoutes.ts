import {Router} from "express";
import CampoController from "../controllers/CampoController";

const router = Router();


router.get('/api/campos', CampoController.listCampo);
router.post('/api/campos', CampoController.createCampo);

export default router;