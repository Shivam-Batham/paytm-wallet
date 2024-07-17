import { Router } from "express";
import { helloUser, signIn, signUp } from "../controllers/userControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.route("/").get(helloUser)
router.route("/signup").post(signUp)
router.route("/signin").get(signIn)
router.route("/updateuserdata",authMiddleware).put(updateUserData)
router.route("/finduser").get(findUser)

export default router; 