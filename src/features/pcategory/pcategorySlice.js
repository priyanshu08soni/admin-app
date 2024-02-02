import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";


export const getCategories = createAsyncThunk('productCategory/get-categories',async(user,thunkApi)=>{
    try {
        return await pCategoryService.getProductCategories();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const addCategories = createAsyncThunk('brand/add-product-categories',async(category,thunkApi)=>{
    try {
        return await pCategoryService.addCategories(category)
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const getaPcategory = createAsyncThunk('category/get-p-category',async(_id,thunkApi)=>{
    try {
        return await pCategoryService.getaPcategory(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const deletePcategory = createAsyncThunk('category/delete-p-category',async(_id,thunkApi)=>{
    try {
        return await pCategoryService.deletePcategory(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const updatePcategory = createAsyncThunk('category/update-p-category',async(pCategory,thunkApi)=>{
    try {
        return await pCategoryService.updatePcategory(pCategory);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const resetState=createAction('Reset_all')

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
        .addCase(addCategories.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pcategories=action.payload;
        }).addCase(addCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getaPcategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getaPcategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pcategoryName=action.payload.title;
        }).addCase(getaPcategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updatePcategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updatePcategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedpCategory=action.payload;
        }).addCase(updatePcategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deletePcategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deletePcategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedCategory=action.payload;
        }).addCase(deletePcategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState);
    },
})
export default categorySlice.reducer;

