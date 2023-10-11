import {Router} from "express";
import ArquivoController from "../controllers/ArquivoController";

const router = Router();


router.get('/api/arquivos', ArquivoController.listArquivo);
router.post('/api/arquivos', ArquivoController.createArquivo);

export default router;