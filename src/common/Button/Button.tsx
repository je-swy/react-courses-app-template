import './Button.css';

type ButtonProps = {
  buttonText: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const Button = ({
  buttonText,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) => {
  return (
    <button
      role="button"
      type={type}
      onClick={onClick}
      className={`button ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;