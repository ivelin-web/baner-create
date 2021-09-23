import Baner from "../models/Baner.js";

export default class BanerController {
    // Get all baners
    static get = async (req, res) => {
        try {
            const baners = await Baner.find({}).select("-updatedAt").sort({ createdAt: "desc" });

            res.json(baners);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    // Create banner
    static create = async (req, res) => {
        try {
            // Create new banner
            const banner = await Baner.create({
                text: req.body.text,
                image: req.file?.filename,
                userId: req.user._id,
            });

            res.status(201).json(banner);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    // Update banner
    static update = async (req, res) => {
        const { id } = req.params;

        try {
            // Find baner
            const baner = await Baner.findById(id);

            // Check baner owner
            if (baner.userId !== req.user._id) {
                return res.status(403).json({ message: "You are not allowed to do this" });
            }

            // Find propery to update from user req
            const properyToUpdate = {
                text: req.body.text,
                image: req.file?.filename,
            };

            // Update baner
            const updatedBaner = await Baner.findByIdAndUpdate(
                id,
                {
                    $set: properyToUpdate,
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).select("-updatedAt");

            res.json(updatedBaner);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    // Delete banner
    static delete = async (req, res) => {
        const { id } = req.params;
        try {
            const baner = await Baner.findById(id);

            if (baner.userId !== req.user._id) {
                return res.status(403).json({ message: "You are not allowed to do this" });
            }

            const deletedBaner = await Baner.findByIdAndRemove(id);

            res.json({ message: "Baner was deleted successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    };
}
