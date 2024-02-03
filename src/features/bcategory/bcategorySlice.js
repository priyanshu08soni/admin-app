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
export const getaBlogCategory = createAsyncThunk('blogCategories/get-a-blogcategories',async(_id,thunkApi)=>{
    try {
        return await bcategoryService.getaBlogCategory(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const deleteBlogCategory = createAsyncThunk('blogCategories/delete-a-blogcategories',async(_id,thunkApi)=>{
    try {
        return await bcategoryService.deleteBlogCategory(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const updateBlogCategory = createAsyncThunk('blogCategories/update-blogcategories',async(bCategory,thunkApi)=>{
    try {
        return await bcategoryService.updateBlogCategory(bCategory);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
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
        })
        .addCase(getaBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getaBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogCatName=action.payload.title;
        }).addCase(getaBlogCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedBlogCategory=action.payload;
        }).addCase(updateBlogCategory.rejected,(state,action)=>{                                                                                   
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedBlogCategory=action.payload;
        }).addCase(deleteBlogCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState);
    },
})
export default bcategorySlice.reducer;

