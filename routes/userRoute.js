const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Handlers
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("User fetching failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// router.get('/profile', getProfile);
// router.put('/profile', updateProfile);
router.get('/', getAllUsers);
// router.get('/:id', getUserById);
// router.delete('/:id', deleteUser);

module.exports = router;
