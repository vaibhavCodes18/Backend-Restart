import userRouter from "./user.route.js";
import { Router } from "express";
import noteRouter from "./note.route.js";

const router = Router()

router.use("/users", userRouter)
router.use("/notes", noteRouter)

export default router;