import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { randomBytes } from "node:crypto";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import WorkerProfile from "../models/WorkerProfile.js";

dotenv.config();

const sampleWorkers = [
    {
        code: "W001",
        name: "Kamal Perera",
        trade: "Tile Worker",
        area: "Negombo",
        experience: 8,
        phone: "0771234567",
        description: "Floor and wall tiling services"
    },
    {
        code: "W002",
        name: "Nimal Fernando",
        trade: "Plumber",
        area: "Colombo",
        experience: 5,
        phone: "0711234567",
        description: "Home plumbing and pipe repairs"
    },
    {
        code: "W003",
        name: "Saman Silva",
        trade: "Electrician",
        area: "Negombo",
        experience: 6,
        phone: "0761234567",
        description: "Residential electrical installations"
    },
    {
        code: "W004",
        name: "Ruwan Jayasinghe",
        trade: "Roof Worker",
        area: "Gampaha",
        experience: 10,
        phone: "0751234567",
        description: "Roof construction and repairs"
    }
    ];

async function seedWorkers() {
    try {
        await connectDB();

        for (const worker of sampleWorkers) {
            const email = `${worker.code.toLowerCase()}#example.com`;

            let user = await User.findOne({ email });

            if (!user) {
                const randomPassword = randomBytes(32).toString("hex");
                const passwordHash = await bcrypt.hash(randomPassword, 10);
                
                user = await User.create({
                    name: worker.name,
                    email,
                    passwordHash,
                    role: "worker",
                    phone: worker.phone
                });
            }

            const existingProfile = await WorkerProfile.findOne({
                userId: user._id
            });

            if (!existingProfile) {
                await WorkerProfile.create({
                    userId: user._id,
                    trade: worker.trade,
                    area: worker.area,
                    skills: [worker.trade],
                    experience: worker.experience,
                    description: worker.description,
                    availability: true,
                    location: worker.area
                });

                console.log(`Inserted ${worker.name}`);
            }else {
                console.log(`Profile exists for ${worker.name}`);
            }
        }

        console.log("Worker seeding completed.");
    } catch (error) {
        console.error("seeding failed : ", error.message);
        process.exitCode = 1;
    } finally {
        const mongoose = await import("mongoose");
        await mongoose.default.disconnect();
    }
}

seedWorkers();