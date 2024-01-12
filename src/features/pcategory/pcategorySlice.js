import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";


export const getCategories = createAsyncThunk('productCategory/get-categories',async(user,thunkApi)=>{
    try {
        return await pCategoryService.getProductCategories();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
const initialState={
    pcategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const categorySlice=createSlice({
    name:"pcategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCategories.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pcategories=action.payload;
        }).addCase(getCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    },
})
export default categorySlice.reducer;

