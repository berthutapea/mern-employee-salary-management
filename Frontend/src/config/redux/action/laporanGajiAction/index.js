import axios from "axios";

export const FETCH_LAPORAN_GAJI_SUCCESS = "FETCH_LAPORAN_GAJI_SUCCESS";
export const FETCH_LAPORAN_GAJI_FAILURE = "FETCH_LAPORAN_GAJI_FAILURE";
export const CLEAR_LAPORAN_GAJI = "CLEAR_LAPORAN_GAJI";

export const fetchLaporanGajiSuccess = (data) => ({
    type: FETCH_LAPORAN_GAJI_SUCCESS,
    payload: data,
});

export const fetchLaporanGajiFailure = (error) => ({
    type: FETCH_LAPORAN_GAJI_FAILURE,
    payload: error,
});

export const clearLaporanGaji = () => ({
    type: CLEAR_LAPORAN_GAJI,
});

export const fetchLaporanGajiByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/gaji/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchLaporanGajiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchLaporanGajiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const fetchLaporanGajiByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/gaji/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchLaporanGajiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchLaporanGajiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};
