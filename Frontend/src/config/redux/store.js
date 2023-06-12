import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
