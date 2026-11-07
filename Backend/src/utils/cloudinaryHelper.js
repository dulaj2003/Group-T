import cloudinary from "../config/cloudinary.js";

export function uploadToCloudinary(file, folder) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
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

export async function deleteCloudinaryImages(publicIds) {
    const validIds = publicIds.filter(Boolean);

    if (validIds.length === 0) return;

    await Promise.allSettled(
        validIds.map((publicId) =>
            cloudinary.uploader.destroy(publicId)
        )
    );
}