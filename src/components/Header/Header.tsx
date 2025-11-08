import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';

import './Header.css';

// describe the props that Header expects to receive from App
interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  user: string;
}

// define Header as a React Functional Component, which takes these props 
const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout, user }) => {
  // get navigate function and location object from react-router
  const navigate = useNavigate();
  const location = useLocation();

  // function to handle logout button click
  const handleLogout = () => {
    localStorage.removeItem('token'); // remove token from localStorage
    localStorage.removeItem('user'); // remove user from localStorage
    onLogout(); // call onLogout prop to update app state
    navigate('/login'); // navigate to login page after logout
  }

  // get the current path for potential use 
  const currentPath = location.pathname;
  // paths where auth controls should be hidden
  const hideOnPaths = ['/login', '/registration'];
  // determine if auth controls should be shown based on current path
  const showAuthControls = !hideOnPaths.includes(currentPath);

  return (
    <header className='header'>
      <Logo />
      <article className='user-info'>
        {/* check if we are on a page where controls should be shown 
            (not /login and not /registration) */}
        {showAuthControls && (
          <>
            {/* if we are logged in (isLoggedIn is true) */}
            {isLoggedIn ? (
              <>
                <span>{user}</span>
                <Button
                  buttonText={BUTTON_TEXT.LOGOUT}
                  onClick={handleLogout} // Додаємо обробник
                />
              </>
            ) : (
              // if we are not logged in: show a Link to /login
              <Link to="/login" className="button">
                {BUTTON_TEXT.LOGIN}
              </Link>
            )}
          </>
        )}
      </article>
    </header>
  );
};

export default Header;