import {
    FETCH_LAPORAN_ABSENSI_SUCCESS,
    FETCH_LAPORAN_ABSENSI_FAILURE,
    CLEAR_LAPORAN_ABSENSI,
} from "../../action/laporanAbsensiAction";

const initialState = {
    dataLaporanAbsensi: [],
    error: null,
};

const laporanAbsensiReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LAPORAN_ABSENSI_SUCCESS:
            return {
                ...state,
                dataLaporanAbsensi: action.payload,
                error: null,
            };
        case FETCH_LAPORAN_ABSENSI_FAILURE:
            return {
                ...state,
                dataLaporanAbsensi: [],
                error: action.payload,
            };
        case CLEAR_LAPORAN_ABSENSI:
            return {
                ...state,
                dataLaporanAbsensi: [],
                error: null,
            };
        default:
            return state;
    }
};

export default laporanAbsensiReducer;
