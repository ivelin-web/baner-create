import mongoose from "mongoose";

const BanerSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Text is required"],
            minlength: [3, "Min length for text is 3"],
            maxlength: [35, "Max length for text is 35"],
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
        userId: {
            type: String,
            required: [true, "User id is required"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("baners", BanerSchema);
