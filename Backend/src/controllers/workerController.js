import {
    getAllWorkers,
    getWorkerById
} from "../services/workerService.js";

export async function listWorkers(req, res, next) {
    try {
        const { trade, area } = req.query;

        const results = await getAllWorkers({ trade, area });

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        next(error);
    }
}

export async function getWorker(req, res, next) {
    try {
        const worker = await getWorkerById(req.params.id);

        if(!worker) {
            return res.status(404).json({
                success: false,
                message: "Worker not found"
            });
        }

        res.status(200).json({
            success: true,
            data: worker
        });
    } catch (error) {
        next(error);
    }
}