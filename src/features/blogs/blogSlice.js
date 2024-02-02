import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";
export const getBlogs = createAsyncThunk('blog/get-blogs',async(thunkApi)=>{
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const addBlogs = createAsyncThunk('blog/add-blogs',async(blogData,thunkApi)=>{
    try {
        return await blogService.addBlogs(blogData);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const resetState=createAction('Reset_all')

const initialState={
    blogs:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const blogSlice=createSlice({
    name:"blogs",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogs.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogs=action.payload;
        }).addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addBlogs.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogs=action.payload;
        }).addCase(addBlogs.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState);
    },
})
export default blogSlice.reducer;

