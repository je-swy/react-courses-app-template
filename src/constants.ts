// src/constants.ts

// button text constants
export const BUTTON_TEXT = {
  LOGOUT: 'Logout',
  LOGIN: 'Login',
  SEARCH: 'Search',
  ADD_NEW: 'Add New Course',
  SHOW_COURSE: 'Show Course',
  BACK_TO_COURSES: 'Back',
  REGISTRATION: 'Registration',
  CREATE_AUTHOR: 'Create Author',
  ADD_AUTHOR: 'Add Author',
  DELETE_AUTHOR: 'Delete Author',
  CREATE_COURSE: 'Create Course',
  CANCEL: 'Cancel',
};

// UI text constants
export const UI_TEXT = {
  USER_NAME: 'Harry Potter',
  SEARCH_PLACEHOLDER: 'Input text',

  AUTHORS: 'Authors',
  DURATION: 'Duration',
  CREATED: 'Created',
  DESCRIPTION: 'Description',
  ID: 'ID',
  EDIT_ALT: 'Edit course',
  DELETE_ALT: 'Delete course',

  REGISTRATION: 'Registration',
  REGISTRATION_BTN: 'Register',
  REGISTRATION_SUCCESSFUL: 'Registration successful!',

  PLACEHOLDER_NAME: 'Enter your name',
  PLACEHOLDER_EMAIL: 'Enter your email',
  PLACEHOLDER_PASSWORD: 'Enter your password',

  LABEL_NAME: 'Name',
  LABEL_EMAIL: 'Email',
  LABEL_PASSWORD: 'Password',

  LOGIN: 'Login',
  LOGIN_SUCCESSFUL: 'Login successful!',

  EMPTY_LIST_TITLE: 'Course List is Empty',
  EMPTY_LIST_SUBTITLE: 'Please use "Add New Course" button to add your first course',
  DELETE_AUTHOR_ALT: 'Delete author',
  CREATE_COURSE_TITLE: 'Course edit/create page',
  MAIN_INFO: 'Main Info',
  LABEL_TITLE: 'Title',
  PLACEHOLDER_TITLE: 'Input text',
  LABEL_DESCRIPTION: 'Description',
  PLACEHOLDER_DESCRIPTION: 'Input text',
  LABEL_DURATION: 'Duration',
  PLACEHOLDER_DURATION: 'Input text',
  LABEL_AUTHOR_NAME: 'Author name',
  PLACEHOLDER_AUTHOR_NAME: 'Input text',
  AUTHORS_LIST: 'Authors List',
  NO_AVAILABLE_AUTHORS: 'No available authors',
  COURSE_AUTHORS: 'Course Authors',
  COURSE_AUTHORS_EMPTY: 'Author list is empty',
};

export const ERROR_MESSAGES = {
  VALIDATUON_ERROR: 'Validation failed',
  REQUIRED: 'required',
  IS_REQUIRED: 'is required',
  NAME_TOO_SHORT: 'Author name should be at least 2 characters',
  INVALID_EMAIL: 'Invalid email format',
  TITLE_IS_REQUIERED: 'Title is required and should be at least 2 characters',
  TITLE_TOO_SHORT: 'Title must be at least 2 characters',
  DESCRIPTION_IS_REQIERED: 'Description is required and should be at least 2 characters',
  AUTHORS_IS_REQUIERED: 'Author name should be at least 2 characters',
  AUTHORS_REQUIRED: 'At least one author is required',
  DESC_TOO_SHORT: 'Description must be at least 2 characters',
  DURATION_INVALID: 'Duration is required',
  NEW_AUTHOR_NAME_TOO_SHORT: 'Author name must be at least 2 characters',
  PASSWORD_TOO_SHORT: (minLength: number) => `Password must be at least ${minLength} characters`,
};

// author type
export interface Author {
  id: string;
  name: string;
}

// course type
export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string; // format: dd.mm.yyyy
  duration: number;     // specified in minutes as described in mock data
  authors: string[];    // array of author IDs
}

// list of authors
export const mockedAuthorsList: Author[] = [
  {
    id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
    name: 'Vasiliy Dobkin'
  },
  {
    id: 'f762978b-61eb-4096-812b-ebde22838167',
    name: 'Nicolas Kim'
  },
  {
    id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
    name: 'Anna Sidorenko'
  },
  {
    id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
    name: 'Valentina Larina'
  },
];

// list of courses
export const mockedCoursesList: Course[] = [
  {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book. It has survived
                    not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                    nchanged.`,
    creationDate: '08/03/2021',
    duration: 160,
    authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d', 'f762978b-61eb-4096-812b-ebde22838167'],
  },
  {
    id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
    title: 'Angular',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book.`,
    creationDate: '10/11/2020',
    duration: 210,
    authors: ['df32994e-b23d-497c-9e4d-84e4dc02882f', '095a1817-d45b-4ed7-9cf7-b2417bcbf748'],
  },
];