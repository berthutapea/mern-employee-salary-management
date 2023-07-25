import {
    GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS,
    GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE,
} from "../../action/dataGajiPegawaiPrintAction";

const initialState = {
    dataGajiPegawaiPrint: [],
    error: null,
};

const dataGajiPegawaiPrintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS:
            return {
                ...state,
                dataSlipGaji: action.payload,
                error: null,
            };
        case GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE:
            return {
                ...state,
                dataSlipGaji: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default dataGajiPegawaiPrintReducer;




// import {
//     GET_GAJI_SUCCESS,
//     GET_GAJI_ERROR
// } from '../../action/dataGajiPegawaiPrintAction';

// const initialState = {
//     dataGajiPegawaiPrint: [],
//     error: null,
// };

// const dataGajiPegawaiPrintReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_GAJI_SUCCESS:
//             return { ...state, dataGajiPegawaiPrint: action.payload, error: null };
//         case GET_GAJI_ERROR:
//             return { ...state, dataGajiPegawaiPrint: [], error: action.payload };
//         default:
//             return state;
//     }
// };

// export default dataGajiPegawaiPrintReducer;
