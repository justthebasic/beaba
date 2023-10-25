import {Router, request} from "express";
import TemplateController from "../controllers/TemplateController";

const router = Router();


router.get('/api/templates', TemplateController.listTemplate);
router.post('/api/templates', TemplateController.createTemplate);

router.patch('/api/templates/:templateId/accept', TemplateController.acceptTemplate);
router.patch('/api/templates/:templateId/activate', TemplateController.activateTemplate);
router.patch('/api/templates/:templateId/deactivate', TemplateController.deactivateTemplate);

router.get('/api/templates/:templateId/download/:formato', TemplateController.downloadTemplate);
// router.get('/api/templates/:templateId', TemplateController.downloadTemplate);

// router.get('/home', TemplateController.connecFlask) 
    

export default router;