import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styles from '../Registration/Auth.module.css';

import { UI_TEXT } from '../../constants';

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

    if (!validateForm()) return;

    try {
      const response = await fetch('https://696020a1e7aa517cb7956472.mockapi.io/users');
      const users = await response.json();

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        localStorage.setItem('token', 'fake-jwt-token-for-portfolio');
        localStorage.setItem('user', foundUser.name || foundUser.email);
        
        onLoginSuccess();
        navigate('/courses');
      } else {
        setApiError('Invalid email or password.');
      }
    } catch (error) {
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