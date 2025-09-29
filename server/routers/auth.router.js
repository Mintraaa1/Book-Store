import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";
//POST http://localhost:3000/api/v1/auth/signup
router.post("/signup", authController.signUp);

//POST http://localhost:3000/api/v1/auth/signin
router.post("/signin", authController.signIn);
export default router;
