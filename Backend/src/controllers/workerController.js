import {
    getAllWorkers,
    getWorkerById,
    getMyWorkerProfile as fetchMyWorkerProfile,
    updateMyWorkerProfile as saveMyWorkerProfile
} from "../services/workerService.js";
import WorkerProfile from "../models/WorkerProfile.js";
import {
    uploadToCloudinary,
    deleteCloudinaryImages
} from "../utils/cloudinaryHelper.js";

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
    const uploadedPublicIds = [];

    try {
        const existingProfile = await WorkerProfile.findOne({
            userId: req.user.id
        });

        if (!existingProfile) {
            return res.status(404).json({
                success: false,
                message: "Worker profile not found."
            });
        }

        const profileFile = req.files?.profilePicture?.[0];
        const projectFiles = req.files?.projectPictures || [];

        let removedPictures = [];

        if (req.body.removeProjectPictures) {
            try {
                removedPictures = JSON.parse(req.body.removeProjectPictures);
            } catch {
                return res.status(400).json({
                    success: false,
                    message: "Invalid project picture removal data."
                });
            }
        }

        if (
            !Array.isArray(removedPictures) ||
            removedPictures.some(
                (picture) =>
                    typeof picture !== "string" ||
                    !existingProfile.projectPictures.includes(picture)
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid project pictures selected for removal."
            });
        }

        removedPictures = [...new Set(removedPictures)];

        const remainingPictures = existingProfile.projectPictures.filter(
            (picture) => !removedPictures.includes(picture)
        );

        if (remainingPictures.length + projectFiles.length > 5) {
            return res.status(400).json({
                success: false,
                message: "A maximum of 5 project pictures is allowed."
            });
        }

        const updates = { ...req.body };

        delete updates.removeProjectPictures;

        if (Object.hasOwn(updates, "skills")) {
            updates.skills = Array.isArray(updates.skills)
                ? updates.skills
                : updates.skills.split(",").map((skill) => skill.trim()).filter(Boolean);
        }

        if (Object.hasOwn(updates, "availability")) {
            if (!["true", "false"].includes(String(updates.availability))) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid availability value."
                });
            }

            updates.availability = String(updates.availability) === "true";
        }

        if (profileFile) {
            const uploaded = await uploadToCloudinary(
                profileFile,
                "ruct/workers/profiles"
            );

            uploadedPublicIds.push(uploaded.publicId);

            updates.profilePicture = uploaded.url;
            updates.profilePicturePublicId = uploaded.publicId;
        }

        const newProjectPictures = [];
        const newProjectPublicIds = [];

        for (const file of projectFiles) {
            const uploaded = await uploadToCloudinary(
                file,
                "ruct/workers/projects"
            );

            uploadedPublicIds.push(uploaded.publicId);
            newProjectPictures.push(uploaded.url);
            newProjectPublicIds.push(uploaded.publicId);
        }

        const removedPublicIds = existingProfile.projectPictures
            .map((picture, index) => ({
                picture,
                publicId: existingProfile.projectPicturePublicIds[index]
            }))
            .filter((item) => removedPictures.includes(item.picture))
            .map((item) => item.publicId);

        const remainingPublicIds = existingProfile.projectPictures
            .map((picture, index) => ({
                picture,
                publicId: existingProfile.projectPicturePublicIds[index]
            }))
            .filter((item) => !removedPictures.includes(item.picture))
            .map((item) => item.publicId);

        updates.projectPictures = [
            ...remainingPictures,
            ...newProjectPictures
        ];

        updates.projectPicturePublicIds = [
            ...remainingPublicIds,
            ...newProjectPublicIds
        ];

        const oldProfilePicturePublicId = existingProfile.profilePicturePublicId;

        const profile = await saveMyWorkerProfile(req.user.id, updates);

        if (!profile) {
            await deleteCloudinaryImages(uploadedPublicIds);

            return res.status(404).json({
                success: false,
                message: "Worker profile not found."
            });
        }

        await deleteCloudinaryImages([
            ...removedPublicIds,
            ...(profileFile ? [oldProfilePicturePublicId] : [])
        ]);

        res.status(200).json({
            success: true,
            message: "Worker profile updated successfully",
            data: profile
        });
    } catch (error) {
        await deleteCloudinaryImages(uploadedPublicIds);

        if (
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