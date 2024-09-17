import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { ProtectedPath } from './components/ProtectedPath'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/blog/:id' element={
            <ProtectedPath>
              <Blog/>
            </ProtectedPath>
          }/>
          <Route path='/blogs' element={
            <ProtectedPath>
              <Blogs/>
            </ProtectedPath>
          }/>
          <Route path='/publish' element={
            <ProtectedPath>
              <Publish/>
            </ProtectedPath>
          }/>
          <Route path='/' element={
            localStorage.getItem('token') ? <Navigate to={'/blogs'} replace={true}/> :
            <Navigate to={'/signup'} replace={true}/>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
