import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICovidData } from "../../types";
import CountryService from "../../services/CountryService";

interface IState {
  country: ICovidData[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  country: [],
  loading: false,
  error: null,
};

export const fetchCountry = createAsyncThunk(
  "country/fetch",
  async ({iso, dates} : {iso: string, dates: string[]}) => {
    const res = await CountryService.getCountry({iso, dates});
    return res;
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchCountry.fulfilled, (state, action: PayloadAction<ICovidData[]>) => {
      state.loading = false;
      state.country = action.payload;
      state.error = '';
    })
    builder.addCase(fetchCountry.rejected, (state) => {
      state.loading = false;
      state.country = [];
      state.error = 'Failed to get data.';
    })
  }
})

const { reducer } = countrySlice;
export default reducer;