import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    SET_USER,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../../action/authAction/authActionTypes';

const initialState = {
    user: null,
    error: null,
    successMsg: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                successMsg: 'Login Berhasil'
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                successMsg: null
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                error: null,
                successMsg: null
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                error: null
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                successMsg: action.payload,
                error: null
            };
        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.payload,
                successMsg: null
            };
        default:
            return state;
    }
};

export default authReducer;
