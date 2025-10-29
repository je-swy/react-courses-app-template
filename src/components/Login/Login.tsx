import { useState } from 'react';

import styles from '../Registration/Auth.module.css';

import { ERROR_MESSAGES, UI_TEXT } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { validateEmail, validatePassword } from '../../helpers/validation';

interface LoginProps {
  onShowRegistration: () => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onShowRegistration, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      alert(UI_TEXT.LOGIN_SUCCESSFUL);
      onLoginSuccess();
    } else {
      console.log(ERROR_MESSAGES.VALIDATUON_ERROR);
    }
  };

  //email hanlder
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

        <Button type='submit' buttonText={UI_TEXT.LOGIN} />

        <div className={styles.footer}>
          <p>
            If you don't have an account you may{' '}
            <a
              href='#'
              className={styles.footerLink}
              onClick={(e) => {
                e.preventDefault();
                onShowRegistration();
              }}
            >
              Registration
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;