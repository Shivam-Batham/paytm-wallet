import { Router } from "express";
import { signUp } from "../controllers/userControllers";

const router = Router();

router.route("/signup").post(signUp)

export default router;