#### Task #4 - Mastering State In React Redux

# 📚 Learning Courses App — Mastering State in React

This is a comprehensive Learning Management System (LMS) application built as part of the "Mastering State in React" project. The application demonstrates advanced state management techniques, integration with REST APIs, and a robust architecture using modern React practices.

## 🚀 Key Features

-   **Full Authentication Flow**: Secure Login and Registration pages with client-side validation and persistent user sessions via Redux and LocalStorage.
-   **Global State Management**: Implementation of Redux Toolkit for managing users, courses, and authors in a centralized store.
-   **Asynchronous Data Handling**: Integration with **MockAPI** using `createAsyncThunk` for full CRUD operations (Fetching and Deleting courses).
-   **Course Management**: A protected dashboard where users can view available courses, see detailed information, and create new learning materials.
-   **Dynamic Author Logic**: Intelligent system that extracts unique authors from existing courses and allows adding new authors locally during course creation.
-   **Protected Routing**: Custom `PrivateRoute` implementation to ensure that only authorized users can access the application's core features.

## 🛠 Tech Stack

-   **Core**: React 18, TypeScript
-   **State Management**: Redux Toolkit (Slices, Thunks, Selectors)
-   **Routing**: React Router v6
-   **Styling**: CSS Modules for encapsulated and maintainable styles
-   **Backend**: MockAPI (REST API)
-   **Utilities**: Crypto API (for UUIDs), Date-fns (or custom formatting helpers)

## 📁 Project Structure

-   `src/store`: Redux slices and typed hooks (`useAppDispatch`, `useAppSelector`).
-   `src/components`: Modular UI components including `CourseCard`, `CreateCourse`, and `Login/Registration` forms.
-   `src/common`: Reusable atomic components like `Input`, `Button`, and `AuthorItem`.
-   `src/helpers`: Utility functions for date formatting and duration calculation.

## 🔧 Getting Started

1. **Clone the repository**:

    ```bash
    git clone [https://github.com/je-swy/react-learning-courses-app.git](https://github.com/je-swy/react-learning-courses-app.git)
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the application**:

    ```bash
    npm run dev
    ```

## 📝 Learning Objectives Completed

* Migrating from local component state to global Redux state.
* Handling complex form validation and error messaging.
* Implementing asynchronous logic for API interaction.
* Managing side effects in React using useEffect and Redux Thunks.
* Developing a secure frontend architecture with Private Routes.
* Created as part of the React Development course.