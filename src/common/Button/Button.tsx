import './Button.css';

interface ButtonProps {
  buttonText: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;