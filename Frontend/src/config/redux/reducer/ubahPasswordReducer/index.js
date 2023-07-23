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
