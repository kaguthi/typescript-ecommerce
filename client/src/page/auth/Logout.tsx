import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const useLogout = () => {
  const navigate = useNavigate();
  const { setToken, setName, setProfileImage } = useAuth();

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');

    // Clear context state
    setToken('');
    setName('');
    setProfileImage('');

    // Redirect to signin page
    navigate('/signin');
  };

  return logout;
};

export default useLogout;
