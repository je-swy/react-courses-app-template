import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice';

import styles from '../Registration/Auth.module.css';

import { UI_TEXT } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { validateEmail, validatePassword } from '../../helpers/validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  // add state for API errors
  const [apiError, setApiError] = useState<string | null>(null);

  // get navigation and dispatch functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: `{"email":"${email}","password":"${password}"}`,
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (result.successful && result.result) {

        dispatch(
          login({
            name: result.user?.name || '',
            email: email,
            token: result.token,
          })
        );


        navigate('/courses');
      } else {
        // Failure: show server-side errors
        setApiError(result.errors?.join(', ') || 'Invalid email or password.');
      }
    } catch (error) {
      // Network or server connection error
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