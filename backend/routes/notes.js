const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route:1 Fetch all the notes using: Get "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured! please try again")
    }
});

//Route:2 create a new  note using: Post "/api/notes/addNote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters ').isLength({ min: 5 })
], async (req, res) => {
    try {
        // destructure the title,description and tag entered into the body
        const { title, description, tag } = req.body;

        //If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //create the object of the note schema and save it into db
        const note = new Notes({ title, description, tag, user: req.user.id });
        const savedNotes = await note.save();
        res.json(savedNotes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured! please try again")
    }

});

//Route:3 Update a new  note using: Put "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a new Note object
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        //if  note with the given id is not found then give error
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // if the id of the user does not match with id of the user present in notes db
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("You are not allowed to change this note");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured! please try again")
    }

});

//Route:4 Delete a new  note using: delete "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const{title,description,tag}=req.body;
    try {

        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        //if  note with the given id is not found then give error
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // if the id of the user does not match with id of the user present in notes db
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("You are not allowed to delete this note");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Your note has been deleted successfully", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured! please try again")
    } 

});

module.exports = router