import express from 'express';
import {
    viewDataGajiPegawai,
    viewDataGajiPegawaiByMonth,
    viewDataGajiPegawaiByYear
} from "../controllers/TransaksiController.js";

const router = express.Router();

router.get('/data_gaji_pegawai', viewDataGajiPegawai);
router.get('/data_gaji_pegawai/month/:month', viewDataGajiPegawaiByMonth);
router.get('/data_gaji_pegawai/year/:year', viewDataGajiPegawaiByYear);

export default router;