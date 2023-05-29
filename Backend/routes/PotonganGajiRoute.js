import express from 'express';
import {
    createDataPotonganGaji, deleteDataPotongan, updateDataPotongan, viewDataPotongan
} from "../controllers/TransaksiController.js";
import { adminOnly, verifyUser } from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/data_potongan', adminOnly, verifyUser, viewDataPotongan);
router.post('/data_potongan', adminOnly, verifyUser, createDataPotonganGaji);
router.patch('/data_potongan/update/:id', adminOnly, verifyUser, updateDataPotongan);
router.delete('/data_potongan/:id', adminOnly, verifyUser, deleteDataPotongan);

export default router;