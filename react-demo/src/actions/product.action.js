import { GET_ALL_PRODUCT_SUCCESS, GET_ALL_PRODUCT_FAIL, SET_MESSAGE, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_SUCCESS } from "./types";
import productsServices from "../services/products";

export const getAllProducts = () => (dispatch) => {
    return productsServices.getAllProducts().then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: GET_ALL_PRODUCT_SUCCESS,
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
            type: GET_ALL_PRODUCT_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}


export const createNewProduct = (newproduct) => (dispatch) => {
    return productsServices.createNewProduct(newproduct).then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
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
            type: CREATE_PRODUCT_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}