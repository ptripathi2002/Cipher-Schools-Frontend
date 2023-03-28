import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interestService from "./interestService";
import { toast } from "react-toastify";

const initialState = {
  interest: null,
  interests: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

export const createInterest = createAsyncThunk(
  "interests/create",
  async (formData, thunkAPI) => {
    try {
      return await interestService.createInterest(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getInterests = createAsyncThunk(
  "interests/getAll",
  async (_, thunkAPI) => {
    try {
      return await interestService.getInterests();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteInterest = createAsyncThunk(
  "interests/delete",
  async (id, thunkAPI) => {
    try {
      return await interestService.deleteInterest(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getInterest = createAsyncThunk(
  "interests/getInterest",
  async (id, thunkAPI) => {
    try {
      return await interestService.getInterest(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editInterest = createAsyncThunk(
  "interests/editInterest",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await interestService.editInterest(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const interests = action.payload;
      const array = [];
      interests.map((item) => {
        const { price, quantity } = item;
        const interestValue = price * quantity;
        return array.push(interestValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const interests = action.payload;
      const array = [];
      interests.map((item) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const interests = action.payload;
      const array = [];
      interests.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInterest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInterest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.interest.push(action.payload);
        toast.success("Interest added successfully");
      })
      .addCase(createInterest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getInterests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.interests = action.payload;
      })
      .addCase(getInterests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteInterest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInterest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Interest deleted successfully");
      })
      .addCase(deleteInterest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getInterest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.interest = action.payload;
      })
      .addCase(getInterest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(editInterest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editInterest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Interest Updated Successfully");
      })
      .addCase(editInterest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  interestSlice.actions;

export const selectIsLoading = (state) => state.interest.isLoading;
export const selectInterest = (state) => state.interest.interest;
export const selectTotalStoreValue = (state) => state.interest.totalStoreValue;
export const selectOutOfStock = (state) => state.interest.outOfStock;
export const selectCategory = (state) => state.interest.category;

export default interestSlice.reducer;
