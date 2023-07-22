import {
    FETCH_SLIP_GAJI_SUCCESS,
    FETCH_SLIP_GAJI_FAILURE,
    CLEAR_SLIP_GAJI,
} from "../../action/slipGajiAction";

const initialState = {
    dataSlipGaji: [],
    error: null,
};

const slipGajiReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SLIP_GAJI_SUCCESS:
            return {
                ...state,
                dataSlipGaji: action.payload,
                error: null,
            };
        case FETCH_SLIP_GAJI_FAILURE:
            return {
                ...state,
                dataSlipGaji: [],
                error: action.payload,
            };
        case CLEAR_SLIP_GAJI:
            return {
                ...state,
                dataSlipGaji: [],
                error: null,
            };
        default:
            return state;
    }
};

export default slipGajiReducer;
