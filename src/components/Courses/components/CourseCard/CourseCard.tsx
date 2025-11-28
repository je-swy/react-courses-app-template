import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks'; 
import { deleteCourse } from '../../../../store/courses/coursesSlice'; 

import { Course, BUTTON_TEXT, UI_TEXT } from '../../../../constants';

import getCourseDuration from '../../../../helpers/getCourseDuration';
import formatCreationDate from '../../../../helpers/formatCreationDate';

import editIcon from '../../../../assets/images/Icon-Edit.svg';
import deleteIcon from '../../../../assets/images/Icon-Trash.svg';

import { getAuthors } from '../../../../store/authors/authorsSlice';

import './CourseCard.css';

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const dispatch = useAppDispatch(); 
  const authorsList = useAppSelector(getAuthors); 

  const handleDelete = () => {
    dispatch(deleteCourse(course.id));
  };

  let authorsNames = course.authors
    .map((authorId) => authorsList.find((a) => a.id === authorId)?.name)
    .filter(Boolean)
    .join(', ') || 'name2, name3';

  return (
    <article className='course-card'>
      <h2>{course.title}</h2>
      <section className='course-info'>
        <section className='course-main'>
          <p>{course.description}</p>
        </section>

        <section className='course-details'>
          <p className='course-authors'>
            <strong>{UI_TEXT.AUTHORS}</strong>
            <span> {authorsNames}</span>
          </p>
          <p>
            <strong>{UI_TEXT.DURATION}</strong>
            <span> {getCourseDuration(course.duration)}</span>
          </p>
          <p>
            <strong>{UI_TEXT.CREATED}</strong>
            <span> {formatCreationDate(course.creationDate)}</span>
          </p>

          <section className='course-buttons'>
            <Link
              to={`/courses/${course.id}`}
              className='button'
            >
              {BUTTON_TEXT.SHOW_COURSE}
            </Link>
            
            <button className='icon-button button' onClick={() => alert('Edit clicked!')}>
              <img src={editIcon} alt={UI_TEXT.EDIT_ALT} />
            </button>
            
            <button 
              className='icon-button button' 
              onClick={handleDelete}
              data-testid={`delete-course-button-${course.id}`}
            >
              <img src={deleteIcon} alt={UI_TEXT.DELETE_ALT} />
            </button>
          </section>
        </section>
      </section>
    </article>
  );
};

export default CourseCard;