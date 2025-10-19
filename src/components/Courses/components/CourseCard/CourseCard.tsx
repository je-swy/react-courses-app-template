import { Course, mockedAuthorsList, BUTTON_TEXT, UI_TEXT } from '../../../../constants';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import Button from '../../../../common/Button/Button';

import editIcon from '../../../../assets/images/Icon-Edit.svg';
import deleteIcon from '../../../../assets/images/Icon-Trash.svg';

import './CourseCard.css';

interface CourseCardProps {
  course: Course;
  onShowCourse: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onShowCourse }) => {
  const authorsNames = course.authors
    .map((authorId) => {
      const author = mockedAuthorsList.find((a) => a.id === authorId);
      return author ? author.name : 'Unknown Author';
    })
    .join(', ');
return (
    <article className='course-card'>
      <section className='course-main'>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </section>

      <section className='course-details'>
        <p className='course-authors'>
          <strong>{UI_TEXT.AUTHORS}</strong> {authorsNames}
        </p>
        <p>
          <strong>{UI_TEXT.DURATION}</strong> {getCourseDuration(course.duration)}
        </p>
        <p>
          <strong>{UI_TEXT.CREATED}</strong> {formatCreationDate(course.creationDate)}
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
    </article>
  );
};

export default CourseCard;