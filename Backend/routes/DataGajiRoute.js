import express from 'express';
import {
    viewDataGajiPegawai,
    viewDataGajiPegawaiByMonth
} from "../controllers/TransaksiController.js";

const router = express.Router();

router.get('/data_gaji', viewDataGajiPegawai);
router.get('/data_gaji/month/:month', viewDataGajiPegawaiByMonth);

export default router;