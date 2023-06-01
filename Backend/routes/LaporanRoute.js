import express from 'express';
import {
    viewLaporanGajiPegawai,
    viewLaporanGajiPegawaiByMonth,
    viewLaporanGajiPegawaiByName,
    viewLaporanGajiPegawaiByYear,
} from "../controllers/LaporanController.js";

const router = express.Router();

router.get('/laporan/gaji', viewLaporanGajiPegawai);
router.get('/laporan/gaji/name/:name', viewLaporanGajiPegawaiByName);
router.get('/laporan/gaji/month/:month', viewLaporanGajiPegawaiByMonth);
router.get('/laporan/gaji/year/:year', viewLaporanGajiPegawaiByYear);

export default router;