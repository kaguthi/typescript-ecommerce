import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCartContext } from '@/context/cartContext';

const useLogout = () => {
  const navigate = useNavigate();
  const { setToken, setName, setProfileImage, setUserId, setRole } = useAuth();
  const { setNumberOfProducts, setCartProducts } = useCartContext();

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('cartProducts');
    localStorage.removeItem('numberofProducts')

    setToken('');
    setName('');
    setRole('');
    setProfileImage('');
    setNumberOfProducts('0');
    setCartProducts([]);
    setUserId('')

    navigate('/signin');
  };

  return logout;
};

export default useLogout;
