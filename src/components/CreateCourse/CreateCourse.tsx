import { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks'; 

import styles from './CreateCourse.module.css';

import { addAuthor, getAuthors, fetchAuthors } from '../../store/authors/authorsSlice';
import { addCourse } from '../../store/courses/coursesSlice';

import { Course, Author, UI_TEXT, ERROR_MESSAGES, BUTTON_TEXT } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';
import getCourseDuration from '../../helpers/getCourseDuration';

import { formatCurrentDate } from '../../helpers/formatCreationDate';

const CreateCourse = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);
  
  const allAuthors = useAppSelector(getAuthors);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');

  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]); 

  // Validation errors
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    duration: '',
    newAuthorName: '',
    courseAuthors: '',
  });

  // Memoize the list of available authors (not yet added to the course)
  const availableAuthors = useMemo(() => {
    const courseAuthorIds = new Set(courseAuthors.map(a => a.id));
    return allAuthors.filter(author => !courseAuthorIds.has(author.id));
  }, [allAuthors, courseAuthors]);

  // Memoize the formatted duration string (e.g., "01:30 hours")
  const formattedDuration = useMemo(() => {
    const minutes = parseInt(duration, 10);
    return isNaN(minutes) || minutes <= 0 ? '00:00 hours' : getCourseDuration(minutes);
  }, [duration]);

  // Handler for the duration input field (remains unchanged)
  const handleDurationChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setDuration(value);
    }
  };

  // 8. Handler for the "Create Author" button
  const handleCreateAuthor = () => {
    let isValid = true;
    let authorError = '';

    if (newAuthorName.length < 2) {
      authorError = ERROR_MESSAGES.NAME_TOO_SHORT
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, newAuthorName: authorError }));

    if (isValid) {
      const newAuthor: Author = {
        id: crypto.randomUUID(),
        name: newAuthorName,
      };


      // use data from Redux Store
      dispatch(addAuthor(newAuthor)); 
      
      setNewAuthorName('');
    }
  };

  // Handler to move an author from 'available' to 'course' list (remains local)
  const handleAddAuthor = (authorId: string) => {
    // Find the author in allAuthors
    const authorToAdd = allAuthors.find((a) => a.id === authorId);
    
    if (authorToAdd) {
      setCourseAuthors((prev) => [...prev, authorToAdd]);
    }
  };

  // Handler to move an author from 'course' back to 'available' list (remains local)
  const handleDeleteAuthor = (authorId: string) => {
    const authorToDelete = courseAuthors.find((a) => a.id === authorId);
    
    if (authorToDelete) {
      setCourseAuthors((prev) => prev.filter((a) => a.id !== authorId));
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: '' }));
    }
  };

  const handleAuthorNameChange = (value: string) => {
    setNewAuthorName(value);
    if (errors.newAuthorName) {
      setErrors((prev) => ({ ...prev, newAuthorName: '' }));
    }
  };

  // Main validation function for the entire form (remains unchanged)
  const validateForm = (): boolean => {
    const newErrors = {
      title: '', description: '', duration: '', newAuthorName: '', courseAuthors: '',
    };
    let isValid = true;

    if (title.length < 2) {
      newErrors.title = ERROR_MESSAGES.TITLE_IS_REQUIERED;
      isValid = false;
    }

    if (description.length < 2) {
      newErrors.description = ERROR_MESSAGES.DESCRIPTION_IS_REQIERED;
      isValid = false;
    }
    const durationNum = parseInt(duration, 10);
    if (!duration || isNaN(durationNum) || durationNum <= 0) {
      newErrors.duration = ERROR_MESSAGES.DURATION_INVALID;
      isValid = false;
    }

    if (courseAuthors.length === 0) {
      newErrors.courseAuthors = ERROR_MESSAGES.AUTHORS_REQUIRED;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handler for the final "Create Course" button
const handleCreateCourse = async () => {
    const isValid = validateForm();

    if (isValid) {
      const newCourse: Course = {
        id: crypto.randomUUID(),
        title,
        description,
        creationDate: formatCurrentDate(),
        duration: parseInt(duration, 10),
        // Using author names directly
        authors: courseAuthors.map((a) => a.name), 
      };
      
      try {

        const response = await fetch('https://696020a1e7aa517cb7956472.mockapi.io/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCourse)
        });

        if (response.ok) {
          // If the course is successfully saved on the server, update the Redux store
          dispatch(addCourse(newCourse)); 
          navigate('/courses'); 
        }
      } catch (error) {
        console.error("Failed to save course:", error);
        // Even if the server fails, update the local store for testing
        dispatch(addCourse(newCourse));
        navigate('/courses');
      }
    }
  };


  return (
    <div>
      <h1 className={styles.pageTitle}>{UI_TEXT.CREATE_COURSE_TITLE}</h1>

      <div className={styles.formContainer}>
        <section className={styles.mainInfo}>
          <h2>{UI_TEXT.MAIN_INFO}</h2>
          <Input
            labelText={UI_TEXT.LABEL_TITLE}
            value={title}
            onChange={handleTitleChange}
            placeholderText={UI_TEXT.PLACEHOLDER_TITLE}
            error={errors.title}
          />
          <div className={styles.descriptionContainer}>
            <label className={styles.descriptionLabel} htmlFor='course-description'>{UI_TEXT.LABEL_DESCRIPTION}</label>
            <textarea
              id='course-description'
              className={`${styles.descriptionTextarea} ${errors.description ? styles.inputError : ''}`}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder={UI_TEXT.PLACEHOLDER_DESCRIPTION}
            />
            {errors.description && <p className={styles.inputErrorMessage}>{errors.description}</p>}
          </div>
        </section>

        <section className={styles.secondaryInfo}>
          <section className={styles.leftColumn}>
            <section className={styles.durationSection}>
              <h2>{UI_TEXT.DURATION}</h2>
              <div className={styles.durationInputWrapper}>
                <Input
                  labelText={UI_TEXT.LABEL_DURATION}
                  value={duration}
                  onChange={handleDurationChange}
                  placeholderText={UI_TEXT.PLACEHOLDER_DURATION}
                  type="text"
                  error={errors.duration}
                />
                <p className={styles.durationDisplay}>
                  {/* Show the memoized duration string */}
                  <span className={styles.durationValue}>{formattedDuration}</span>
                </p>
              </div>
            </section>

            <section className={styles.authorsSectionWrapper}>
              <h2>{UI_TEXT.AUTHORS}</h2>

              <div className={styles.createAuthorSection}>
                <Input
                  labelText={UI_TEXT.LABEL_AUTHOR_NAME}
                  value={newAuthorName}
                  onChange={handleAuthorNameChange}
                  placeholderText={UI_TEXT.PLACEHOLDER_AUTHOR_NAME}
                  error={errors.newAuthorName}
                />
                <Button
                  buttonText={BUTTON_TEXT.CREATE_AUTHOR}
                  onClick={handleCreateAuthor}
                  className={styles.createAuthorButton}
                />
              </div>
            </section>
            <section className={styles.authorsList}>
              <h3>{UI_TEXT.AUTHORS_LIST}</h3>
              {availableAuthors.length > 0 ? (
                availableAuthors.map((author) => (
                  // Render an AuthorItem
                  <AuthorItem
                    key={author.id}
                    author={author}
                    onClick={handleAddAuthor}
                    variant="add"
                  />
                ))
              ) : (
                // If no, show a message
                <p>{UI_TEXT.NO_AVAILABLE_AUTHORS}</p>
              )}
            </section>
          </section>
          <section className={`${styles.authorsList} ${styles.rightColumn}`} >
            <h3>{UI_TEXT.COURSE_AUTHORS}</h3>
            {courseAuthors.length > 0 ? (
              courseAuthors.map((author) => (
                // Render an AuthorItem
                <AuthorItem
                  key={author.id}
                  author={author}
                  onClick={handleDeleteAuthor}
                  variant="delete"
                />
              ))
            ) : (
              // If no, show an "empty" message
              <p>{UI_TEXT.COURSE_AUTHORS_EMPTY}</p>
            )}
            {errors.courseAuthors && <p className={styles.inputErrorMessage}>{errors.courseAuthors}</p>}
          </section>
        </section>

      </div>

      {/* Container for the form buttons create, cancel*/}
      <div className={styles.actionButtons}>
        {/* Use Link component to navigate back to courses list */}
        <Link to="/courses" className="button">
          {BUTTON_TEXT.CANCEL}
        </Link>
        <Button
          buttonText={BUTTON_TEXT.CREATE_COURSE}
          onClick={handleCreateCourse}
        />
      </div>
    </div>
  );
};

export default CreateCourse;