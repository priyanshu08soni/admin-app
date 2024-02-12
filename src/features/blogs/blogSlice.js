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
export const deleteBlog = createAsyncThunk('blog/delete-a-blog',async(_id,thunkApi)=>{
    try {
        return await blogService.deleteBlog(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const updateBlog = createAsyncThunk('blog/update-blog',async(blog,thunkApi)=>{
    try {
        return await blogService.updateBlog(blog);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const getABlog = createAsyncThunk('blog/get-a-blog',async(_id,thunkApi)=>{
    try {
        return await blogService.getBlog(_id);
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
        .addCase(getABlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getABlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogName=action.payload.title;
            state.blogDescription=action.payload.description;
            state.blogCategory=action.payload.category;
            state.blogImages=action.payload.images;
        }).addCase(getABlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedBlog=action.payload;
        }).addCase(updateBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedBlog=action.payload;
        }).addCase(deleteBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    },
})
export default blogSlice.reducer;

