import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../../constants';
import { RootState } from '../index';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://696020a1e7aa517cb7956472.mockapi.io/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses.');
      }
      const result = await response.json();
      // MockAPI returns data in an array
      return result as Course[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred.');
    }
  }
);

export const deleteCourseAsync = createAsyncThunk(
  'courses/deleteCourseAsync',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://696020a1e7aa517cb7956472.mockapi.io/courses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete course on server.');
      }

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: Course[] = [];

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.push(action.payload);
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      return state.filter(course => course.id !== action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (_state, action: PayloadAction<Course[]>) => {
        // replace state with fetched courses
        return action.payload;
      })
      .addCase(fetchCourses.rejected, (_, action) => {
        console.error('Fetch error:', action.payload);
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action: PayloadAction<string>) => {
        return state.filter(course => course.id !== action.payload);
      });
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;

export default coursesSlice.reducer;

export const getCourses = (state: RootState) => state.courses;