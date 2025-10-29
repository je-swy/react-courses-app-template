import { useId } from 'react';
import styles from './Input.module.css';
import { ERROR_MESSAGES } from '../../constants';

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
  labelText: string;
  placeholderText?: string;
  type?: string;
  className?: string; // for external container styling
  error?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  labelText,
  placeholderText = '',
  type = 'text',
  className = '', // this class will be applied to the outer container
  error,
}) => {
  const inputId = useId();

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <label htmlFor={inputId} className={styles.inputLabel}>
        {labelText}
      </label>
      <input
        type={type}
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderText}
        className={`${styles.inputField} ${error ? styles.inputError : ''}`}
      />
      {error && (
        <p className={styles.inputErrorMessage}>
          {error === ERROR_MESSAGES.REQUIRED
            ? `${labelText} ${ERROR_MESSAGES.IS_REQUIRED}`
            : error}
        </p>
      )}
    </div>
  );
};

export default Input;