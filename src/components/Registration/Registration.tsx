import { useState } from 'react';

import styles from './Auth.module.css';

import { UI_TEXT, ERROR_MESSAGES } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { validateEmail, validatePassword } from '../../helpers/validation';

interface RegistrationProps {
  onShowLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const validateForm = (): boolean => {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      alert(UI_TEXT.REGISTRATION_SUCCESSFUL);
    } else {
      console.log(ERROR_MESSAGES.VALIDATUON_ERROR);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>{UI_TEXT.REGISTRATION}</h2>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Input
          value={name}
          onChange={setName}
          labelText={UI_TEXT.LABEL_NAME}
          placeholderText={UI_TEXT.PLACEHOLDER_NAME}
          error={errors.name}
        />
        <Input
          value={email}
          onChange={setEmail}
          labelText={UI_TEXT.LABEL_EMAIL}
          placeholderText={UI_TEXT.PLACEHOLDER_EMAIL}
          type='email'
          error={errors.email}
        />
        <Input
          value={password}
          onChange={setPassword}
          labelText={UI_TEXT.LABEL_PASSWORD}
          placeholderText={UI_TEXT.PLACEHOLDER_PASSWORD}
          type='password'
          error={errors.password}
        />

        <Button type='submit' buttonText={UI_TEXT.REGISTRATION} />

        <div className={styles.footer}>
          <p>
            Already have an account?{' '}
            <a
              href='#'
              className={styles.footerLink} 
              onClick={(e) => {
                e.preventDefault();
                onShowLogin();
              }}
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;