import * as noteController from "../controllers/note.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/add-note", verifyJWT, noteController.addNote);
router.get("/", verifyJWT, noteController.getLoggedInUserNotes);
router.get("/:id", verifyJWT, noteController.getNoteById);
router.put("/:id", verifyJWT, noteController.updateNoteById);
router.delete("/:id", verifyJWT, noteController.deleteNoteById);

export default router;