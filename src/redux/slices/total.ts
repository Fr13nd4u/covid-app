import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import TotalService from "../../services/TotalService";
import { ICovidData } from "../../types";

interface IState {
  total: ICovidData | null;
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  total: null,
  loading: false,
  error: null,
};

export const fetchTotal = createAsyncThunk(
  "total/fetch",
  async () => {
    const res = await TotalService.getTotal();
    return res.data.data;
  }
);

const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotal.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchTotal.fulfilled, (state, action: PayloadAction<ICovidData>) => {
      state.loading = false;
      state.total = action.payload;
      state.error = '';
    })
    builder.addCase(fetchTotal.rejected, (state) => {
      state.loading = false;
      state.total = null;
      state.error = 'Failed to get data.';
    })
  }
})

const { reducer } = totalSlice;
export default reducer;