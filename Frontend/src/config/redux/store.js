import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import dataPegawaiReducer from './reducer/dataPegawaiReducer';
import dataJabatanReducer from './reducer/dataJabatanReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dataPegawai: dataPegawaiReducer,
        dataJabatan: dataJabatanReducer,
    },
});

export default store;
