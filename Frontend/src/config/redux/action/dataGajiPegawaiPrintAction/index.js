import axios from "axios";

export const GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS = "GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS";
export const GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE = "GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE";

export const viewDataGajiSinglePegawaiSuccess = (data) => ({
    type: GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS,
    payload: data,
});

export const viewDataGajiSinglePegawaiFailure = (error) => ({
    type: GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE,
    payload: error,
});


export const viewGajiSinglePegawaiByYear = (dataYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/data_gaji/month/${dataYear}`
        );
        const data = response.data;
        dispatch(viewDataGajiSinglePegawaiSuccess({data}));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewDataGajiSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const viewGajiSinglePegawaiByMonth = (dataMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/data_gaji/month/${dataMonth}`
        );
        const data = response.data;
        dispatch(viewDataGajiSinglePegawaiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewDataGajiSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};


export const viewGajiSinglePegawaiByName = (nama_pegawai, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/data_gaji/name/${nama_pegawai}`
        );
        const data = response.data;
        dispatch(viewDataGajiSinglePegawaiSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewDataGajiSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};


// import axios from 'axios';

// export const GET_GAJI_SUCCESS = 'GET_GAJI_SUCCESS';
// export const GET_GAJI_ERROR = 'GET_GAJI_ERROR';

// const getGajiData = (url, successType, errorType, onDataFound) => async (dispatch) => {
//     try {
//         const response = await axios.get(url);
//         dispatch({ type: successType, payload: response.data });
//         if (onDataFound) onDataFound();
//     } catch (error) {
//         dispatch({ type: errorType, payload: error.message });
//     }
// };

// export const viewGajiSinglePegawaiByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
//     const url = `http://localhost:5000/data_gaji/month/${selectedMonth}`;
//     await dispatch(getGajiData(url, GET_GAJI_SUCCESS, GET_GAJI_ERROR, onDataFound));
// };

// export const viewGajiSinglePegawaiByYear = (selectedYear, onDataFound) => async (dispatch) => {
//     const url = `http://localhost:5000/data_gaji/year/${selectedYear}`;
//     await dispatch(getGajiData(url, GET_GAJI_SUCCESS, GET_GAJI_ERROR, onDataFound));
// };





// import axios from 'axios';

// export const GET_GAJI_BY_MONTH_SUCCESS = 'GET_GAJI_BY_MONTH_SUCCESS';
// export const GET_GAJI_BY_MONTH_ERROR = 'GET_GAJI_BY_MONTH_ERROR';
// export const GET_GAJI_BY_YEAR_SUCCESS = 'GET_GAJI_BY_YEAR_SUCCESS';
// export const GET_GAJI_BY_YEAR_ERROR = 'GET_GAJI_BY_YEAR_ERROR';

// export const viewGajiSinglePegawaiByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/data_gaji/month/${selectedMonth}`);
//         dispatch({ type: GET_GAJI_BY_MONTH_SUCCESS, payload: response.data });
//         onDataFound();
//     } catch (error) {
//         dispatch({ type: GET_GAJI_BY_MONTH_ERROR, payload: error.message });
//     }
// };

// export const viewGajiSinglePegawaiByYear = (selectedYear, onDataFound) => async (dispatch) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/data_gaji/year/${selectedYear}`);
//         dispatch({ type: GET_GAJI_BY_YEAR_SUCCESS, payload: response.data });
//         onDataFound();
//     } catch (error) {
//         dispatch({ type: GET_GAJI_BY_YEAR_ERROR, payload: error.message });
//     }
// };
