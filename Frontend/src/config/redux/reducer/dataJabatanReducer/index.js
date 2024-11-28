import {
    GET_DATA_JABATAN_SUCCESS,
    GET_DATA_JABATAN_FAILURE,
    CREATE_DATA_JABATAN_SUCCESS,
    CREATE_DATA_JABATAN_FAILURE,
    UPDATE_DATA_JABATAN_SUCCESS,
    UPDATE_DATA_JABATAN_FAILURE,
    DELETE_DATA_JABATAN_SUCCESS,
    DELETE_DATA_JABATAN_FAILURE
} from '../../action/dataJabatanAction/dataJabatanActionTypes';

const initialState = {
    dataJabatan: [],
    message: null,
    error: null
};

const dataJabatanReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_JABATAN_SUCCESS:
            return {
                ...state,
                dataJabatan: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_JABATAN_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_DATA_JABATAN_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_DATA_JABATAN_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_DATA_JABATAN_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_DATA_JABATAN_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_DATA_JABATAN_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_DATA_JABATAN_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default dataJabatanReducer;
    