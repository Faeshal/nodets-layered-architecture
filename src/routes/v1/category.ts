import express from "express"
import * as categoryController from "../../controllers/category"
import { body } from "express-validator"
const router = express.Router()

router.get("/categories", categoryController.getCategories);
router.post(
    "/categories",
    [
        body("tag", "tag is required").trim()
    ],
    categoryController.addCategory
);

router.delete(
    "/categories/:id",
    categoryController.deleteCategory
);


export default router
