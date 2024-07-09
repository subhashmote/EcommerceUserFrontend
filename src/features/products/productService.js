import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProducts = async(data)=>{
    const response = await axios.get(`${base_url}product?${data?.brand ?`brand=${data?.brand}&&`:""}${data?.category ? `category=${data?.category}&&` : ""}${data?.tag ? `tags=${data?.tag}&&` : ""}${data?.minprice ? `price[gte]=${data?.minprice}&&` : ""}${data?.maxprice ? `price[lte]=${data?.maxprice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}`);
    if(response.data){
        return response.data;
    }
}

const getSingleProduct = async(id)=>{
    const response = await axios.get(`${base_url}product/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const addToWishlist = async(prodId)=>{
    const response = await axios.put(`${base_url}product/wishlist`,{prodId},config);
    if(response.data){
        return response.data;
    }
}

const rateProduct = async(data)=>{
    const response = await axios.put(`${base_url}product/rating`,data,config);
    if(response.data){
        return response.data;
    }
}

export const productService = {
    getProducts,
    addToWishlist,
    getSingleProduct,
    rateProduct,
}