import {
    GET_DATA_KEHADIRAN_SUCCESS,
    GET_DATA_KEHADIRAN_FAILURE,
    CREATE_DATA_KEHADIRAN_SUCCESS,
    CREATE_DATA_KEHADIRAN_FAILURE,
    UPDATE_DATA_KEHADIRAN_SUCCESS,
    UPDATE_DATA_KEHADIRAN_FAILURE,
    DELETE_DATA_KEHADIRAN_SUCCESS,
    DELETE_DATA_KEHADIRAN_FAILURE
} from '../../action/dataKehadiranAction/dataKehadiranActionTypes';

const initialState = {
    dataKehadiran: [],
    loading: true,
    error: null,
    message: ''
};

const dataKehadiranReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_KEHADIRAN_SUCCESS:
            return {
                ...state,
                dataKehadiran: action.payload,
                loading: false,
                error: null
            };
        case GET_DATA_KEHADIRAN_FAILURE:
            return {
                ...state,
                dataKehadiran: [],
                loading: false,
                error: action.payload
            };
        case CREATE_DATA_KEHADIRAN_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case CREATE_DATA_KEHADIRAN_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        case UPDATE_DATA_KEHADIRAN_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case UPDATE_DATA_KEHADIRAN_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        case DELETE_DATA_KEHADIRAN_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case DELETE_DATA_KEHADIRAN_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default dataKehadiranReducer;
