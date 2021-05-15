import { GET_ALL_CART_SUCCESS, GET_ALL_CART_FAIL, CREATE_CART_SUCCESS, CREATE_CART_FAIL, UPDATE_CART_SUCCESS, UPDATE_CART_FAIL } from "../actions/types";

const initialState = {};

const cart = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_CART_SUCCESS:
            return { data: payload.data };

        case GET_ALL_CART_FAIL:
            return { data: "" };

        case CREATE_CART_SUCCESS:
            return { ...state };

        case CREATE_CART_FAIL:
            //return { data: "" };
            return { ...state };
        case UPDATE_CART_SUCCESS:
            return { ...state };

        case UPDATE_CART_FAIL:
            //return { data: "" };
            return { ...state };
        default:
            return state;
    }
}

export default cart