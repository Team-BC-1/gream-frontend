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
import ProductLikeList from '../component/profile/ProductLikeList.jsx'
import Button from '@mui/material/Button'

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
        <Card sx={{ marginBottom: 5 }}>
          <CardContent>
            포인트 충전 및 환전 기능은 추후 추가될 예정입니다. 현재는 기본 10만 포인트가 충전되어 있습니다.
            <br/>
            판매 시 기프티콘 이미지의 검수 API는 사업자 등록이 필요하여 현재는 미구현 상태입니다.
            <br/>
            따라서 구매한 기프티콘의 이미지가 실제 기프티콘이 아닐 수 있습니다.
          </CardContent>
        </Card>
        <Card sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            {
              nickname
            }
          </CardContent>
          <Box sx={{ display: 'flex' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SavingsOutlinedIcon/>
              {
                queryUserPont.isSuccess && addCommasAtMoney(queryUserPont.data.data.data.point)
              }
            </CardContent>
            <Button onClick={() => {
              const wantPoint = prompt('충전할 포인트')
              if (wantPoint === null) {
                return
              }

            }}>
              포인트 충전
            </Button>
            <Button onClick={() => {
              const wantPoint = prompt('환전할 포인트')
              if (wantPoint === null) {
                return
              }

            }}>
              포인트 환전
            </Button>
          </Box>
        </Card>
        <BuyOnprogressHistoryList/>
        <BuyEndHistoryList/>
        <SellOnprogressHistoryList/>
        <SellEndHistoryList/>
        <ProductLikeList/>
      </Box>
    </Layout>
  )
}

function addCommasAtMoney (money) {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + 'p'
}

export default ProfilePage
