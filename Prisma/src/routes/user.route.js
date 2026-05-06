import express from 'express'
import { createdUser, getUsers } from '../controllers/user.controller.js';
const router  = express.Router();

router.post('/create', createdUser);
router.get('/all-users', getUsers);

export default router;