import express from "express";

import {
    registerCustomer,
    registerWorker,
    login,
    getCurrentUser,
    updateCustomerProfile
} from "../controllers/authController.js";

import workerImageUpload, {
    customerImageUpload
} from "../middleware/uploadMiddleware.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/register/customer",
    customerImageUpload,
    registerCustomer
);

router.post(
    "/register/worker",
    workerImageUpload,
    registerWorker
);

router.post("/login", login);

router.get("/me", protect, getCurrentUser);

router.put(
    "/me",
    protect,
    customerImageUpload,
    updateCustomerProfile
);

export default router;