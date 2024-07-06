import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './page/Home'
import Signin from './page/auth/Signin'
import Layout from './page/Layout'
import SignUp from './page/auth/SignUp'
import NotFound from './page/NotFound'
import User from './page/User/User'
import Edit from './page/User/Edit'
import Delete from './page/User/Delete'
import Product from './page/Product/Product'
import AddProduct from './page/Product/AddProduct'
import EditProduct from './page/Product/EditProduct'
import DeleteProduct from './page/Product/DeleteProduct'
import { useAuth } from './page/auth/AuthContext'

function Router() {

  const { token } = useAuth();

  return (
    <>
      <Routes>
        <Route element={ <Layout /> }>
          <Route index element={ token ? <Home /> :<Navigate to="signin" /> } />
          <Route path='signin' element={ !token ? <Signin /> : < Navigate to="/" /> }/>
          <Route path='signup' element={ !token ? <SignUp /> : < Navigate to="/" /> }/>
          <Route path='product'>
            <Route index  element={ <Product />} />
            <Route path='addProduct' element={ token ? <AddProduct /> : <Navigate to="signin" /> } />
            <Route path='editProduct' element={ token ? <EditProduct /> : <Navigate to="signin" /> } />
            <Route path='deleteProduct' element={ token ? <DeleteProduct /> : <Navigate to="signin" />} />
          </Route>
          <Route path='user'>
            <Route index element={ <User /> } />
            <Route path='edit' element={ token ? <Edit /> : <Navigate to="signin" />} />
            <Route path='delete' element={ token ? <Delete /> : <Navigate to="signin" />} />
          </Route>
          <Route path='*' element={ < NotFound/> }/>
        </Route>
      </Routes>
    </>
  )
}

export default Router
