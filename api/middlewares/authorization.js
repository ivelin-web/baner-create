import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;

    // If don't have token give res with message
    if (!token) {
        return res.status(403).json({ message: "You are not allowed to do this" });
    }

    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        // Invalid token
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Set user to req
        req.user = user;

        next();
    });
};

export default authorization;
