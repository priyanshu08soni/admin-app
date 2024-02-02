import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk('upload/images',async(data,thunkApi)=>{
    try {
        const formData=new FormData();
        for(let i=0;i<data.length;i++){
            formData.append("images",data[i])
        }
        return await uploadService.uploadImg(formData);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const delImg = createAsyncThunk('delete/images',async(id,thunkApi)=>{
    try {
        return await uploadService.deleteImg(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const resetState=createAction('Reset_all')

const initialState={
    images:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const uploadSlice=createSlice({
    name:"images",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(uploadImg.pending,(state)=>{
            state.isLoading=true;
        }).addCase(uploadImg.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.images=action.payload;
        }).addCase(uploadImg.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(delImg.pending,(state)=>{
            state.isLoading=true;
        }).addCase(delImg.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.images=[];
        }).addCase(delImg.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload;
        }).addCase(resetState,()=>initialState);
    },
})
export default uploadSlice.reducer;

