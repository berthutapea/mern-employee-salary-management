import express from 'express';
import {
    getDataJabatan,
    getDataJabatanByID,
    createDataJabatan,
    updateDataJabatan,
    deleteDataJabatan
} from "../controllers/DataJabatan.js";
import { adminOnly, verifyUser } from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/data_jabatan', verifyUser, adminOnly, getDataJabatan);
router.get('/data_jabatan/:id', verifyUser, adminOnly, getDataJabatanByID);
router.post('/data_jabatan', verifyUser, adminOnly, createDataJabatan);
router.patch('/data_jabatan/:id', verifyUser,  adminOnly, updateDataJabatan);
router.delete('/data_jabatan/:id', verifyUser, adminOnly, deleteDataJabatan);

export default router;