import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";


export const getBrands = createAsyncThunk('brand/get-brands',async(thunkApi)=>{
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const getaBrand = createAsyncThunk('brand/get-a-brand',async(_id,thunkApi)=>{
    try {
        return await brandService.getaBrand(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const deleteABrand = createAsyncThunk('brand/delete-a-brand',async(_id,thunkApi)=>{
    try {
        return await brandService.deleteABrand(_id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})
export const updateBrand = createAsyncThunk('brand/update-brand',async(brandData,thunkApi)=>{
    try {
        return await brandService.updateBrand(brandData);
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
export const resetState=createAction('Reset_all')

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
        .addCase(getaBrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getaBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.brandName=action.payload.title;
        }).addCase(getaBrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(updateBrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedBrand=action.payload;
        }).addCase(updateBrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteABrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteABrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedBrand=action.payload;
        }).addCase(deleteABrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState);
        
    },
})
export default brandSlice.reducer;

