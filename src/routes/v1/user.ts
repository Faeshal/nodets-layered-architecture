import express from "express"
import * as userController from "../../controllers/user"
const router = express.Router()
import { protect, authorize } from "../../middleware/auth";

router.get("/users", userController.getUsers);

export default router
