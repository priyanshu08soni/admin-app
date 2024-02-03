import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk('color/get-colors',async(thunkApi)=>{
    try {
        return await colorService.getColors();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const addColors = createAsyncThunk('color/add-colors',async(color,thunkApi)=>{
    try {
        return await colorService.addColors(color);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const getaColor = createAsyncThunk('color/get-a-color',async(_id,thunkApi)=>{
    try {
        return await colorService.getaColor(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const deleteColor = createAsyncThunk('color/delete-a-color',async(_id,thunkApi)=>{
    try {
        return await colorService.deleteColor(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const updateColor = createAsyncThunk('color/update-color',async(colorData,thunkApi)=>{
    try {
        return await colorService.updateColor(colorData);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const resetState=createAction('Reset_all')

const initialState={
    colors:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const colorSlice=createSlice({
    name:"colors",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getColors.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getColors.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.colors=action.payload;
        }).addCase(getColors.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addColors.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addColors.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.colors=action.payload;
        }).addCase(addColors.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getaColor.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getaColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.colorName=action.payload.title;
        }).addCase(getaColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateColor.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedColor=action.payload;
        }).addCase(updateColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteColor.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedColor=action.payload;
        }).addCase(deleteColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState);
    },
})
export default colorSlice.reducer;

