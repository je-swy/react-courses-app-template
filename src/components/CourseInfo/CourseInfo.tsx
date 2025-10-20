import { Course, Author, BUTTON_TEXT, UI_TEXT } from '../../constants';
import getCourseDuration from '../../helpers/getCourseDuration';
import formatCreationDate from '../../helpers/formatCreationDate';
import Button from '../../common/Button/Button';
import './CourseInfo.css';

interface CourseInfoProps {
  course: Course;
  authorsList?: Author[];
  onBackClick: () => void;
}

// Default course info to use if no course is provided
const DEFAULT_COURSE_INFO: Course = {
  id: 'N/A',
  title: 'Course 1',
  description: 'Course 1 description',
  authors: [], 
  duration: 60,
  creationDate: '01/01/2025',
};

const CourseInfo: React.FC<CourseInfoProps> = ({
  course = DEFAULT_COURSE_INFO,
  authorsList = [],
  onBackClick,
}) => {
  const authorsNames = course.authors
    .map((authorId) => authorsList.find((a) => a.id === authorId)?.name)
    .join(', ');

  return (
    <section className='course-info-container'>
      <h1>{course.title}</h1>
      <article className='course-info-content'>
        <section className='course-description'>
          <h3>{UI_TEXT.DESCRIPTION}</h3>
          <p>{course.description}</p>
        </section>

        <section className='course-meta'>
          <p>
            <strong>{UI_TEXT.ID}</strong> <span>{course.id}</span>
          </p>
          <p>
            <strong>{UI_TEXT.DURATION}</strong>{' '}
            <span>{getCourseDuration(course.duration)}</span>
          </p>
          <p>
            <strong>{UI_TEXT.CREATED}</strong>{' '}
            <span>{formatCreationDate(course.creationDate)}</span>
          </p>
          <p>
            <strong>{UI_TEXT.AUTHORS}</strong> <span>{authorsNames}</span>
          </p>
        </section>
      </article>

      <article className='back-button-container'>
        <Button buttonText={BUTTON_TEXT.BACK_TO_COURSES} onClick={onBackClick} />
      </article>
    </section>
  );
};

export default CourseInfo;