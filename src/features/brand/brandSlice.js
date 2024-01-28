import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";


export const getBrands = createAsyncThunk('brand/get-brands',async(thunkApi)=>{
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const addBrands = createAsyncThunk('brand/add-brands',async(brand,thunkApi)=>{
    try {
        return await brandService.addBrands(brand);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
const initialState={
    brands:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const brandSlice=createSlice({
    name:"brands",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBrands.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBrands.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.brands=action.payload;
        }).addCase(getBrands.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addBrands.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addBrands.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.brands=action.payload;
        }).addCase(addBrands.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    },
})
export default brandSlice.reducer;

