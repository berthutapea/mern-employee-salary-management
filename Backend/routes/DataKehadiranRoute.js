import express from 'express';
import {
    viewDataKehadiran,
    createDataKehadiran,
    updateDataKehadiran,
    deleteDataKehadiran
} from "../controllers/TransaksiController.js";
import { adminOnly, verifyUser } from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/data_kehadiran', verifyUser, adminOnly, viewDataKehadiran);
router.post('/data_kehadiran', createDataKehadiran);
router.patch('/data_kehadiran/update/:id', updateDataKehadiran);
router.delete('/data_kehadiran/:id', verifyUser, adminOnly, deleteDataKehadiran);

export default router;