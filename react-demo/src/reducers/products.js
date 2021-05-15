import { GET_ALL_PRODUCT_SUCCESS, GET_ALL_PRODUCT_FAIL, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL } from "../actions/types";

const initialState = {};

const products = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_PRODUCT_SUCCESS:
            return { data: payload.data };

        case GET_ALL_PRODUCT_FAIL:
            return { data: "" };

        case CREATE_PRODUCT_SUCCESS:
            console.log("payload", payload)
            return { ...state };

        case CREATE_PRODUCT_FAIL:
            return { data: "" };
        //return { ...state, data: [...state.data] };
        default:
            return state;
    }
}

export default products