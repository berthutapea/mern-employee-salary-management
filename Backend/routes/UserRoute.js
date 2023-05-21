import express from 'express';
import {
    getDataPegawai,
    getDataPegawaiByID,
    createDataPegawai,
    updateDataPegawai,
    deleteDataPegawai
} from '../controllers/DataPegawai.js';
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/data_pegawai', verifyUser, adminOnly, getDataPegawai);
router.get('/data_pegawai/:id', verifyUser, adminOnly, getDataPegawaiByID);
router.post('/data_pegawai', createDataPegawai);
router.patch('/data_pegawai/:id', verifyUser, adminOnly, updateDataPegawai);
router.delete('/data_pegawai/:id', verifyUser, adminOnly, deleteDataPegawai);

export default router;