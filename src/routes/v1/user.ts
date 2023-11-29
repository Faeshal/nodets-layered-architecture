import express from "express";
import * as userController from "../../controllers/user";
const router = express.Router();
import { protect, authorize } from "../../middleware/auth";

router.get("/users", userController.getUsers);
router.post("/users/reports/dateranges", userController.getUsersByDateRange);

export default router;
