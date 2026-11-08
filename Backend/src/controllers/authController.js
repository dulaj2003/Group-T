import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import WorkerProfile from "../models/WorkerProfile.js";
import cloudinary from "../config/cloudinary.js";

function publicUser(user){
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        district: user.district || "",
        profilePicture: user.profilePicture || ""
    };
}

function uploadToCloudinary(file, folder) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image"
            },
            (error, result) => {
                if(error) {
                    return reject(error);
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        );

        uploadStream.end(file.buffer);
    });
}

async function deleteCloudinaryImages(publicIds){
    const validIds = publicIds.filter(Boolean);

    if (validIds.length === 0) return;

    await Promise.allSettled(
        validIds.map((publicId) => 
            cloudinary.uploader.destroy(publicId)
        )
    );
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
    let user;
    let uploadedPublicId = "";

    try {
        const { name, email, password, district } = req.body;

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

        if (typeof district !== "string" || !district.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please select your district."
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

        let profilePicture = "";

        if (req.file) {
            const uploadedImage = await uploadToCloudinary(
                req.file,
                "ruct/customers/profiles"
            );

            profilePicture = uploadedImage.url;
            uploadedPublicId = uploadedImage.publicId;
        }

        const passwordHash = await bcrypt.hash(password, 12);

        user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            passwordHash,
            role: "customer",
            district: district.trim(),
            profilePicture,
            profilePicturePublicId: uploadedPublicId
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
        if (user?._id) {
            await User.deleteOne({ _id: user._id }).catch(() => {});
        }

        if (uploadedPublicId) {
            await deleteCloudinaryImages([uploadedPublicId]);
        }

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
    const uploadedPublicIds = [];

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
            typeof phone !== "string" ||
            !/^(0[0-9]{9}|\+94[0-9]{9})$/.test(phone.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid Sri Lankan phone number."
            });
        }

        if (
            typeof trade !== "string" ||
            !trade.trim() ||
            typeof area !== "string" ||
            !area.trim()
        ) {
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
            parsedSkills = skills
                .filter(
                    (skill) =>
                        typeof skill === "string" && skill.trim()
                )
                .map((skill) => skill.trim());
        } else if (typeof skills === "string" && skills.trim()) {
            parsedSkills = [skills.trim()];
        }

        let parsedRate;

        if (hourlyRate !== undefined && hourlyRate !== "") {
            parsedRate = Number(hourlyRate);

            if (!Number.isFinite(parsedRate) || parsedRate < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Hourly rate must be a non-negative number."
                });
            }
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


        const profileFile = req.files?.profilePicture?.[0];
        const projectFiles = req.files?.projectPictures || [];

        let profilePicture = "";
        let profilePicturePublicId = "";

        if (profileFile) {
            const uploadedProfile = await uploadToCloudinary(
                profileFile,
                "ruct/workers/profiles"
            );

            profilePicture = uploadedProfile.url;
            profilePicturePublicId = uploadedProfile.publicId;

            uploadedPublicIds.push(profilePicturePublicId);
        }

        const projectPictures = [];
        const projectPicturePublicIds = [];

        for (const file of projectFiles) {
            const uploadedProject = await uploadToCloudinary(
                file,
                "ruct/workers/projects"
            );

            projectPictures.push(uploadedProject.url);
            projectPicturePublicIds.push(uploadedProject.publicId);

            uploadedPublicIds.push(uploadedProject.publicId);
        }


        const passwordHash = await bcrypt.hash(password, 12);

        user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            phone: typeof phone === "string" ? phone.trim() : "",
            passwordHash,
            role: "worker"
        });

        await WorkerProfile.create({
            userId: user._id,
            trade: trade.trim(),
            area: area.trim(),
            skills: parsedSkills,
            experience: parsedExperience,
            description:
                typeof description === "string"
                    ? description.trim()
                    : "",
            availability: true,
            location: area.trim(),

            hourlyRate: parsedRate,

            profilePicture,
            profilePicturePublicId,
            projectPictures,
            projectPicturePublicIds
        });

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

        await deleteCloudinaryImages(uploadedPublicIds);

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

        const userData = publicUser(user);

        if (user.role === "worker") {
            const workerProfile = await WorkerProfile.findOne({
                userId: user._id
            });

            if (workerProfile) {
                userData.profilePicture =
                    workerProfile.profilePicture || "";
            }
        }

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                user: userData,
                token: createToken(user)
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function getCurrentUser(req, res, next) {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const userData = publicUser(user);

        if (user.role === "worker") {
            const workerProfile = await WorkerProfile.findOne({
                userId: user._id
            });

            if (workerProfile) {
                userData.profilePicture =
                    workerProfile.profilePicture || "";
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                user: userData
            }
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCustomerProfile(req, res, next) {
    let uploadedPublicId = "";

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.role !== "customer") {
            return res.status(403).json({
                success: false,
                message: "Only customers can update this profile."
            });
        }

        const { name, district, phone } = req.body;

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Name cannot be empty."
                });
            }

            user.name = name.trim();
        }

        if (district !== undefined) {
            if (typeof district !== "string" || !district.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Please select a valid district."
                });
            }

            user.district = district.trim();
        }

        if (phone !== undefined) {
            if (typeof phone !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid phone number."
                });
            }

            user.phone = phone.trim();
        }

        const oldPicturePublicId = user.profilePicturePublicId;

        if (req.file) {
            const uploadedImage = await uploadToCloudinary(
                req.file,
                "ruct/customers/profiles"
            );

            user.profilePicture = uploadedImage.url;
            user.profilePicturePublicId = uploadedImage.publicId;
            uploadedPublicId = uploadedImage.publicId;
        }

        await user.save();

        if (uploadedPublicId && oldPicturePublicId) {
            await deleteCloudinaryImages([oldPicturePublicId]);
        }

        return res.status(200).json({
            success: true,
            message: "Customer profile updated successfully.",
            data: {
                user: publicUser(user)
            }
        });

    } catch (error) {
        if (uploadedPublicId) {
            await deleteCloudinaryImages([uploadedPublicId]);
        }

        next(error);
    }
}