import express from 'express';

/* === import Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === import Controllers === */
import {
    getDataPegawai,
    getDataPegawaiByID,
    createDataPegawai,
    updateDataPegawai,
    deleteDataPegawai,
    getDataPegawaiByNik,
    getDataPegawaiByName,
    changePasswordAdmin
} from '../controllers/DataPegawai.js';

import {
    getDataJabatan,
    createDataJabatan,
    updateDataJabatan,
    deleteDataJabatan
} from "../controllers/DataJabatan.js";

import {
    viewDataKehadiran,
    createDataKehadiran,
    updateDataKehadiran,
    deleteDataKehadiran
} from "../controllers/TransaksiController.js";

import {
    createDataPotonganGaji,
    deleteDataPotongan,
    viewDataPotonganById,
    updateDataPotongan,
    viewDataPotongan
} from "../controllers/TransaksiController.js";

import {
    viewDataGajiPegawai,
    viewDataGajiPegawaiByMonth,
    viewDataGajiPegawaiByYear
} from "../controllers/TransaksiController.js";

import {
    viewLaporanAbsensiPegawaiByMonth,
    viewLaporanAbsensiPegawaiByYear,
    viewLaporanGajiPegawai,
    viewLaporanGajiPegawaiByMonth,
    viewLaporanGajiPegawaiByName,
    viewLaporanGajiPegawaiByYear,
    viewSlipGajiByMonth,
    viewSlipGajiByName,
    viewSlipGajiByYear,
} from "../controllers/LaporanController.js";

import { LogOut, changePassword } from '../controllers/Auth.js';
import { dashboardPegawai, viewDataGajiSinglePegawaiByMonth, viewDataGajiSinglePegawaiByYear } from '../controllers/Pegawai.js';



const router = express.Router();


// Admin Route :

/* ==== Master Data ==== */
// Data Pegawai
router.get('/data_pegawai', verifyUser, adminOnly, getDataPegawai);
router.get('/data_pegawai/id/:id', verifyUser, adminOnly, getDataPegawaiByID);
router.get('/data_pegawai/nik/:nik', verifyUser, adminOnly, getDataPegawaiByNik);
router.get('/data_pegawai/name/:name', verifyUser, getDataPegawaiByName);
router.post('/data_pegawai', createDataPegawai);
router.patch('/data_pegawai/:id', verifyUser, adminOnly, updateDataPegawai);
router.delete('/data_pegawai/:id', verifyUser, adminOnly, deleteDataPegawai);
router.patch('/data_pegawai/:id/change_password',  verifyUser, adminOnly, changePasswordAdmin);
// Data Jabatan
router.get('/data_jabatan', verifyUser, adminOnly, getDataJabatan);
router.post('/data_jabatan', verifyUser, adminOnly, createDataJabatan);
router.patch('/data_jabatan/:id', verifyUser,  adminOnly, updateDataJabatan);
router.delete('/data_jabatan/:id', verifyUser, adminOnly, deleteDataJabatan);

/* ==== Transaksi  ==== */
// Data Kehadiran
router.get('/data_kehadiran', verifyUser, adminOnly, viewDataKehadiran);
router.post('/data_kehadiran', createDataKehadiran);
router.patch('/data_kehadiran/update/:id', updateDataKehadiran);
router.delete('/data_kehadiran/:id', verifyUser, adminOnly, deleteDataKehadiran);
// Data Potongan
router.get('/data_potongan', adminOnly, verifyUser, viewDataPotongan);
router.get('/data_potongan/:id', adminOnly, verifyUser, viewDataPotonganById);
router.post('/data_potongan', adminOnly, verifyUser, createDataPotonganGaji);
router.patch('/data_potongan/update/:id', adminOnly, verifyUser, updateDataPotongan);
router.delete('/data_potongan/:id', adminOnly, verifyUser, deleteDataPotongan);
// Data Gaji
router.get('/data_gaji_pegawai', viewDataGajiPegawai);
router.get('/data_gaji_pegawai/month/:month', viewDataGajiPegawaiByMonth);
router.get('/data_gaji_pegawai/year/:year', viewDataGajiPegawaiByYear);

/* ====  Laporan  ==== */
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
router.get('/laporan/slip_gaji/month/:month', viewSlipGajiByMonth);
router.get('/laporan/slip_gaji/year/:year', viewSlipGajiByYear);

/* ==== Ubah Password ==== */
router.patch('/change_password', verifyUser, changePassword);

/* ==== Logout ==== */
router.delete('/logout', LogOut);



// Pegawai Route :
/* ==== Dashboard ==== */
router.get('/dashboard', verifyUser, dashboardPegawai);
/* ==== Data Gaji ==== */
router.get('/data_gaji/month/:month', verifyUser, viewDataGajiSinglePegawaiByMonth);
router.get('/data_gaji/year/:year', verifyUser, viewDataGajiSinglePegawaiByYear);
/* ==== Ubah Password ==== */
router.patch('/change_password', verifyUser, changePassword);
/* ==== Logout ==== */
router.delete('/logout', LogOut);


export default router;