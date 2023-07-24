import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import dataGajiPegawaiPrintReducer from './reducer/dataGajiPegawaiPrintReducer';
import dataPegawaiReducer from './reducer/dataPegawaiReducer';
import dataJabatanReducer from './reducer/dataJabatanReducer';
import dataKehadiranReucer from './reducer/dataKehadiranReducer';
import dataPotonganReducer from './reducer/dataPotonganReducer';
import dataGajiReducer from './reducer/dataGajiReducer';
import laporanAbsensiReducer from './reducer/laporanAbsensiReducer';
import laporanGajiReducer from './reducer/laporanGajiReducer';
import slipGajiReducer from './reducer/slipGajiReducer';
import ubahPasswordReducer from './reducer/ubahPasswordReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dataGajiPegawaiPrint: dataGajiPegawaiPrintReducer,
        dataPegawai: dataPegawaiReducer,
        dataJabatan: dataJabatanReducer,
        dataKehadiran: dataKehadiranReucer,
        dataPotongan: dataPotonganReducer,
        dataGaji: dataGajiReducer,
        laporanAbsensi: laporanAbsensiReducer,
        laporanGaji: laporanGajiReducer,
        slipGaji: slipGajiReducer,
        ubahPassword: ubahPasswordReducer,
    },
});

export default store;
