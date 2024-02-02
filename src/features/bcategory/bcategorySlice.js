import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";
export const getBlogCategories = createAsyncThunk('blogCategories/get-blogCategories',async(thunkApi)=>{
    try {
        return await bcategoryService.getBlogCategories();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const addBlogCategories = createAsyncThunk('blogCategories/add-blogCategories',async(blogCategory,thunkApi)=>{
    try {
        return await bcategoryService.addBlogCategories(blogCategory);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
export const resetState=createAction('Reset_all')
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
        .addCase(addBlogCategories.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addBlogCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bcategories=action.payload;
        }).addCase(addBlogCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(resetState,()=>initialState);
    },
})
export default bcategorySlice.reducer;

