import express, { Router } from 'express';
import authCheck from '../middleware/authCheck.js';
import tasksController from '../controllers/tasks.controller.js';
import checkFields from '../utils/checkFields.js';
import checkParamsId from '../middleware/checkParamsId.js';

const router: Router = express.Router();

router.post("/api/create", authCheck("auth"), checkFields(["titulo", "descripcion", "fechaVencimiento", "prioridad"]), tasksController.register);
router.get("/api/getAll", authCheck("auth"), tasksController.getAll);
router.put("/api/updateContent", authCheck("auth"), checkFields(["titulo", "descripcion", "fechaVencimiento", "prioridad", "id"]), tasksController.editContent);
router.put("/api/updateEstado", authCheck("auth"), tasksController.changeEstado);
router.delete("/api/delete/:id", authCheck("auth"), checkParamsId, tasksController.delete);

export default router;