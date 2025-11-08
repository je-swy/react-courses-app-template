import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';

import './Header.css';

// Props that Header expects from App
interface HeaderProps {
  isLoggedIn: boolean; // indicates if the user is logged in
  onLogout: () => void; // function to update app state on logout
  user: string; // username (can be empty)
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout, user }) => {
  const navigate = useNavigate(); // react-router function for navigation
  const location = useLocation(); // current URL location

  // Function called when user clicks "Logout"
  const handleLogout = () => {
    localStorage.removeItem('token'); // remove token from localStorage
    localStorage.removeItem('user'); // remove username from localStorage
    onLogout(); // update parent state
    navigate('/login'); // redirect to login page
  };

  const currentPath = location.pathname;
  const hideOnPaths = ['/login', '/registration']; // pages where auth controls should be hidden
  const showAuthControls = !hideOnPaths.includes(currentPath);

  return (
    <header className="header">
      <Logo />

      <article className="user-info">
        {showAuthControls && (
          <>
            {isLoggedIn ? (
              <>
                {/* Show username only if it exists */}
                {user && <span data-testid="username">{user}</span>}

                {/* Logout button */}
                <Button
                  buttonText={BUTTON_TEXT.LOGOUT}
                  onClick={handleLogout}
                  data-testid="logout-button" // for tests to find the logout button
                />
              </>
            ) : (
              // Login link when not logged in
              <Link
                to="/login"
                className="button"
                data-testid="login-link" // for tests to find login
              >
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
