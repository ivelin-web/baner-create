import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoute from "./routes/auth.js";
import banerRoute from "./routes/baner.js";

// App config
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ credentials: true, origin: process.env.NODE_ENV !== "development" ? "https://ivelin-web.github.io" : "*" }));
app.use("/images", express.static(path.join(process.cwd(), "public/images")));

// DB connection
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("DB connected");
});

// API routes
app.use("/api/auth", authRoute);
app.use("/api/baners", banerRoute);
app.get("*", (req, res) => {
    res.status(404).json({ message: "not found" });
});

// Listener
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
