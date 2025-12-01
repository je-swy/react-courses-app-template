import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Author } from '../../constants';
import { RootState } from '../index';

const initialState: Author[] = [];

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/authors/all');
      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || 'Failed to fetch authors.');
      }
      return result.authors;
    } catch (error) {
      return rejectWithValue('Network error occurred.');
    }
  }
);

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthors: (_state, action: PayloadAction<Author[]>) => {
      return action.payload;
    },
    addAuthor: (state, action: PayloadAction<Author>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.fulfilled, (_state, action: PayloadAction<Author[]>) => {
      return action.payload;
    });
  },
});

export const { setAuthors, addAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
export const getAuthors = (state: RootState) => state.authors;