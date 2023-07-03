const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator')
const mongoose = require('mongoose');


//ROUTE 1: Get all notes of loggedin user using GET: "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.userId });
        res.status(200).json({
            success: true,
            notes: notes,
            message: "All notes returned."
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


//ROUTE 2: Add a new note for loggedin user using POST: "/api/notes/addnote". Login required.
router.post("/addnote",
    body("note.title", "Title field must be at least 3 characters.").isLength({ min: 3 }),
    body("note.description", "Description field must be at least 5 characters.").isLength({ min: 5 }),
    fetchuser, async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: result.array()
                });
            }
            const newNote = new Notes({
                userId: req.userId,
                title: req.body.note.title,
                description: req.body.note.description,
                tag: req.body.note.tag
            });
            const savedNote = await newNote.save();
            res.status(200).json({
                success: true,
                message: "New note created.",
                note: savedNote
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });


//ROUTE 3: Update a note for loggedin user using PUT: "/api/notes/updatenote". Login required.
router.put("/updatenote/:id",
    body("note.title", "Title field must be at least 3 characters.").isLength({ min: 3 }),
    body("note.description", "Description field must be at least 5 characters.").isLength({ min: 5 }),
    fetchuser, async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: result.array()
                });
            }
            const { title, description, tag } = req.body.note;
            let newNote = {};
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }
            const noteFound = await Notes.findById(req.params.id);
            if (!noteFound) {
                return res.status(404).json({
                    success: false,
                    message: "Note couldn't be found."
                });
            }
            if (noteFound.userId.toString() !== req.userId) {
                return res.status(401).json({
                    success: false,
                    message: "Not allowed."
                });
            }
            let updatedResult = await Notes.findOneAndUpdate({ _id: req.params.id },
                newNote, { new: true });
            if (updatedResult) {
                return res.status(200).json({
                    success: true,
                    message: "Note updated.",
                    note: updatedResult
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "Note couldn't be updated."
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


//ROUTE 4: Delete a note for loggedin user using DELETE: "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id",
    fetchuser, async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: result.array()
                });
            }
            const noteFound = await Notes.findById(req.params.id);
            if (!noteFound) {
                return res.status(404).json({
                    success: false,
                    message: "Note couldn't be found."
                });
            }
            if (noteFound.userId.toString() !== req.userId) {
                return res.status(401).json({
                    success: false,
                    message: "Not allowed."
                });
            }
            let deletedNote = await Notes.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Note deleted.",
                note: deletedNote
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });

module.exports = router;