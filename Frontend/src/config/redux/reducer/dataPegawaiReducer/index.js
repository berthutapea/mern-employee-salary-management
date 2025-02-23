import {
    GET_DATA_PEGAWAI_SUCCESS,
    GET_DATA_PEGAWAI_FAILURE,
    PEGAWAI_IMAGE_SUCCESS,
    PEGAWAI_IMAGE_FAILURE,
    GET_DATA_PEGAWAI_BY_ID_SUCCESS,
    GET_DATA_PEGAWAI_BY_ID_FAILURE,
    GET_DATA_PEGAWAI_BY_NIK_SUCCESS,
    GET_DATA_PEGAWAI_BY_NIK_FAILURE,
    GET_DATA_PEGAWAI_BY_NAME_SUCCESS,
    GET_DATA_PEGAWAI_BY_NAME_FAILURE,
    CREATE_DATA_PEGAWAI_REQUEST,
    CREATE_DATA_PEGAWAI_SUCCESS,
    CREATE_DATA_PEGAWAI_FAILURE,
    UPDATE_DATA_PEGAWAI_SUCCESS,
    UPDATE_DATA_PEGAWAI_FAILURE,
    DELETE_DATA_PEGAWAI_SUCCESS,
    DELETE_DATA_PEGAWAI_FAILURE
} from '../../action/dataPegawaiAction/dataPegawaiActionTypes';

const initialState = {
    dataPegawai: [],
    pegawaiImage: [],
    message: null,
    error: null
};

const dataPegawaiReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_PEGAWAI_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_PEGAWAI_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case PEGAWAI_IMAGE_SUCCESS:
            return {
                ...state,
                pegawaiImage: action.payload,
                message: null,
                error: null,
            };
        case PEGAWAI_IMAGE_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case GET_DATA_PEGAWAI_BY_ID_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_PEGAWAI_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case GET_DATA_PEGAWAI_BY_NIK_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_PEGAWAI_BY_NIK_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case GET_DATA_PEGAWAI_BY_NAME_SUCCESS:
            return {
                ...state,
                dataPegawai: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_PEGAWAI_BY_NAME_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case CREATE_DATA_PEGAWAI_REQUEST:
            return {
                ...state,
                error: null,
                message: null,
            };
        case CREATE_DATA_PEGAWAI_SUCCESS:
            return {
                ...state,
                error: null,
                message: null,
            };
        case CREATE_DATA_PEGAWAI_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_DATA_PEGAWAI_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                error: null,
            };
        case UPDATE_DATA_PEGAWAI_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case DELETE_DATA_PEGAWAI_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                error: null,
            };
        case DELETE_DATA_PEGAWAI_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        default:
            return state;
    }
};

export default dataPegawaiReducer;
