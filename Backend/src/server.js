import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workerRoutes from "./routes/workerRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PROT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the RUCT Construction Worker Finder API"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "RUCT API is running"
    });
});

app.use("/api/workers", workerRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: true,
        message: "API endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`RUCT API running at http://localhost:${PORT}`);
});