const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const router = express.Router();
const db = require("../config/db");


// REGISTER USER

router.post("/register", async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;


    // Check required fields

    if (!name || !email || !password) {

        return res.status(400).json({
            message: "Name, email and password are required"
        });

    }


    // Check if email already exists

    const checkSql =
        "SELECT id FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {

        if (err) {

            return res.status(500).json({
                message: "Database error",
                error: err.message
            });

        }


        if (results.length > 0) {

            return res.status(409).json({
                message: "Email already registered"
            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Insert user

        const insertSql = `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            insertSql,
            [name, email, hashedPassword],
            (err, result) => {

                if (err) {

                    return res.status(500).json({
                        message: "Failed to register user",
                        error: err.message
                    });

                }


                res.status(201).json({

                    message: "User registered successfully",

                    userId: result.insertId

                });

            }
        );

    });

});

// LOGIN USER

router.post("/login", (req, res) => {

    const {
        email,
        password
    } = req.body;


    // Check required fields

    if (!email || !password) {

        return res.status(400).json({
            message: "Email and password are required"
        });

    }


    // Find user

    const sql =
        "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {

            return res.status(500).json({
                message: "Database error",
                error: err.message
            });

        }


        if (results.length === 0) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        const user = results[0];


        // Check password

        const passwordMatch =
            await bcrypt.compare(password, user.password);


        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        // Create JWT token

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );


        res.json({

            message: "Login successful",

            token: token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    });

});
module.exports = router;
