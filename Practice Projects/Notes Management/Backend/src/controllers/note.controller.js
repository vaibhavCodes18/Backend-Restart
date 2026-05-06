import * as noteService from "../services/note.service.js";

export const addNote = async(req, res) => {
    
    try {
        const note = await noteService.addNote(req);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getLoggedInUserNotes = async(req, res) => {
    try {
        const notes = await noteService.getLoggedInUserNotes(req.user);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getNoteById = async(req, res) => {
    try {
        const note = await noteService.getNotesById(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

export const updateNoteById = async(req, res) => {
    try {
        const note = await noteService.updateNote(req.params.id,req.body);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteNoteById = async(req, res) => {
    try {
        const note = await noteService.deleteNote(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
