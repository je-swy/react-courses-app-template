import { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import './App.css';
import './index.css';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleShowCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
  };

  const selectedCourse = selectedCourseId
    ? mockedCoursesList.find((course) => course.id === selectedCourseId)
    : undefined;

  return (
    <div className='container'>
      <Header isLoggedIn={isLoggedIn} />
      
      <main className='container-inner'>
          {/*<EmptyCourseList />*/}

        {selectedCourse ? (
          <CourseInfo
            course={selectedCourse}
            onBackClick={handleBackToCourses}
            authorsList={mockedAuthorsList}
          />
        ) : (
          <Courses
            coursesList={mockedCoursesList}
            authorsList={mockedAuthorsList}
            onShowCourse={handleShowCourse}
          />
        )}
      </main>
    </div>
  );
}

export default App;