import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            image,
            accountType,
            provider
        } = req.body;

        if (!(firstName || lastName || email || password)) {
            return next("Provide Required Fields");
        }

        if (accountType === "Writer" && !image) {
            return next("Please provide profile picture");
        }

        const userExist = await Users.findOne({ email });
        if (userExist) {
            return next("Email already exist, try again");
        }

        const hashPassword = await hashString(password);

        const user = await Users.create({
            name: firstName + lastName,
            email,
            password: !provider ? hashPassword : "",
            image,
            accountType,
            provider
        });

        user.password = undefined;

        const token = createJWT(user._id);

        //send email if account is writer
        if (accountType === "Writer") {
            sendVerificationEmail(user, res, token);
        } else {
            res.status(201).json({
                success: true,
                message: "Account created successfully",
                user,
                token
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const googleSignup = async (req, res, next) => {
    try {
        const { name, email, image, emailVerified } = req.body;

        const userExist = await Users.findOne({ email });
        
        if (userExist) {
            return next("Email already exist, try again");
        }

        const user = await Users.create({
            name,
            email,
            image,
            provider: "Google",
            emailVerified
        });

        user.password = undefined;

        const token = createJWT(user?._id);

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return next("Please Provide User Credentials");
        }

        console.log("Login Request: ", email, password);

        const user = await Users.findOne({email}).select("+password");
        console.log("User found: ", user);

        if (!user) {
            return next("Invalid email or password");
        }

        // Google account login
        if (user.provider === "Google" && !password) {
            const token = createJWT(user?._id);

            return res.status(201).json({
                success: true,
                message: "Login successful",
                user,
                token
            });
        }

        // compare password
        const isMatch = await compareString(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return next("Invalid email or password");
        }

        if (user?.accountType === "Writer" && !user?.emailVerified) {
            return next("Please verify your email address.");
        }

        user.password = undefined;

        const token = createJWT(user?._id);

        res.status(201).json({
            success: true,
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};