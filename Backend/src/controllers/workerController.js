import {
    getAllWorkers,
    getWorkerById
} from "../services/workerService.js";

export function listWorkers(req, res){
    const { trade, area } = req.query;

    const results = getAllWorkers({ trade, area});

    res.status(200).json({
        success: true,
        count: results.length,
        data: results
    });
}

export function getWorker(req, res){
    const worker = getWorkerById(req.params.id);

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
}
