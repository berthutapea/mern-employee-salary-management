const initialState = {
    loading: false,
    error: null,
    message: '',
};

const ubahPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'CHANGE_PASSWORD_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                message: action.payload,
            };
        case 'CHANGE_PASSWORD_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ubahPasswordReducer;




// import {
//     CHANGE_PASSWORD_SUCCESS,
//     CHANGE_PASSWORD_FAILURE,
// } from '../../action/ubahPasswordAction/ubahPasswordActionTypes';

// const initialState = {
//     ubahPassword: [],
//     message: null,
//     error: null
// };

// const ubahPasswordReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CHANGE_PASSWORD_SUCCESS:
//             return {
//                 ...state,
//                 message: action.payload.message,
//                 error: null,
//             };
//         case CHANGE_PASSWORD_FAILURE:
//             return {
//                 ...state,
//                 error: action.payload.message,
//                 message: null,
//             };
//         default:
//             return state;
//     }
// };

// export default ubahPasswordReducer;

