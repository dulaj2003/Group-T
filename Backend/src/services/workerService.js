
import WorkerProfile from "../models/WorkerProfile.js";
import User from "../models/User.js";

export async function getAllWorkers({ trade, area } = {}) {
    const filter = {};

    if (trade) {
        filter.trade = {
            $regex: escapeRegex(trade),
            $options: "i"
        };
    }

    if (area) {
        filter.area = {
            $regex: escapeRegex(area),
            $options: "i"
        };
    }

    const profiles = await WorkerProfile.find(filter)
        .populate("userId", "name phone")
        .lean();

    return profiles
        .filter((profile) => profile.userId)
        .map((profile) => ({
            id: profile._id.toString(),
            name: profile.userId.name,
            trade: profile.trade,
            area: profile.area,
            phone: profile.userId.phone || "",
            description: profile.description,
            hourlyRate: profile.hourlyRate,
            availability: profile.availability,
            profilePicture: profile.profilePicture || ""
        }));
}

export async function getWorkerById(id) {
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        return null;
    }

    const profile = await WorkerProfile.findById(id)
        .populate("userId", "name phone email")
        .lean();

    if (!profile || !profile.userId) {
        return null;
    }

    return {
        id: profile._id.toString(),
        name: profile.userId.name,
        email: profile.userId.email || "",
        phone: profile.userId.phone || "",
        trade: profile.trade,
        area: profile.area,
        description: profile.description,
        hourlyRate: profile.hourlyRate,
        availability: profile.availability,
        profilePicture: profile.profilePicture || "",
        projectPictures: profile.projectPictures || []
    };
}

export async function getMyWorkerProfile(userId) {
    const profile = await WorkerProfile.findOne({ userId })
        .populate("userId", "name email phone")
        .lean();


    if (!profile || !profile.userId) {
        return null;
    }

    return {
        id: profile._id.toString(),
        name: profile.userId.name,
        email: profile.userId.email,
        phone: profile.userId.phone || "",
        trade: profile.trade,
        area: profile.area,
        skills: profile.skills,
        experience: profile.experience,
        description: profile.description,
        hourlyRate: profile.hourlyRate,
        availability: profile.availability,
        location: profile.location || "",
        profilePicture: profile.profilePicture || "",
        projectPictures: profile.projectPictures || []
    };
}

export async function updateMyWorkerProfile(userId, updates) {
    const allowedProfileFields = [
        "trade",
        "area",
        "skills",
        "experience",
        "description",
        "hourlyRate",
        "availability",
        "location",
        "profilePicture",
        "profilePicturePublicId",
        "projectPictures",
        "projectPicturePublicIds"
    ];

    const profileUpdates = {};

    for (const field of allowedProfileFields) {
        if (Object.hasOwn(updates, field)) {
            profileUpdates[field] = updates[field];
        }
    }

    if (
        Object.hasOwn(updates, "name") ||
        Object.hasOwn(updates, "phone")
    ) {
        const userUpdates = {};

        if (Object.hasOwn(updates, "name")) {
            if (typeof updates.name !== "string" || !updates.name.trim()) {
                throw new Error("Name cannot be empty.");
            }

            userUpdates.name = updates.name.trim();
        }

        if (Object.hasOwn(updates, "phone")) {
            if (typeof updates.phone !== "string") {
                throw new Error("Phone must be a string.");
            }

            userUpdates.phone = updates.phone.trim();
        }

        await User.findByIdAndUpdate(userId, userUpdates, {
            runValidators: true
        });
    }

    const profile = await WorkerProfile.findOneAndUpdate(
        { userId },
        { $set: profileUpdates },
        { returnDocument: "after", runValidators: true }
    )
        .populate("userId", "name email phone")
        .lean();

    if (!profile || !profile.userId) {
        return null;
    }

    return {
        id: profile._id.toString(),
        name: profile.userId.name,
        email: profile.userId.email,
        phone: profile.userId.phone || "",
        trade: profile.trade,
        area: profile.area,
        skills: profile.skills,
        experience: profile.experience,
        description: profile.description,
        hourlyRate: profile.hourlyRate,
        availability: profile.availability,
        location: profile.location || "",
        profilePicture: profile.profilePicture || "",
        projectPictures: profile.projectPictures || []
    };
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
