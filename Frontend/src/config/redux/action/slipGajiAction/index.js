import axios from "axios";

export const FETCH_SLIP_GAJI_SUCCESS = "FETCH_SLIP_GAJI_SUCCESS";
export const FETCH_SLIP_GAJI_FAILURE = "FETCH_SLIP_GAJI_FAILURE";
export const CLEAR_SLIP_GAJI = "CLEAR_SLIP_GAJI";

export const fetchSlipGajiSuccess = (data) => ({
    type: FETCH_SLIP_GAJI_SUCCESS,
    payload: data,
});

export const fetchSlipGajiFailure = (error) => ({
    type: FETCH_SLIP_GAJI_FAILURE,
    payload: error,
});

export const clearSlipGaji = () => ({
    type: CLEAR_SLIP_GAJI,
});

export const fetchSlipGajiByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/slip_gaji/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchSlipGajiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSlipGajiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const fetchSlipGajiByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/slip_gaji/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchSlipGajiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSlipGajiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const fetchSlipGajiByName = (selectedName, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/laporan/slip_gaji/name/${selectedName}`
        );
        const data = response.data;
        dispatch(fetchSlipGajiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSlipGajiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};
