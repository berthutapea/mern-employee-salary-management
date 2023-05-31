import express from 'express';
import {
    viewDataGajiPegawai,
    viewDataGajiPegawaiByMonth,
    viewDataGajiPegawaiByYear
} from "../controllers/TransaksiController.js";

const router = express.Router();

router.get('/data_gaji', viewDataGajiPegawai);
router.get('/data_gaji/month/:month', viewDataGajiPegawaiByMonth);
router.get('/data_gaji/year/:year', viewDataGajiPegawaiByYear);

export default router;