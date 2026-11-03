import express from "express";
import {
    listWorkers,
    getWorker,
    getMyProfile,
    updateMyProfile
} from "../controllers/workerController.js";

import {
    protect,
    authorizeRoles
} from "../middleware/authmiddleware.js";


const router = express.Router();

router.get(
    "/my-profile",
    protect,
    authorizeRoles("worker"),
    getMyProfile
);

router.put(
    "/my-profile",
    protect,
    authorizeRoles("worker"),
    updateMyProfile
);

router.get("/", listWorkers);
router.get("/:id", getWorker);


export default router;