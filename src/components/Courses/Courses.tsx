import { Course, Author } from '../../constants';
import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

// describe the props that Courses expects to receive from App
interface CoursesProps {
  coursesList: Course[];
  authorsList: Author[];
  onShowCourse: (courseId: string) => void;
}

// define Courses as a React Functional Component, which takes these props
const Courses: React.FC<CoursesProps> = ({ coursesList, onShowCourse }) => {
  return (
    <section className='courses-container'>
      {coursesList.length === 0 ? (
        <EmptyCourseList />
      ) : (
        coursesList.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onShowCourse={onShowCourse}
          />
        ))
      )}
    </section>
  );
};

export default Courses;