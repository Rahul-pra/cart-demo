import axios from "axios";
//import authHeader from "./auth-header";
import config from "../config";

const API_URL = config.apiUrl;


const getAllProducts = () => {
    //return axios.get(API_URL + "comments", { headers: authHeader() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    return axios.get(API_URL + "list-product");
}

const createNewProduct = (data) => {
    //return axios.get(API_URL + "comments", { headers: authHeader() });  // pass header for token 
    //console.log("API_URL ==>", API_URL);
    console.log(data);
    return axios.post(API_URL + "add-product", data);
}


const products = {
    getAllProducts,
    createNewProduct

}

export default products