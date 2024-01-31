import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './page/MainPage.jsx'
import LoginPage from './page/LoginPage.jsx'
import SignUpPage from './page/SignUpPage.jsx'
import ProductPage from './page/ProductPage.jsx'
import ProfilePage from './page/ProfilePage.jsx'
import BuyPage from './page/BuyPage.jsx'
import SellPage from './page/SellPage.jsx'
import KakaoLoginPage from './page/KakaoLoginPage.jsx'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/products/:productId" element={<ProductPage/>}/>
        <Route path="/buy/:productId" element={<BuyPage/>}/>
        <Route path="/sell/:productId" element={<SellPage/>}/>
        <Route path="/login/kakao" element={<KakaoLoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router