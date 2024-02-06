import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './page/MainPage.jsx'
import LoginPage from './page/LoginPage.jsx'
import SignUpPage from './page/SignUpPage.jsx'
import ProductPage from './page/ProductPage.jsx'
import ProfilePage from './page/ProfilePage.jsx'
import BuyPage from './page/BuyPage.jsx'
import SellPage from './page/SellPage.jsx'
import { CheckoutPage } from './page/CheckoutPage.jsx'
import { PaymentProcessPage } from './page/PaymentProcessPage.jsx'
import KakaoLoginPage from './page/KakaoLoginPage.jsx'
import CouponPage from './page/CouponPage.jsx'
import ProductAddPage from './page/ProductAddPage.jsx'
import RefundPage from './page/RefundPage.jsx'

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
        <Route path="/coupon" element={<CouponPage/>}/>
        <Route path="/product-add" element={<ProductAddPage/>}/>
        <Route path="/refund" element={<RefundPage/>}/>
        <Route path="/pay" element={<CheckoutPage/>}/>
        <Route path="/success" element={<PaymentProcessPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router