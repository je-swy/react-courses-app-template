import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styles from '../Registration/Auth.module.css';

import { ERROR_MESSAGES, UI_TEXT } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { validateEmail, validatePassword } from '../../helpers/validation';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  // add state for API errors
  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    // reset API error on new validation
    setApiError(null);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // run client-side validation first
    if (!validateForm()) {
      console.log(ERROR_MESSAGES.VALIDATUON_ERROR);
      return; // Stop if client validation fails
    }

    // prepare data for the API request
    const userCredentials = {
      password,
      email,
    };

    // send request to the server
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      // analyze the response
      if (result.successful && result.result) {
        // save the token to localStorage
        localStorage.setItem('token', result.result);
        
        if (result.user && result.user.name) {
          localStorage.setItem('user', result.user.name);
        }
        onLoginSuccess();
        
        // redirect user to the Courses page
        navigate('/courses');
      } else {
        // Show server-side errors
        if (result.errors && Array.isArray(result.errors)) {
          setApiError(result.errors.join(', '));
        } else {
          setApiError('Invalid email or password.'); // generic error message
        }
      }
    } catch (error) {
      // here is the catch block for network or other errors
      console.error('Login error:', error);
      setApiError('Failed to connect to the server.');
    }
  };

  //email handler
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  // password handler
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>{UI_TEXT.LOGIN}</h2>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
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

        {/* show API error if it exists */}
        {apiError && (
          <p className={styles.apiError}>
            {apiError}
          </p>
        )}

        <Button type='submit' buttonText={UI_TEXT.LOGIN} />

        {/* replace <a> tag with <Link> component */}
        <div className={styles.footer}>
          <p>
            If you don't have an account you may{' '}
            <Link to='/registration' className={styles.footerLink}>
              Registration
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;