import axios from "axios";
//import authHeader from "./auth-header";
import config from "../config";

const API_URL = config.apiUrl;


const getAllCarts = () => {
    //return axios.get(API_URL + "comments", { headers: authHeader() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    return axios.get(API_URL + "list-cart");
}

const addCart = (data) => {
    //return axios.get(API_URL + "comments", { headers: authHeader() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    console.log(data);
    return axios.post(API_URL + "add-cart", data);
}

const updateCart = (data) => {
    //return axios.get(API_URL + "comments", { headers: authHeader() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    console.log("hdsdhasd", data);
    return axios.put(API_URL + "update-cart/" + data._id, data);
}

const carts = {
    getAllCarts,
    addCart,
    updateCart

}

export default carts