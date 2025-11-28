import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CreateCourse from './components/CreateCourse/CreateCourse';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import './App.css';
import './index.css';

import { Course, Author, mockedCoursesList, mockedAuthorsList } from './constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [user, setUserName] = useState(localStorage.getItem('user') || '');
  const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
  const [authors] = useState<Author[]>(mockedAuthorsList);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUser || '');
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUserName(localStorage.getItem('user') || '');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <BrowserRouter>
      <div className='container'>
        <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

        <main className='container-inner'>
          <Routes>
            <Route
              path='/login'
              element={
                isLoggedIn ? <Navigate to="/courses" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route
              path='/registration'
              element={
                isLoggedIn ? <Navigate to="/courses" replace /> : <Registration />
              } />
            <Route path='/' element={<Navigate replace to='/courses' />} />

            <Route
              path='/courses'
              element={
                <PrivateRoute>
                  <Courses
                    coursesList={courses}
                    authorsList={authors}
                  />
                </PrivateRoute>
              }
            />

            <Route
              path='/courses/add'
              element={
                <PrivateRoute>
                  <CreateCourse onCourseCreate={handleAddCourse} />
                </PrivateRoute>
              }
            />

            <Route
              path='/courses/:courseId'
              element={
                <PrivateRoute>
                  <CourseInfo coursesList={courses} authorsList={authors} />
                </PrivateRoute>}
            />

            <Route path='*' element={<h2>404: Page is not found</h2>} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;