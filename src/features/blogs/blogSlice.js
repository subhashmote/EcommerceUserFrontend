import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { blogService } from "./blogService";


export const getAllBlogs = createAsyncThunk("blogs/get",async(thunkAPI)=>{
    try{
        return await blogService.getBlogs();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAblog = createAsyncThunk("blog/get",async(id,thunkAPI)=>{
    try{
        return await blogService.getBlog(id);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});



const blogState = {
    blog:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

export const blogslice = createSlice({
    name:"blog",
    initialState:blogState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(getAllBlogs.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blog=action.payload;
        })
        .addCase(getAllBlogs.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getAblog.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAblog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleBlog=action.payload;
        })
        .addCase(getAblog.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})


export default blogslice.reducer;