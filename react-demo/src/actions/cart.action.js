import { GET_ALL_CART_SUCCESS, GET_ALL_CART_FAIL, SET_MESSAGE, CREATE_CART_FAIL, CREATE_CART_SUCCESS, UPDATE_CART_SUCCESS, UPDATE_CART_FAIL } from "./types";
import cartServices from "../services/cart";

export const addInCart = (setdata) => (dispatch) => {
    return cartServices.addCart(setdata).then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: CREATE_CART_SUCCESS,
            payload: response
        })
        /** this is for set message  */
        dispatch({
            type: SET_MESSAGE,
            payload: "Products Created successfully",
        });
        return Promise.resolve();
    }, (error) => {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: CREATE_CART_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}

export const getAllCarts = () => (dispatch) => {
    return cartServices.getAllCarts().then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: GET_ALL_CART_SUCCESS,
            payload: response
        })
        /** this is for set message  */
        dispatch({
            type: SET_MESSAGE,
            payload: "Products get successfully",
        });
        return Promise.resolve();
    }, (error) => {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: GET_ALL_CART_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}


export const updateCart = (data) => (dispatch) => {
    console.log("data 1112==>", data)
    return cartServices.updateCart(data).then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: UPDATE_CART_SUCCESS,
            payload: response
        })
        /** this is for set message  */
        dispatch({
            type: SET_MESSAGE,
            payload: "Products get successfully",
        });
        return Promise.resolve();
    }, (error) => {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: UPDATE_CART_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}