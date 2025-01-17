import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";


export const getAllProducts = createAsyncThunk("product/get",async(data,thunkAPI)=>{
    try{
        return await productService.getProducts(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk("product/getAproduct",async(id,thunkAPI)=>{
    try{
        return await productService.getSingleProduct(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});


export const addToWishlist = createAsyncThunk("product/wishlist",async(prodId,thunkAPI)=>{
    try{
        return await productService.addToWishlist(prodId);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const addRating = createAsyncThunk("product/rating",async(data,thunkAPI)=>{
    try{
        return await productService.rateProduct(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

const productState = {
    product:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

export const productslice = createSlice({
    name:"product",
    initialState:productState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(addToWishlist.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWishlist=action.payload;
            state.message="Product Added to wishlist";
        }).addCase(addToWishlist.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(getAProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleproduct=action.payload;
            state.message="Product Fetched Successfully";
        }).addCase(getAProduct.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addRating.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addRating.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.rating=action.payload;
            if(state.isSuccess === true){
                toast.success("Review Added Successfully!");
            }
        }).addCase(addRating.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isSuccess === false){
                toast.error("Something Wen't Wrong !");
            }
        })
    }
})


export default productslice.reducer;