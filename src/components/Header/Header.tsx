import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, getIsAuth, getUserName } from '../../store/user/userSlice';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import { BUTTON_TEXT } from '../../constants';

import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsAuth);
  const userName = useSelector(getUserName);

  const handleLogout = () => {
    dispatch(logout()); 
    
    navigate('/login'); 
  };

  const currentPath = location.pathname;
  const hideOnPaths = ['/login', '/registration'];
  const showAuthControls = !hideOnPaths.includes(currentPath);

  return (
    <header className="header">
      <Logo />

      <article className="user-info">
        {showAuthControls && (
          <>
            {isLoggedIn ? (
              <>
                {userName ? (
                  <span data-testid="username">{userName}</span>
                ) : (
                  <span data-testid="username"></span>
                )}

                <Button
                  buttonText={BUTTON_TEXT.LOGOUT}
                  onClick={handleLogout}
                  data-testid="logout-button"
                />
              </>
            ) : (
              // Login link when not logged in
              <Link
                to="/login"
                className="button"
                data-testid="login-link"
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