import jwt from "jsonwebtoken";

export function protect(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authentication required. Please log in."
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.sub,
            role: decoded.role
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please log in again."
        });
    }
}

export function authorizeRoles(...allowedRoles){
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource."
            });
        }

        next();
    };
}