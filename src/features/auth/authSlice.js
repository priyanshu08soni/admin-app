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
export const getMonthlyOrders = createAsyncThunk('orders/monthlyOrderIncome',async(thunkApi)=>{
    try {
        return await authService.getMonthlyOrders();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const getYearlyOrders = createAsyncThunk('orders/yearlyOrderIncome',async(thunkApi)=>{
    try {
        return await authService.getYearlyOrders();
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
export const getOrder = createAsyncThunk('order/getorderbyid',async(id,thunkApi)=>{
    try {
        return await authService.getOrder(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const updateOrder = createAsyncThunk('order/update',async(data,thunkApi)=>{
    try {
        return await authService.updateOrder(data);
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
            state.isError=false;
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
        .addCase(getOrder.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.singleOrder=action.payload;
        })
        .addCase(getOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(updateOrder.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.updatedOrder=action.payload;
        })
        .addCase(updateOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(getMonthlyOrders.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getMonthlyOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.monthlyOrdersData=action.payload;
        })
        .addCase(getMonthlyOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
        .addCase(getYearlyOrders.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getYearlyOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.yearlyOrdersData=action.payload;
        })
        .addCase(getYearlyOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.user=null;
        })
    },
})

export default authSlice.reducer;
