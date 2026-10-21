import express from "express";
import {
    listWorkers,
    getWorker
} from "../controllers/workerController.js";

const router = express.Router();

router.get("/", listWorkers);
router.get("/:id", getWorker);

export default router;