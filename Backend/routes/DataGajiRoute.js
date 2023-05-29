import express from 'express';
import { viewDataGajiPegawai } from "../controllers/TransaksiController.js";

const router = express.Router();

router.get('/data_gaji', viewDataGajiPegawai);

export default router;