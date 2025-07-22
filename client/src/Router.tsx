import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Home = lazy(() => import ('./page/Home'))
const Otp = lazy(() => import ('./page/Otp'))
const Signin = lazy(() => import ('./page/auth/Signin'))
const Layout = lazy(() => import ('./page/Layout'))
const SignUp = lazy(() => import ('./page/auth/SignUp'))
const NotFound = lazy(() => import ('./page/NotFound'))
const User = lazy(() => import ('./Admin/User/User'))
const Edit = lazy(() => import ('./Admin/User/Edit'))
const Delete = lazy(() => import ('./Admin/User/Delete'))
const Product = lazy(() => import ('./Admin/Product/Product'))
const AddProduct = lazy(() => import ('./Admin/Product/AddProduct'))
const EditProduct = lazy(() => import ('./Admin/Product/EditProduct'))
const DeleteProduct = lazy(() => import ('./Admin/Product/DeleteProduct'))
const Profile = lazy(() => import ('./page/Profile'))
const Success = lazy(() => import ('./page/Success'))
const Order = lazy(() => import ('./page/Order/Order'))
const View = lazy(() => import ('./page/Order/View'))
const Admin = lazy(() => import ('./Admin/Admin'))
const AllOrder = lazy(() => import ('./Admin/Order/order'))
const Mpesa = lazy(() => import ('./page/Mpesa'))
const PaymentMethod = lazy(() => import ('./page/PaymentMethod'))
const ConfirmEmail = lazy(() => import ('./page/ConfirmEmail'))
const ResetPassword = lazy(() => import ('./page/ResetPassword'))
const ResetOtp = lazy(() => import ('./page/auth/Otp'))
import { PrivateRoute } from './PrivateRoute'
import { LoaderCircle } from 'lucide-react'
import  AdminRoute  from './AdminRoute'

function Router() {

  return (
    <Suspense fallback={<div className='flex items-center justify-center h-screen'><LoaderCircle className='animate-spin size-28 ' /></div>}>
      <Routes>
        <Route element={ <Layout /> }>
          <Route index element={ <PrivateRoute><Home /></PrivateRoute>} />
          <Route path='profile' element={ <PrivateRoute><Profile /></PrivateRoute> } />
          <Route path='signin' element={ <Signin />}/>
          <Route path='signup' element={ <SignUp /> }/>
          <Route path='confirm-email' element={ <ConfirmEmail/> }/>
          <Route path='reset-password' element={ <ResetPassword/> }/>
          <Route path='reset-otp' element={ <ResetOtp/> }/>
          <Route path='mpesa' element={ <PrivateRoute><Mpesa /></PrivateRoute> } />
          <Route path='paymentMethod' element={ <PrivateRoute><PaymentMethod /></PrivateRoute> } />
          <Route path='verify' element={ <PrivateRoute><Otp/></PrivateRoute>}/>
          <Route path='success' element={ <PrivateRoute><Success /></PrivateRoute> } />
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
          <Route path='allOrder'> 
            <Route index element={ <AdminRoute><AllOrder /></AdminRoute> } />
          </Route>
        </Route>
        <Route path='*' element={ < NotFound/> }/>
      </Routes>
    </Suspense>
  )
}

export default Router
