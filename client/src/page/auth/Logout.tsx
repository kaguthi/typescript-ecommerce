import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCartContext } from '@/context/cartContext';

const useLogout = () => {
  const navigate = useNavigate();
  const { setToken, setName, setProfileImage, setUserId } = useAuth();
  const { setNumberOfProducts, setCartProducts } = useCartContext();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('cartProducts');
    localStorage.removeItem('userId')
    localStorage.removeItem('numberOfProducts')

    setToken('');
    setName('');
    setProfileImage('');
    setNumberOfProducts('0');
    setCartProducts([]);
    setUserId('')

    navigate('/signin');
  };

  return logout;
};

export default useLogout;
