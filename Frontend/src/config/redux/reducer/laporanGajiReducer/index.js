import {
    FETCH_LAPORAN_GAJI_SUCCESS,
    FETCH_LAPORAN_GAJI_FAILURE,
    CLEAR_LAPORAN_GAJI,
} from "../../action/laporanGajiAction";

const initialState = {
    dataLaporanGaji: [],
    error: null,
};

const laporanGajiReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LAPORAN_GAJI_SUCCESS:
            return {
                ...state,
                dataLaporanGaji: action.payload,
                error: null,
            };
        case FETCH_LAPORAN_GAJI_FAILURE:
            return {
                ...state,
                dataLaporanGaji: [],
                error: action.payload,
            };
        case CLEAR_LAPORAN_GAJI:
            return {
                ...state,
                dataLaporanGaji: [],
                error: null,
            };
        default:
            return state;
    }
};

export default laporanGajiReducer;
