import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";
export const getBlogCategories = createAsyncThunk('blogCategories/get-blogCategories',async(user,thunkApi)=>{
    try {
        return await bcategoryService.getBlogCategories();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
const initialState={
    bcategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const bcategorySlice=createSlice({
    name:"bcategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogCategories.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBlogCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bcategories=action.payload;
        }).addCase(getBlogCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    },
})
export default bcategorySlice.reducer;

