import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Home = lazy(() => import ('./page/Home'))
import Signin from './page/auth/Signin'
import Layout from './page/Layout'
import SignUp from './page/auth/SignUp'
import NotFound from './page/NotFound'
import User from './Admin/User/User'
import Edit from './Admin/User/Edit'
import Delete from './Admin/User/Delete'
import Product from './Admin/Product/Product'
import AddProduct from './Admin/Product/AddProduct'
import EditProduct from './Admin/Product/EditProduct'
import DeleteProduct from './Admin/Product/DeleteProduct'
import Profile from './page/Profile'
import Checkout from './page/Checkout'
import Success from './page/Success'
import Order from './page/Order/Order'
import View from './page/Order/View'
import Admin from './Admin/Admin'
import AllOrder from './Admin/Order/order'
import { PrivateRoute } from './PrivateRoute'
import AdminRoute from './AdminRoute'
import Otp from './page/Otp'

function Router() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={ <Layout /> }>
          <Route index element={ <PrivateRoute><Home /></PrivateRoute>} />
          <Route path='profile' element={ <PrivateRoute><Profile /></PrivateRoute> } />
          <Route path='signin' element={ <Signin />}/>
          <Route path='signup' element={ <SignUp /> }/>
          <Route path='checkout' element={ <PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path='verify' element={ <PrivateRoute><Otp/></PrivateRoute>}/>
          <Route path='success' element={ <Success /> } />
          <Route path='order' >
            <Route index element={ <PrivateRoute><Order /></PrivateRoute> } />
            <Route path='view' element={ <PrivateRoute><View/></PrivateRoute> }/>
          </Route> 
          <Route path='product'>
            <Route index  element={ <AdminRoute><Product /></AdminRoute>} />
            <Route path='addProduct' element={ <AdminRoute><AddProduct /></AdminRoute> } />
            <Route path='editProduct' element={ <AdminRoute><EditProduct /></AdminRoute> } />
            <Route path='deleteProduct' element={ <AdminRoute><DeleteProduct /></AdminRoute>} />
          </Route>
          <Route path='user'>
            <Route index element={ <AdminRoute><User /></AdminRoute> } />
            <Route path='edit' element={ <AdminRoute><Edit /></AdminRoute>} />
            <Route path='delete' element={ <AdminRoute><Delete /></AdminRoute>} />
          </Route>
          <Route path='admin'>
            <Route index  element={ <AdminRoute><Admin/></AdminRoute>}/>
          </Route> 
          <Route path='allOrder' element={ <AdminRoute><AllOrder /></AdminRoute>} />
        </Route>
        <Route path='*' element={ < NotFound/> }/>
      </Routes>
    </Suspense>
  )
}

export default Router
