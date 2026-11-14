import express, { Router } from 'express';
import usersController from "../controllers/users.controller.js";
import checkFields from '../utils/checkFields.js';
import authCheck from '../middleware/authCheck.js';

const router: Router = express.Router();

router.post("/api/register", checkFields(["username", "email", "password"]), usersController.register);
router.post("/api/login", checkFields(["username", "email", "password"]), usersController.login);
router.get("/api/authCheck", authCheck("check"), usersController.authCheck);

export default router;