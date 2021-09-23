import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import authorization from "../middlewares/authorization.js";
import BanerController from "../controllers/BanerController.js";

const router = express.Router();

// Create storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/baners");
    },
    filename: (req, file, cb) => {
        const fileType = file.originalname.split(".")[1];
        const fileName = `${uuidv4()}.${fileType}`;

        cb(null, fileName);
    },
});
const upload = multer({ storage });

router.get("/", authorization, BanerController.get);
router.post("/", authorization, upload.single("image"), BanerController.create);
router.put("/:id", authorization, upload.single("image"), BanerController.update);
router.delete("/:id", authorization, BanerController.delete);

export default router;
