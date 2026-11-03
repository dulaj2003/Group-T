import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import WorkerProfile from "../models/WorkerProfile.js";

function publicUser(user){
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role
    };
}

function createToken(user) {
    return jwt.sign(
        { role: user.role },
        process.env.JWT_SECRET,
        {
            subject: user._id.toString(),
            expiresIn: "1d"
        }
    );
}


function validateAccount({ name, email, password }) {
    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string" ||
        password.length < 8
    ) {
        return "Name and email are required. Password must be at least 8 characters.";
    }

    return null;
}

export async function registerCustomer(req, res, next) {
    try {
        const { name, email, phone, password } = req.body;

        const validationError = validateAccount({
            name,
            email,
            password
        });

        if(validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            phone: typeof phone === "string" ? phone.trim() : "",
            passwordHash,
            role: "customer"
        });

        return res.status(201).json({
            success: true,
            message: "Customer registered successfully.",
            data: {
                user: publicUser(user),
                token: createToken(user)
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        next(error);
    }
    
}

export async function registerWorker(req, res, next) {
    let user;

    try {
        const {
            name,
            email,
            phone,
            password,
            trade,
            skills,
            experience,
            area,
            description,
            hourlyRate
        } = req.body;

        const validationError = validateAccount({
            name,
            email,
            password
        });

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        if (
            typeof trade !== "string" ||
            !trade.trim() ||
            typeof area !== "string" ||
            !area.trim()
        ){
            return res.status(400).json({
                success: false,
                message: "Trade and service area are required."
            });
        }

        const parsedExperience = 
            experience === undefined || experience === ""
            ? 0
            : Number(experience);

        if (
            !Number.isFinite(parsedExperience) ||
            parsedExperience < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Experience must be a non-negative number."
            });
        }

        let parsedSkills = [];

        if (Array.isArray(skills)) {
            parsedSkills = skills.filter(
                (skill) => typeof skill === "string" && skill.trim()
            ).map((skill) => skill.trim());
        } else if (typeof skills === "string" && skills.trim()) {
            parsedSkills = [skills.trim()];
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            phone: typeof phone === "string" ? phone.trim() : "",
            passwordHash,
            role: "worker"
        });

        const profileData = {
            userId: user._id,
            trade: trade.trim(),
            area: area.trim(),
            skills: parsedSkills,
            experience: parsedExperience,
            description:
                typeof description === "string" ? description.trim() : "",
            availability: true,
            location: area.trim()
        };

        if (hourlyRate !== undefined && hourlyRate !== "") {
            const parsedRate = Number(hourlyRate);

            if (!Number.isFinite(parsedRate) || parsedRate < 0) {
                await User.deleteOne({_id: user._id });
                user = null;

                return res.status(400).json({
                    success: false,
                    message: "Hourly rate must be a non-negative number."
                });
            }

            profileData.hourlyRate = parsedRate;
        }

        await WorkerProfile.create(profileData);

        return res.status(201).json({
            success: true,
            message: "Worker registered successfully.",
            data: {
                user: publicUser(user),
                token: createToken(user)
            }
        });
    } catch (error) {
        if (user?._id) {
            await User.deleteOne({ _id: user._id }).catch(() => {});
        }

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "An account or worker profile already exists."
            });
        }

        next(error);
    }
}


export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            !email.trim() ||
            typeof password !== "string" ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        }).select("+passwordHash");

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if(!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                user: publicUser(user),
                token: createToken(user)
            }
        });
    } catch (error) {
        next(error);
    }
}