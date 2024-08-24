const express = require('express');
const router = express.Router();
const Journal = require('../models/journalModel'); // Ensure this path is correct

// GET all journals
router.get('/', async (req, res) => {
    try {
        const journals = await Journal.find();
        res.json(journals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific journal by ID
router.get('/:id', async (req, res) => {
    try {
        const journal = await Journal.findById(req.params.id);
        if (!journal) return res.status(404).json({ message: 'Journal not found' });
        res.json(journal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new journal
router.post('/', async (req, res) => {
    const { title, content, images, todoList } = req.body;
    const newJournal = new Journal({ title, content, images, todoList });

    try {
        const savedJournal = await newJournal.save();
        res.status(201).json(savedJournal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) a journal by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, content, images, todoList } = req.body;
        const updatedJournal = await Journal.findByIdAndUpdate(
            req.params.id,
            { title, content, images, todoList },
            { new: true }
        );
        if (!updatedJournal) return res.status(404).json({ message: 'Journal not found' });
        res.json(updatedJournal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a journal by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedJournal = await Journal.findByIdAndDelete(req.params.id);
        if (!deletedJournal) return res.status(404).json({ message: 'Journal not found' });
        res.json({ message: 'Journal deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
