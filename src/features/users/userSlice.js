import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";


const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;


export const registerUser = createAsyncThunk("auth/register",async(userData,thunkAPI)=>{
    try{
        return await authService.register(userData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk("auth/login",async(userData,thunkAPI)=>{
    try{
        return await authService.login(userData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});


export const getUserWishlist = createAsyncThunk("auth/wishlist",async(thunkAPI)=>{
    try{
        return await authService.getUserWishlist();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const addProdToCart = createAsyncThunk("auth/cart/add",async(cartData,thunkAPI)=>{
    try{
        return await authService.addToCart(cartData);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAcart = createAsyncThunk("auth/cart/get",async(data,thunkAPI)=>{
    try{
        return await authService.getcart(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteACartProduct = createAsyncThunk("auth/cart/product/delete",async(data,thunkAPI)=>{
    try{
        return await authService.removeProductFromCart(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteAllCartProducts = createAsyncThunk("auth/cart/delete",async(thunkAPI)=>{
    try{
        return await authService.emptyCart();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateACartProduct = createAsyncThunk("auth/cart/product/update",async(cartDetail,thunkAPI)=>{
    try{
        return await authService.updateProductFromCart(cartDetail);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const createAnOrder = createAsyncThunk("auth/cart/create-order",async(orderDetail,thunkAPI)=>{
    try{
        return await authService.createOrder(orderDetail);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk("auth/order/get",async(thunkAPI)=>{
    try{
        return await authService.getUserOrders();
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProfile = createAsyncThunk("auth/profile/update",async(data,thunkAPI)=>{
    try{
        return await authService.updateuser(data);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotPasswordToken = createAsyncThunk("auth/password/token",async(email,thunkAPI)=>{
    try{
        return await authService.forgotPassToken(email);
    }
    catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");


const initialState = {
    user:getCustomerfromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

export const authslice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.createdUser = action.payload
            if(state.isSuccess === true){
                toast.success('User Created Successfully!');
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError === true){
                toast.error('User Registration Failed!');
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.user = action.payload
            if(state.isSuccess === true){
                localStorage.setItem("token",action.payload.token);
                toast.success('User Logged IN Successfully!');
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isError === true){
                toast.error("Invalid Credentials");
            }
        })
        .addCase(getUserWishlist.pending,(state)=>{
            state.isLoading=true
        }).addCase(getUserWishlist.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.wishlist = action.payload
        }).addCase(getUserWishlist.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(addProdToCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(addProdToCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.cartProduct= action.payload
            if(state.isSuccess === true){
                toast.success("Product Added To Cart !");
            }
        }).addCase(addProdToCart.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isSuccess === false){
                toast.error("Something Wen't Wrong !");
            }
        })
        .addCase(getAcart.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAcart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.cartProducts= action.payload
            
        }).addCase(getAcart.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
           
        })
        .addCase(deleteACartProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteACartProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.deletedCartProduct= action.payload
            if(state.isSuccess === true){
                toast.success("Product Deleted From Cart Successfully!");
            }
            
        }).addCase(deleteACartProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isSuccess === false){
                toast.error("Something Wen't Wrong!");
            }
        })
        .addCase(updateACartProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateACartProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.updatedCartProduct= action.payload
            if(state.isSuccess === true){
                toast.success("Product Updated From Cart Successfully!");
            }
            
        }).addCase(updateACartProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isSuccess === false){
                toast.error("Something Wen't Wrong!");
            }
        })
        .addCase(createAnOrder.pending,(state)=>{
            state.isLoading=true
        }).addCase(createAnOrder.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.orderedProduct= action.payload
            if(state.isSuccess === true){
                toast.success("Product Ordered Successfully!");
            }
            
        }).addCase(createAnOrder.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isSuccess === false){
                toast.error("Something Wen't Wrong!");
            }
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading=true
        }).addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.getorderedProduct= action.payload
            
        }).addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(updateProfile.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.updatedUser= action.payload
            if(state.isSuccess === true){
                let currentUserData = JSON.parse(localStorage.getItem("customer"));
                let newUserData = {
                    _id:currentUserData?._id,
                    token:currentUserData?.token,
                    firstname:action?.payload?.firstname,
                    lastname:action?.payload?.lastname,
                    email:action?.payload?.email,
                    mobile:action?.payload?.mobile
                }
                console.log(newUserData);
                localStorage.setItem("customer",JSON.stringify(newUserData));
                state.user = newUserData;
                toast.success("Profile Updated Successfully!");
            }
        }).addCase(updateProfile.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isSuccess === false){
                toast.error("Something Wen't Wrong!");
            }
        })
        .addCase(forgotPasswordToken.pending,(state)=>{
            state.isLoading=true
        }).addCase(forgotPasswordToken.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.token= action.payload
            if(state.isSuccess === true){
                toast.success("Forgot Password Email Sent Successfully!");
            }
        }).addCase(forgotPasswordToken.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
            if(state.isSuccess === false){
                toast.error("Something Wen't Wrong!");
            }
        })
        .addCase(deleteAllCartProducts.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteAllCartProducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.deletedcart= action.payload
        }).addCase(deleteAllCartProducts.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
        .addCase(resetState, () => initialState);
    }
})


export default authslice.reducer;