import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Course } from '../../constants';
import { RootState } from '../index';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/courses/all');
      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || 'Failed to fetch courses.');
      }

      return result.result;
    } catch (error) {
      return rejectWithValue('Network error occurred.');
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
    builder.addCase(fetchCourses.fulfilled, (_state, action: PayloadAction<Course[]>) => {
      return action.payload;
    });
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
export const getCourses = (state: RootState) => state.courses;