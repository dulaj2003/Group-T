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
            experience: profile.experience,
            phone: profile.userId.phone || "",
            description: profile.description
        }));
}

export async function getWorkerById(id) {
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        return null;
    }

    const profile = await WorkerProfile.findById(id)
        .populate("userId", "name phone")
        .lean();

    if (!profile || !profile.userId) {
        return null;
    }

    return {
        id: profile._id.toString(),
        name: profile.userId.name,
        trade: profile.trade,
        area: profile.area,
        experience: profile.experience,
        phone: profile.userId.phone || "",
        description: profile.description
    };
}

function escapeRegex(value){
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}