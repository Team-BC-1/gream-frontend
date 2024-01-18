import Layout from '../component/layout/Layout.jsx'
import { useNavigate } from 'react-router-dom'
import useUserInfoStore from '../store/userInfo.js'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent } from '@mui/material'
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import SellOnprogressHistoryList from '../component/profile/SellOnprogressHistoryList.jsx'
import SellEndHistoryList from '../component/profile/SellEndHistoryList.jsx'
import BuyEndHistoryList from '../component/profile/BuyEndHistoryList.jsx'
import BuyOnprogressHistoryList from '../component/profile/BuyOnprogressHistoryList.jsx'

function ProfilePage () {

  const navigate = useNavigate()
  const { loginId, nickname, accessToken, refreshToken } = useUserInfoStore()

  useEffect(() => {
    if (loginId === '') {
      alert('로그인 후 접근 가능합니다.')
      navigate('/login')
    }
  }, [loginId])

  const queryUserPont = useQuery({
    queryKey: ['userPoint'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/points`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }
    )
  })

  return (
    <Layout>
      <Box maxWidth={900}>
        <Box component={'h1'}>마이 페이지</Box>
        <Card sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            {
              nickname
            }
          </CardContent>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SavingsOutlinedIcon/>
            {
              queryUserPont.isSuccess && addCommasAtMoney(queryUserPont.data.data.data.point)
            }
          </CardContent>
        </Card>
        <BuyOnprogressHistoryList/>
        <BuyEndHistoryList/>
        <SellOnprogressHistoryList/>
        <SellEndHistoryList/>
      </Box>
    </Layout>
  )
}

function addCommasAtMoney (money) {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + 'p'
}

export default ProfilePage
