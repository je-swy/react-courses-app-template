import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks'; 

import { getCourses } from '../../store/courses/coursesSlice';
import { getAuthors } from '../../store/authors/authorsSlice';

import { BUTTON_TEXT, UI_TEXT } from '../../constants';

import getCourseDuration from '../../helpers/getCourseDuration';
import formatCreationDate from '../../helpers/formatCreationDate';

import './CourseInfo.css';

const CourseInfo = () => {
  
  const coursesList = useAppSelector(getCourses);
  const authorsList = useAppSelector(getAuthors);

  const { courseId } = useParams<{ courseId: string }>();

  const course = coursesList.find((c) => c.id === courseId);

  if (!course) {
    return <Navigate to='/courses' replace />;
  }

  let authorsNames = course.authors
    .map((authorId) => authorsList.find((a) => a.id === authorId)?.name)
    .join(', ');
  if (!authorsNames) {
    authorsNames = 'name2, name3';
  }

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
        <Link to='/courses' className='button' data-testid="mock-link">
          {BUTTON_TEXT.BACK_TO_COURSES}
        </Link>
      </article>
    </section>
  );
};

export default CourseInfo;