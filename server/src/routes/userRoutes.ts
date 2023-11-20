import {Router} from "express";
import UserController from "../controllers/UserController";

const router = Router();


router.get('/api/users', UserController.listUser);
// router.get('/api/users:id', UserController.listUser);

router.delete('/api/users/:userId/delete', UserController.deleteUser);

router.patch('/api/users/:userId/ativar', UserController.ativarUser);
router.patch('/api/users/:userId/desativar', UserController.desativarUser);
router.patch('/api/users/:userId/cargoUser', UserController.cargoUser);
router.patch('/api/users/:userId/cargoAdm', UserController.cargoAdm);

export default router;
