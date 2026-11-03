import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workerRoutes from "./routes/workerRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/workers", workerRoutes);
app.use("/api/auth", authRoutes);

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


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal server error."
    });
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`RUCT API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server : ", error.message);
        process.exit(1);
    }
};

startServer();