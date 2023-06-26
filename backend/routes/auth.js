const express = require("express");
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const User = require("../models/User");
const pepper = "aS45#^58)*!'`tyz";
const JWT_SECRET = "f6?.èrtg+/--1>z%";


//ROUTE 1: Create a user using POST: "/api/auth/createuser". No login required.
router.post("/createuser",
    body("name", "Name field cannot be empty.").notEmpty(),
    body("name", "Name field must be at least 3 characters.").isLength({ min: 3 }),
    body("email", "Email field cannot be empty and have to be in correct format.").notEmpty().isEmail(),
    body("password", "Password field must be at least 5 characters.").isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            // const checkUserEmail = await User.findOne({ email: req.body.email }).exec();
            // if (checkUserEmail) {
            //     return res.status(401).json({
            //         success: false,
            //         message: "User already exist with this email.",
            //         email: checkUserEmail.email
            //     })
            // }
            // else {
            // const user = User(req.body);
            // user.save();
            // return res.status(200).json({
            //     success: true,
            //     message: "User added."
            // });
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(req.body.password + pepper, salt);

                let user = await User.create({
                    name: req.body.name,
                    password: hashedPass,
                    email: req.body.email
                });

                const data = {
                    userId: user.id
                };
                const jwtToken = jwt.sign(data, JWT_SECRET);

                res.status(200).json({
                    success: true,
                    message: "User added.",
                    authToken: jwtToken
                });
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            // .then(user => res.status(200).json({
            //     success: true,
            //     message: "User added.",
            //     user: user
            // })).catch(err => res.status(401).json({
            //     success: false,
            //     message: err.message
            // }));
            //}
        }
        else {
            res.status(400).json({
                success: false,
                message: result.array()
            });
        }
    });


//ROUTE 2: Authenticate a user using POST: "/api/auth/login". No login required.
router.post("/login",
    body("email", "Email field cannot be empty and have to be in correct format.").notEmpty().isEmail(),
    body("password", "Password field cannot be empty.").exists(),
    async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const { email, password } = req.body;
            try {
                let user = await User.findOne({ email: email });
                if (!user) {
                    res.status(400).json({
                        success: false,
                        message: "User cannot be found with these credentials."
                    });
                }
                else {
                    const comparePass = await bcrypt.compare(password + pepper, user.password);
                    if (!comparePass) {
                        res.status(400).json({
                            success: false,
                            message: "User cannot be found with these credentials."
                        });
                    }
                    else {
                        const data = {
                            userId: user.id
                        };
                        const jwtToken = jwt.sign(data, JWT_SECRET);

                        res.status(200).json({
                            success: true,
                            message: "User logined.",
                            authToken: jwtToken
                        });
                    }
                }
            }
            catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: result.array()
            });
        }
    });


//ROUTE 3: Get loggedin user details using POST: "/api/auth/getuser". Login required.
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.userId).select('-password');
        if (!user) {
            res.status(401).json({
                success: false,
                message: "User cannot be found with these credentials."
            });
        }
        else {
            res.status(200).json({
                success: true,
                user: user,
                message: "User info returned.",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;