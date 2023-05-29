import express from 'express';
import {
    getDataPegawai,
    getDataPegawaiByID,
    createDataPegawai,
    updateDataPegawai,
    deleteDataPegawai,
    getDataPegawaiByNik,
    getDataPegawaiByName
} from '../controllers/DataPegawai.js';
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/data_pegawai', verifyUser, adminOnly, getDataPegawai);
router.get('/data_pegawai/id/:id', verifyUser, adminOnly, getDataPegawaiByID);
router.get('/data_pegawai/nik/:nik', verifyUser, adminOnly, getDataPegawaiByNik);
router.get('/data_pegawai/name/:name', verifyUser, adminOnly, getDataPegawaiByName);
router.post('/data_pegawai', createDataPegawai);
router.patch('/data_pegawai/:id', verifyUser, adminOnly, updateDataPegawai);
router.delete('/data_pegawai/:id', verifyUser, adminOnly, deleteDataPegawai);

export default router;