import { Course, mockedAuthorsList } from '../../constants';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import Button from '../../common/Button/Button';
import './CourseInfo.css';
import { BUTTON_TEXT, UI_TEXT } from '../../constants';

interface CourseInfoProps {
  course: Course;
  onBackClick: () => void;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course, onBackClick }) => {
  const authorsNames = course.authors
    .map((authorId) => mockedAuthorsList.find((a) => a.id === authorId)?.name)
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
            <strong>{UI_TEXT.DURATION}</strong> <span>{getCourseDuration(course.duration)}</span>
          </p>
          <p>
            <strong>{UI_TEXT.CREATED}</strong> <span>{formatCreationDate(course.creationDate)}</span>
          </p>
          <p>
            <strong>{UI_TEXT.AUTHORS}</strong> <span>{authorsNames}</span>
          </p>
        </section>
      </article>
      <section className='back-button-container'>
        <Button buttonText={BUTTON_TEXT.BACK_TO_COURSES} onClick={onBackClick} />
      </section>
    </section>
  );
};

export default CourseInfo;