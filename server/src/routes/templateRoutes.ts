import {Router} from "express";
import TemplateController from "../controllers/TemplateController";

const router = Router();


router.get('/api/templates', TemplateController.listTemplate);
router.post('/api/templates', TemplateController.createTemplate);

export default router;