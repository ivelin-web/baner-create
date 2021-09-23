import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
            maxlength: [50, "Max length for email is 50"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Min length for password is 6"],
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

// Add custom message for unique error
UserSchema.plugin(uniqueValidator, {
    message: "Email already exists",
});

// Hash password when creating new user
UserSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return next();
    }

    try {
        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

// Create virtual confirm password property
UserSchema.virtual("confirmPassword")
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value;
    });

// Validate that password and confirmPassword matching
UserSchema.pre("validate", function (next) {
    // Only if user doesn't send blank password
    if (this.password && this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Enter the same password");
    }

    next();
});

export default mongoose.model("users", UserSchema);
