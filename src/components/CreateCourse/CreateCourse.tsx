import { useState, useMemo } from 'react';

import styles from './CreateCourse.module.css';

import { Course, Author, mockedAuthorsList, UI_TEXT, ERROR_MESSAGES, BUTTON_TEXT } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';
import getCourseDuration from '../../helpers/getCourseDuration';

import { formatCurrentDate } from '../../helpers/formatCreationDate';

// Define the props interface for the CreateCourse component
interface CreateCourseProps {
  // Prop: A callback function to pass the new course up to the App component
  onCourseCreate: (newCourse: Course) => void; // Function to add the course in App
  // Prop: A callback function to navigate back
  onCancel: () => void; // Function to go back to Courses view
}

// Define the CreateCourse functional component, destructuring props
const CreateCourse: React.FC<CreateCourseProps> = ({ onCourseCreate, onCancel }) => {
  const [title, setTitle] = useState(''); // State for the course title input and etc
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [newAuthorName, setNewAuthorName] = useState('');

  // Manage author lists
  // State for the list of authors *not* yet added to the course
  const [availableAuthors, setAvailableAuthors] = useState<Author[]>(mockedAuthorsList); // Start with all authors
  // State for the list of authors *selected* for this course
  const [courseAuthors, setCourseAuthors] = useState<Author[]>([]); // Start with none selected

  // Validation errors
  // State to hold validation error messages for form fields
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    duration: '',
    newAuthorName: '',
    courseAuthors: '',
  });

  // Memoize the formatted duration string (e.g., "01:30 hours")
  const formattedDuration = useMemo(() => {
    const minutes = parseInt(duration, 10); // Convert the string duration to a number
    return isNaN(minutes) || minutes <= 0 ? '00:00 hours' : getCourseDuration(minutes);
  }, [duration]); // Recalculate only when the 'duration' state changes

  // Handler for the duration input field
  const handleDurationChange = (value: string) => {
    // Allow only numbers
    // Use regex to ensure only digits are entered
    if (/^\d*$/.test(value)) {
      // Update the duration state
      setDuration(value);
    }
  };

  // Handler for the "Create Author" button
  const handleCreateAuthor = () => {
    let isValid = true; // Flag for validation
    let authorError = '';

    // Combined check for empty or too short
    if (newAuthorName.length < 2) {
      authorError = ERROR_MESSAGES.NAME_TOO_SHORT
      isValid = false;
    }

    // Update the errors state with the result
    setErrors((prev) => ({ ...prev, newAuthorName: authorError }));

    // If validation passed create a new author object
    if (isValid) {
      const newAuthor: Author = {
        id: crypto.randomUUID(), // Generate unique ID
        name: newAuthorName, // Assign the name from state
      };
      // Add the new author to the 'available' list
      setAvailableAuthors((prev) => [...prev, newAuthor]); // Add to the available list
      setNewAuthorName('');
    }
  };

  // Handler to move an author from 'available' to 'course' list
  const handleAddAuthor = (authorId: string) => {
    // Find the author in the available list by their ID
    const authorToAdd = availableAuthors.find((a) => a.id === authorId);
    // If the author exists...
    if (authorToAdd) {
      // Add them to the course authors list
      setCourseAuthors((prev) => [...prev, authorToAdd]);
      // Remove them from the available authors list
      setAvailableAuthors((prev) => prev.filter((a) => a.id !== authorId));
    }
  };

  // Handler to move an author from 'course' back to 'available' list
  const handleDeleteAuthor = (authorId: string) => {
    // Find the author in the course authors list
    const authorToDelete = courseAuthors.find((a) => a.id === authorId);
    // If the author exists...
    if (authorToDelete) {
      // Add them back to the available authors list
      setAvailableAuthors((prev) => [...prev, authorToDelete]);
      // Remove them from the course authors list
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

  // Main validation function for the entire form
  const validateForm = (): boolean => {
    // Initialize a new errors object
    const newErrors = {
      title: '', description: '', duration: '', newAuthorName: '', courseAuthors: '',
    };
    // Start with a valid state
    let isValid = true;

    // Validate title presence
    if (!title) {
      newErrors.title = ERROR_MESSAGES.TITLE_IS_REQUIERED; isValid = false;
      // Validate title length
    } else if (title.length < 2) {
      newErrors.title = ERROR_MESSAGES.TITLE_TOO_SHORT; isValid = false;
    }

    // Validate description presence
    if (!description) {
      newErrors.description = ERROR_MESSAGES.DESCRIPTION_IS_REQIERED; isValid = false;
      // Validate description length
    } else if (description.length < 2) {
      newErrors.description = ERROR_MESSAGES.DESC_TOO_SHORT; isValid = false;
    }

    // Parse duration string to number for validation
    const durationNum = parseInt(duration, 10);
    // Validate duration is a positive number
    if (!duration || isNaN(durationNum) || durationNum <= 0) {
      newErrors.duration = ERROR_MESSAGES.DURATION_INVALID; isValid = false;
    }

    // Validate that at least one author is selected
    if (courseAuthors.length === 0) {
      newErrors.courseAuthors = ERROR_MESSAGES.AUTHORS_REQUIRED; isValid = false;
    }

    // Update the errors state with all new messages
    setErrors(newErrors);
    // Return the overall form validity
    return isValid;
  };

  // Handler for the final "Create Course" button
  const handleCreateCourse = () => {
    // Run validation first
    if (validateForm()) {
      // If valid, create the new course object
      const newCourse: Course = {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        creationDate: formatCurrentDate(),
        duration: parseInt(duration, 10),
        authors: courseAuthors.map((a) => a.id),
      };
      // Call the prop function to pass the new course data up
      onCourseCreate(newCourse);
    } else {
      console.log('Course creation validation failed');
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
            {/* Conditionally render the description error message */}
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
              {/* Check if there are any available authors */}
              {availableAuthors.length > 0 ? (
                // If yes, map through them
                availableAuthors.map((author) => (
                  // Render an AuthorItem for each one
                  <AuthorItem
                    key={author.id}
                    author={author}
                    // Pass the 'add' handler
                    onClick={handleAddAuthor}
                    // Set variant to 'add'
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
            {/* Check if any authors have been added to the course */}
            {courseAuthors.length > 0 ? (
              // If yes, map through them
              courseAuthors.map((author) => (
                // Render an AuthorItem for each one
                <AuthorItem
                  key={author.id}
                  author={author}
                  // Pass the 'delete' handler
                  onClick={handleDeleteAuthor}
                  // Set variant to 'delete'
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
        <Button
          buttonText={BUTTON_TEXT.CANCEL}
          onClick={onCancel}
        />
        <Button
          buttonText={BUTTON_TEXT.CREATE_COURSE}
          onClick={handleCreateCourse}
        />
      </div>
    </div>
  );
};

export default CreateCourse;