import express from 'express';
import {
    viewLaporanAbsensiPegawaiByMonth,
    viewLaporanAbsensiPegawaiByYear,
    viewLaporanGajiPegawai,
    viewLaporanGajiPegawaiByMonth,
    viewLaporanGajiPegawaiByName,
    viewLaporanGajiPegawaiByYear,
    viewSlipGajiByName,
} from "../controllers/LaporanController.js";

const router = express.Router();

// laporan Gaji Pegawai
router.get('/laporan/gaji', viewLaporanGajiPegawai);
router.get('/laporan/gaji/name/:name', viewLaporanGajiPegawaiByName);
router.get('/laporan/gaji/month/:month', viewLaporanGajiPegawaiByMonth);
router.get('/laporan/gaji/year/:year', viewLaporanGajiPegawaiByYear);

// Laporan Absensi Pegawai
router.get('/laporan/absensi/month/:month', viewLaporanAbsensiPegawaiByMonth);
router.get('/laporan/absensi/year/:year', viewLaporanAbsensiPegawaiByYear);

// Slip Gaji Pegawai
router.get('/laporan/slip_gaji/name/:name', viewSlipGajiByName);
router.get('/laporan/gaji/month/:month', viewLaporanGajiPegawaiByMonth);
router.get('/laporan/gaji/year/:year', viewLaporanGajiPegawaiByYear);

export default router;