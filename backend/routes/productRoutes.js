const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/", (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json(results);
    });
});

module.exports = router


router.post("/", (req, res) => {

    const {
        name,
        description,
        price,
        image,
        stock
    } = req.body;

    const sql = `
        INSERT INTO products
        (name, description, price, image, stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        description,
        price,
        image,
        stock
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to add product",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Product added successfully",
            productId: result.insertId
        });
    });
});;


router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {
        name,
        description,
        price,
        image,
        stock
    } = req.body;

    const sql = `
        UPDATE products
        SET
            name = ?,
            description = ?,
            price = ?,
            image = ?,
            stock = ?
        WHERE id = ?
    `;

    const values = [
        name,
        description,
        price,
        image,
        stock,
        id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to update product",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully"
        });
    });
});


router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to delete product",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });
    });
});




router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(results[0]);
    });
});
