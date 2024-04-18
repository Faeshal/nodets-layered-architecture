import express from "express";
import * as incomeController from "../../controllers/income";
import { body, param } from "express-validator";
const router = express.Router();

router.get("/incomes", incomeController.getIncomes);
router.post(
  "/incomes",
  [
    body("name", "name is required").not().isEmpty().trim(),
    body("value", "value is required & must be an integer")
      .not()
      .isEmpty()
      .isInt(),
  ],
  incomeController.addIncomes
);
router.get(
  "/incomes/:id",
  [param("id", "param must be exist").exists()],
  incomeController.getIncome
);
router.put(
  "/incomes/:id",
  [
    param("id", "param must be exist").exists(),
    body("name", "name is required").not().isEmpty().trim(),
    body("value", "value is required & must be an integer")
      .not()
      .isEmpty()
      .isInt(),
  ],
  incomeController.updateIncome
);
router.delete(
  "/incomes/:id",
  [param("id", "param must be integer").exists().isNumeric()],
  incomeController.deleteIncome
);

export default router;
// module.exports = router;
