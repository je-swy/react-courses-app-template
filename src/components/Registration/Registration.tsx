import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styles from './Auth.module.css';

import { UI_TEXT, ERROR_MESSAGES } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { validateEmail, validatePassword } from '../../helpers/validation';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  // api error state
  const [apiError, setApiError] = useState<string | null>(null);

  // get navigation function
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    // reset API error on new validation
    setApiError(null);
    const newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (!name) {
      newErrors.name = ERROR_MESSAGES.REQUIRED;
      isValid = false;
    } else if (name.length < 2) {
      newErrors.name = ERROR_MESSAGES.NAME_TOO_SHORT;
      isValid = false;
    }

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    isValid = isValid && !emailError && !passwordError;
    setErrors(newErrors);
    return isValid;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  // update handleSubmit to be asynchronous
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // run client-side validation
    if (!validateForm()) {
      console.log('Client-side validation failed');
      return; // stop if validation fails
    }

    // prepare data for the API request (Order fixed for test reliability)
    const newUser = {
      name,
      email,
      password,
    };

    // send request to the server
    try {
      const response = await fetch('https://696020a1e7aa517cb7956472.mockapi.io/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      // handle server response
      if (response.ok) {
        navigate('/login');
      } else {
        // show server-side errors
        if (result.errors && Array.isArray(result.errors)) {
          setApiError(result.errors.join(', '));
        } else {
          setApiError('An unknown error occurred.');
        }
      }
    } catch (error) {
      // network or server error
      console.error('Registration error:', error);
      setApiError('Failed to connect to the server.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>{UI_TEXT.REGISTRATION}</h2>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={handleNameChange}
          labelText={UI_TEXT.LABEL_NAME}
          placeholderText={UI_TEXT.PLACEHOLDER_NAME}
          error={errors.name}
        />
        <Input
          value={email}
          onChange={handleEmailChange}
          labelText={UI_TEXT.LABEL_EMAIL}
          placeholderText={UI_TEXT.PLACEHOLDER_EMAIL}
          type='email'
          error={errors.email}
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          labelText={UI_TEXT.LABEL_PASSWORD}
          placeholderText={UI_TEXT.PLACEHOLDER_PASSWORD}
          type='password'
          error={errors.password}
        />

        <Button type='submit' buttonText={UI_TEXT.REGISTRATION_BTN} />

        {/* show API error if it exists */}
        {apiError && (
          <p className={ styles.apiError }>
            {apiError}
          </p>
        )}

        <div className={styles.footer}>
          <p>
            Already have an account?{' '}
            <Link to='/login' className={styles.footerLink}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;