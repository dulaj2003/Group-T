import { workers } from "../data/sampleWorkers.js";

export function getAllWorkers({ trade, area } = {}) {
    return workers.filter((worker) => {
        const matchesTrade = 
        !trade || 
        worker.trade.toLowerCase() === trade.toLowerCase();

        const matchesArea = 
        !area || 
        worker.area.toLowerCase().includes(area.toLowerCase());

        return matchesTrade && matchesArea;
    });
}

export function getWorkerById(id) {
    return workers.find((worker) => worker.id === id);
}
