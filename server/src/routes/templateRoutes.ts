import {Router, request} from "express";
import TemplateController from "../controllers/TemplateController";

const router = Router();


router.get('/api/templates', TemplateController.listTemplate);
router.post('/api/templates', TemplateController.createTemplate);

router.patch('/api/templates/:templateId/accept', TemplateController.acceptTemplate);
router.patch('/api/templates/:templateId/ativar', TemplateController.ativarTemplate);
router.patch('/api/templates/:templateId/desativar', TemplateController.desativarTemplate);

router.get("/api/templates/:templateId/download/:formato", TemplateController.connecFastapi)


// router.get('/api/templates/:templateId', TemplateController.downloadTemplate);

// router.get('/home', TemplateController.connecFlask) 
    

export default router;