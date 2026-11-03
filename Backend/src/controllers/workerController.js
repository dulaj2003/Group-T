import {
    getAllWorkers,
    getWorkerById,
    getMyWorkerProfile as fetchMyWorkerProfile,
    updateMyWorkerProfile as saveMyWorkerProfile
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

export async function getMyProfile(req, res, next) {
    try {
        const profile = await fetchMyWorkerProfile(req.user.id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Worker profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: profile 
        });
    } catch (error) {
        next(error);
    }
}

export async function updateMyProfile(req, res, next) {
    try {
        const profile = await saveMyWorkerProfile(
            req.user.id,
            req.body
        );

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Worker profile not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Worker profile updated successfully",
            data: profile
        });
    } catch (error) {
        if(
            error.message === "Name cannot be empty." ||
            error.message === "Phone must be a string."
        ) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        next(error);
    }
}