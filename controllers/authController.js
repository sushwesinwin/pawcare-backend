const { PrismaClient } = require("@prisma/client");
const { hashPassword, verifyPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const prisma = new PrismaClient();

// Register
exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // Validate Input
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const hashedPassword = await hashPassword(password)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        // Generate token
        const token = generateToken(user)

        res.status(201).json({ 
            message: `Welcome ${userWithoutPassword.name} to PawCare`,
            user: userWithoutPassword,
            token
        })
    } catch (error) {
        console.error('Registration failed', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        })

        // Valid Input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        
        // Compare passwords
        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }
        
        // Generate token
        const token = generateToken(user)
        res.status(200).json({ message: `Welcome back ${user.name}`, token })
    } catch (error) {
        console.error('Login failed', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Logout
exports.logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.error('Logout failed', error)
        res.status(500).json({ message: "Internal server error" })
    }
}
