import {
    GET_DATA_POTONGAN_SUCCESS,
    GET_DATA_POTONGAN_FAILURE,
    CREATE_DATA_POTONGAN_SUCCESS,
    CREATE_DATA_POTONGAN_FAILURE,
    UPDATE_DATA_POTONGAN_SUCCESS,
    UPDATE_DATA_POTONGAN_FAILURE,
    DELETE_DATA_POTONGAN_SUCCESS,
    DELETE_DATA_POTONGAN_FAILURE
} from '../../action/dataPotonganAction/dataPotonganActionTypes';

const initialState = {
    dataPotongan: [],
    message: null,
    error: null
};

const dataPotonganReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_POTONGAN_SUCCESS:
            return {
                ...state,
                dataPotongan: action.payload,
                message: null,
                error: null,
            };
        case GET_DATA_POTONGAN_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_DATA_POTONGAN_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_DATA_POTONGAN_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_DATA_POTONGAN_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_DATA_POTONGAN_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_DATA_POTONGAN_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_DATA_POTONGAN_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default dataPotonganReducer;
