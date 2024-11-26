import {
    GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS,
    GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE,
} from "../../action/dataGajiPegawaiPrintAction/dataGajiPegawaiPrintActionTypes";

const initialState = {
    dataGajiPegawaiPrint: [], 
    error: null,
  };
  

const dataGajiPegawaiPrintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS:
            return {
                ...state,
                dataGajiPegawaiPrint: action.payload,
                error: null,
            };
        case GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE:
            return {
                ...state,
                dataGajiPegawaiPrint: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default dataGajiPegawaiPrintReducer;
