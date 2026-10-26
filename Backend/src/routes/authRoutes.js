import express from "express";
import {
    registerCustomer,
    registerWorker,
    login
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register/customer", registerCustomer);
router.post("/register/worker", registerWorker);
router.post("/login", login);

export default router;