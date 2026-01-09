import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CreateCourse from './components/CreateCourse/CreateCourse';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import './App.css';
import './index.css';

import { getIsAuth } from './store/user/userSlice';

function App() {
  const isLoggedIn = useSelector(getIsAuth);

  return (
    <div className='container'>
      <Header /> 

      <main className='container-inner'>
        <Routes>
          <Route
            path='/login'
            element={
              isLoggedIn ? <Navigate to="/courses" replace /> : <Login />
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
                <Courses />
              </PrivateRoute>
            }
          />

          <Route
            path='/courses/add'
            element={
              <PrivateRoute>
                <CreateCourse />
              </PrivateRoute>
            }
          />

          <Route
            path='/courses/:courseId'
            element={
              <PrivateRoute>
                <CourseInfo />
              </PrivateRoute>}
          />

          <Route path='*' element={<h2>404: Page is not found</h2>} />

        </Routes>
      </main>
    </div>
  );
}

export default App;