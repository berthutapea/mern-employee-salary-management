import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import dataPegawaiReducer from './reducer/dataPegawaiReducer';
import dataJabatanReducer from './reducer/dataJabatanReducer';
import dataKehadiranReucer from './reducer/dataKehadiranReducer';
import dataPotonganReducer from './reducer/dataPotonganReducer';
import dataGajiReducer from './reducer/dataGajiReducer';
import laporanGajiReducer from './reducer/laporanGajiReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dataPegawai: dataPegawaiReducer,
        dataJabatan: dataJabatanReducer,
        dataKehadiran: dataKehadiranReucer,
        dataPotongan: dataPotonganReducer,
        dataGaji: dataGajiReducer,
        laporanGaji: laporanGajiReducer,
    },
});

export default store;
