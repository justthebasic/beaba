import {Router, request} from "express";
import TemplateController from "../controllers/TemplateController";

const router = Router();


router.get('/api/templates', TemplateController.listTemplate);
router.get('/api/templates/:templateId', TemplateController.findTempalte);
router.post('/api/templates', TemplateController.createTemplate);

router.delete('/api/templates/:templateId/delete', TemplateController.deleteTemplate);

router.patch('/api/templates/:templateId/accept', TemplateController.acceptTemplate);
router.patch('/api/templates/:templateId/ativar', TemplateController.ativarTemplate);
router.patch('/api/templates/:templateId/desativar', TemplateController.desativarTemplate);



    

export default router;