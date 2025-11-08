import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Course, Author, BUTTON_TEXT, mockedCoursesList } from '../../constants';

import styles from './Courses.module.css';

import SearchBar from './components/SearchBar/SearchBar';
// import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

// describe the props that Courses expects to receive from App
interface CoursesProps {
  coursesList: Course[];
  authorsList: Author[];
  // onShowCourse: (courseId: string) => void;
  // onAddNewCourseClick: () => void;
}

// define Courses as a React Functional Component, which takes these props
const Courses: React.FC<CoursesProps> = ({
  coursesList = mockedCoursesList,
  authorsList = [],
  // onShowCourse,
  // onAddNewCourseClick 
}) => {

  // state to hold the current search term
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(() => {
    // if search term is empty, return full list
    if (!searchTerm) {
      return coursesList;
    }
    // otherwise, filter courses by title or id
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // case insensitive search
    // if course title or id includes the search term, include it in results
    return coursesList.filter(
      (course) =>
        course.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        course.id.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [coursesList, searchTerm]); // recalculate only when coursesList or searchTerm changes

  // function to handle search from SearchBar
  const handleSearch = (term: string) => {
    setSearchTerm(term); // update state with new search term
  };

  return (
    <section className={styles.coursesContainer}>
      <article className={styles.panel}>
        {/* pass handleSearch to Search component */}
        <SearchBar onSearch={handleSearch} />
        {/* <Button
          buttonText={BUTTON_TEXT.ADD_NEW}
          onClick={onAddNewCourseClick}
        /> */}
        <Link to="/courses/add" className={`button ${styles.courseAddButton}`}>
          {BUTTON_TEXT.ADD_NEW}
        </Link>
      </article>
      {filteredCourses.length === 0 ? (
        <EmptyCourseList /> // show empty component if no courses found
      ) : (
        filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            // onShowCourse={onShowCourse}
            authorsList={authorsList}
          />
        ))
      )}
    </section>
  );
};

export default Courses;