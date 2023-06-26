import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import RegionsService from "../../services/RegionsService";
import { IRegion } from "../../types";

interface IState {
  regions: IRegion[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  regions: [],
  loading: false,
  error: null,
};

export const fetchRegions = createAsyncThunk(
  "regions/fetch",
  async () => {
    const res = await RegionsService.getRegions();
    return res.data.data;
  }
);

const regionsSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegions.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchRegions.fulfilled, (state, action: PayloadAction<IRegion[]>) => {
      state.loading = false;
      state.regions = action.payload;
      state.error = '';
    })
    builder.addCase(fetchRegions.rejected, (state) => {
      state.loading = false;
      state.regions = [];
      state.error = 'Failed to get regions.';
    })
  }
})

const { reducer } = regionsSlice;
export default reducer;