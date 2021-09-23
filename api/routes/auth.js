import express from "express";
import AuthController from "../controllers/AuthController.js";
import authorization from "../middlewares/authorization.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authorization, AuthController.logout);
router.get("/user", authorization, AuthController.authUser);

export default router;
