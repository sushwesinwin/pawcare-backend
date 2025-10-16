const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a product
exports.addProduct = async (req, res) => {
    try {
        const product = await prisma.product.create({
            data: req.body
        })
        res.status(201).json({ message: "Product created successfully", product })
    } catch (error) {
        console.error('Product creation failed', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        res.status(200).json({ message: "Products fetched successfully", products })
    } catch (error) {
        console.error('Product fetching failed', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Get a single product
exports.getProduct = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: req.params.id } })
        res.status(200).json({ message: "Product fetched successfully", product })
    } catch (error) {
        console.error('Product fetching failed', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await prisma.product.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json({ message: "Product updated successfully", product: updated });
    } catch (error) {
        console.error('Product update failed', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Product deletion failed', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}
