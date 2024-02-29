import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function ProtectedRoute({children, redirectTo = '/login', isAuthenticated}){
  const navigate = useNavigate();
  if(!isAuthenticated){
    navigate(redirectTo)
  }

  return children;
}

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    if(localStorage.getItem('')){
      setToken(localStorage.getItem('token'))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element = {
          <ProtectedRoute isAuthenticated={token ? true : false}>
            <Home></Home>
          </ProtectedRoute>
        }></Route>
        <Route path='/register' element = {<Register></Register>}></Route>
        <Route path='/login' element = {<Login></Login>}></Route>
      </Routes>
    </>
  )
}

export default App
