import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Signin from './page/auth/Signin'
import Layout from './page/Layout'
import SignUp from './page/auth/SignUp'
import NotFound from './page/NotFound'
import Student from './page/User/Student'
import Edit from './page/User/Edit'
import Delete from './page/User/Delete'
import Product from './page/Product/Product'
import AddProduct from './page/Product/AddProduct'
import EditProduct from './page/Product/EditProduct'
import DeleteProduct from './page/Product/DeleteProduct'

function Router() {

  return (
    <>
      <Routes>
        <Route element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path='signin' element={ <Signin /> } />
          <Route path='signup' element={ <SignUp />}/>
          <Route path='product'>
            <Route index  element={ <Product /> } />
            <Route path='addProduct' element={ <AddProduct />} />
            <Route path='editProduct' element={ <EditProduct />} />
            <Route path='deleteProduct' element={ <DeleteProduct />} />
          </Route>
          <Route path='student'>
            <Route index element={ <Student />} />
            <Route path='edit' element={ <Edit />} />
            <Route path='delete' element={ <Delete />} />
          </Route>
          <Route path='*' element={ < NotFound/> }/>
        </Route>
      </Routes>
    </>
  )
}

export default Router
