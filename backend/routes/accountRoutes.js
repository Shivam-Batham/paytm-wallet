import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router()

router.route("/").get(getAccount)
router.route("/balance",authMiddleware).get(getBalance)
router.route("/transfer",authMiddleware).post(transferBalance)

export default router;