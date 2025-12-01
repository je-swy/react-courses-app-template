import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../store/hooks'; 
import { fetchCourses, getCourses } from '../../store/courses/coursesSlice';
import { fetchAuthors } from '../../store/authors/authorsSlice';

import { BUTTON_TEXT } from '../../constants';

import styles from './Courses.module.css';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

const Courses = () => { 
  const dispatch = useAppDispatch();

  const coursesList = useAppSelector(getCourses);

  // state to hold the current search term
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCourses()); 
    dispatch(fetchAuthors());
  }, [dispatch]); 

  const filteredCourses = useMemo(() => {
    if (!coursesList || coursesList.length === 0) {
      return [];
    }
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
        {/* Link for Add New Course */}
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
          />
        ))
      )}
    </section>
  );
};

export default Courses;