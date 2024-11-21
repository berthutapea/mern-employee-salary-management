import axios from "axios";

export const FETCH_LAPORAN_ABSENSI_SUCCESS = "FETCH_LAPORAN_ABSENSI_SUCCESS";
export const FETCH_LAPORAN_ABSENSI_FAILURE = "FETCH_LAPORAN_ABSENSI_FAILURE";
export const CLEAR_LAPORAN_ABSENSI = "CLEAR_LAPORAN_ABSENSI";

export const fetchLaporanAbsensiSuccess = (data) => ({
    type: FETCH_LAPORAN_ABSENSI_SUCCESS,
    payload: data,
});

export const fetchLaporanAbsensiFailure = (error) => ({
    type: FETCH_LAPORAN_ABSENSI_FAILURE,
    payload: error,
});

export const clearLaporanAbsensi = () => ({
    type: CLEAR_LAPORAN_ABSENSI,
});

export const fetchLaporanAbsensiByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/absensi/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchLaporanAbsensiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchLaporanAbsensiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const fetchLaporanAbsensiByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/absensi/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchLaporanAbsensiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchLaporanAbsensiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};
