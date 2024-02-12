import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromLocalStorage=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;

const initialState={
    user:getUserfromLocalStorage,
    orders:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
};

export const login = createAsyncThunk('auth/admin-login',async(user,thunkApi)=>{
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const getOrders = createAsyncThunk('order/getallorders',async(thunkApi)=>{
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const getOrderByUser = createAsyncThunk('order/getorderbyid',async(id,thunkApi)=>{
    try {
        return await authService.getOrder(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload;
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.orders=action.payload;
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(getOrderByUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getOrderByUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.orderbyuser=action.payload;
        })
        .addCase(getOrderByUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
    },
})

export default authSlice.reducer;
