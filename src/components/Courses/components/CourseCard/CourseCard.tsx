import { Course, Author, BUTTON_TEXT, UI_TEXT } from '../../../../constants';
import getCourseDuration from '../../../../helpers/getCourseDuration';
import formatCreationDate from '../../../../helpers/formatCreationDate';
import Button from '../../../../common/Button/Button';

import editIcon from '../../../../assets/images/Icon-Edit.svg';
import deleteIcon from '../../../../assets/images/Icon-Trash.svg';

import './CourseCard.css';

interface CourseCardProps {
  course: Course;
  authorsList?: Author[];
  onShowCourse: (courseId: string) => void;
}

const DEFAULT_COURSE_CARD: Course = {
  id: 'N/A',
  title: 'Course Title',
  description: 'Course Description',
  authors: [],
  duration: 60,
  creationDate: '01/01/2025',
};

const CourseCard: React.FC<CourseCardProps> = ({
  course = DEFAULT_COURSE_CARD,
  authorsList = [],
  onShowCourse,
}) => {
  let authorsNames = course.authors
    .map((authorId) => {
      const author = authorsList.find((a) => a.id === authorId);
      return author ? author.name : 'Unknown Author';
    })
    .join(', ');
  if (!authorsNames && course.authors.length === 0) {
    authorsNames = 'name2, name3';
  }
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
            <Button
              buttonText={BUTTON_TEXT.SHOW_COURSE}
              onClick={() => onShowCourse(course.id)}
            />

            <button className='icon-button button' onClick={() => alert('Edit clicked!')}>
              <img src={editIcon} alt={UI_TEXT.EDIT_ALT} />
            </button>
            <button className='icon-button button' onClick={() => alert('Delete clicked!')}>
              <img src={deleteIcon} alt={UI_TEXT.DELETE_ALT} />
            </button>
          </section>
        </section>
      </section>
    </article>
  );
};

export default CourseCard;