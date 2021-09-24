import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthController {
    // Register user
    static register = async (req, res) => {
        const { email, password, confirmPassword } = req.body;

        try {
            // Create new user
            const user = await User.create({ email, password, confirmPassword });

            res.status(201).json({ message: "User has been created successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    };

    // Login user
    static login = async (req, res) => {
        const { email, password } = req.body;
        const invalidUserMessage = "Wrong email or password";

        try {
            // Validate email
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(401).json({ message: invalidUserMessage });
            }

            // Validate password
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ message: invalidUserMessage });
            }

            // Generate jwt token
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY);

            // Return res with cookie
            res.cookie("access_token", token, {
                secure: process.env.NODE_ENV !== "development",
                sameSite: "none",
                httpOnly: true,
            }).json({ message: "Logged in successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    };

    // Logout
    static logout = async (req, res) => {
        res.clearCookie("access_token").json({ message: "Successfully logged out" });
    };

    // Get auth user
    static authUser = async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select("-updatedAt");

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    };
}
