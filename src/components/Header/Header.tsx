import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT, UI_TEXT } from '../../constants';

import './Header.css';

// describe the props that Header expects to receive from App
interface HeaderProps {
  isLoggedIn: boolean;
}

// define Header as a React Functional Component, which takes these props 
const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className='header'>
      <Logo />
      <article className='user-info'>
        {/*if isLoggedIn is true, show user name and Logout button; else show Login button */}
        {isLoggedIn ? (
          <>
            <span>{UI_TEXT.USER_NAME}</span>
            <Button buttonText={BUTTON_TEXT.LOGOUT} />
          </>
        ) : (
          <Button buttonText={BUTTON_TEXT.LOGIN} />
        )}
      </article>
    </header>
  );
};

export default Header;