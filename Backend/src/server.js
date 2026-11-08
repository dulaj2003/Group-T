
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

app.use((req, res, next) => {
    const start = Date.now();

    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);

    res.on("finish", () => {
        console.log(
            `${req.method} ${req.originalUrl} - ${res.statusCode} - ${Date.now() - start}ms`
        );
    });

    next();
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the RUCT Construction Worker Finder API"
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "RUCT API is running"
    });
});

app.use("/api/workers", workerRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

app.use((err, req, res, next) => {
    console.error("API Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error."
    });
});

const startServer = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await connectDB();

        const server = app.listen(PORT, "0.0.0.0", () => {
            console.log(`RUCT API running on port ${PORT}`);
        });

        server.on("error", (error) => {
            console.error("Server error:", error);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
