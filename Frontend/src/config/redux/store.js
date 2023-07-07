import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import dataPegawaiReducer from './reducer/dataPegawaiReducer';
import dataJabatanReducer from './reducer/dataJabatanReducer';
import dataKehadiranReucer from './reducer/dataKehadiranReducer';
import dataPotonganReducer from './reducer/dataPotonganReducer';
import dataGajiReducer from './reducer/dataGajiReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dataPegawai: dataPegawaiReducer,
        dataJabatan: dataJabatanReducer,
        dataKehadiran: dataKehadiranReucer,
        dataPotongan: dataPotonganReducer,
        dataGaji: dataGajiReducer,
    },
});

export default store;
