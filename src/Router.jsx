import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './page/MainPage.jsx'
import LoginPage from './page/LoginPage.jsx'
import SignUpPage from './page/SignUpPage.jsx'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router