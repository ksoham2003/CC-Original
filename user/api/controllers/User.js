const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, department, year, div, mobile } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            });
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password must be Same"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, department, year, div, mobile });

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "User Doesn't Exist, Please Register"
            });
        }

        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        if (!hashedPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email Id or Password"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Login Successful",
                user: existingUser
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Get all events (Products)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            success: true,
            message: "Products Fetched",
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Get single event (Product)
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findOne({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Product Fetched",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Enroll Event
exports.enrollEvent = async (req, res) => {
    try {
        const { eventId, userId } = req.body;

        const event = await Product.findOne({ _id: eventId });
        if (!event) {
            return res.status(401).json({
                success: false,
                message: "Event Not Found"
            });
        }

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found"
            });
        }

        if (user.enrolled.includes(eventId)) {
            return res.status(400).json({
                success: false,
                message: "User already registered for this event"
            });
        }

        user.enrolled.push(eventId);
        await user.save();

        event.registeredUsers.push(userId);
        await event.save();

        return res.status(200).json({
            success: true,
            message: "Student Enrolled to Event Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Check if User is Registered for Event
exports.checkUserRegistration = async (req, res) => {
    try {
        const { eventId, userId } = req.body;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        const isRegistered = user.enrolled.includes(eventId);
        return res.status(200).json({
            success: true,
            isRegistered
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
