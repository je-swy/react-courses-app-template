import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Author } from '../../constants';
import { RootState } from '../index';

const initialState: Author[] = [];

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://696020a1e7aa517cb7956472.mockapi.io/courses');
      const courses = await response.json();

      if (!response.ok) {
        return rejectWithValue('Failed to fetch data for authors.');
      }

      // generate authors list from courses data
      const allNames: string[] = courses.flatMap((course: any) => course.authors || []);
      
      // make names unique
      const uniqueNames = Array.from(new Set(allNames));

      // map to Author objects
      const authorsData: Author[] = uniqueNames.map(name => ({
        id: name,
        name: name
      }));

      return authorsData;
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