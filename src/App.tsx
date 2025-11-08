import { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CreateCourse from './components/CreateCourse/CreateCourse';
import './App.css';
import './index.css';
import { Course, Author, mockedCoursesList, mockedAuthorsList } from './constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showCreateCourse, setShowCreateCourse] = useState(false);

  // state for courses and authors
  const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
  const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);

  // Handlers
  const handleShowCourse = (courseId: string) => {
    setShowCreateCourse(false);
    setSelectedCourseId(courseId);
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
  };

  const showLogin = () => setIsLoginView(true);
  const showRegistration = () => setIsLoginView(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginView(true);
  };

  // Handlers for Create Course
  const handleShowCreateCourse = () => {
    setSelectedCourseId(null);
    setShowCreateCourse(true);
  };

  const handleCancelCreateCourse = () => {
    setShowCreateCourse(false);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setShowCreateCourse(false);
  };

  const selectedCourse = selectedCourseId
    ? courses.find((course) => course.id === selectedCourseId)
    : undefined;

  return (
    <div className='container'>
      <Header isLoggedIn={isLoggedIn} />

      <main className='container-inner'>
        {!isLoggedIn ? (
          isLoginView ? (
            <Login
              onShowRegistration={showRegistration}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <Registration onShowLogin={showLogin} />
          )
        ) : showCreateCourse ? (
          <CreateCourse
            onCourseCreate={handleAddCourse}
            onCancel={handleCancelCreateCourse}
          />
        ) : selectedCourse ? (
          <CourseInfo
            course={selectedCourse}
            onBackClick={handleBackToCourses}
            authorsList={authors}
          />
        ) : (
          <Courses
            coursesList={courses}
            authorsList={authors}
            onShowCourse={handleShowCourse}
            onAddNewCourseClick={handleShowCreateCourse}
          />
        )}
      </main>
    </div>
  );
}

export default App;