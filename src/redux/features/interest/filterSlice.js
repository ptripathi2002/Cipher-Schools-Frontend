import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredInterests: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_INTERESTS(state, action) {
      const { interests, search } = action.payload;
      const tempInterests = interests.filter(
        (interest) =>
          interest.name.toLowerCase().includes(search.toLowerCase()) ||
          interest.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredInterests = tempInterests;
    },
  },
});

export const { FILTER_INTERESTS } = filterSlice.actions;

export const selectFilteredInterests = (state) =>
  state.filter.filteredInterests;

export default filterSlice.reducer;
