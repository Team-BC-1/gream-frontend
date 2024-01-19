import Layout from '../component/layout/Layout.jsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Card, CardContent, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import useUserInfoStore from '../store/userInfo.js'
import Typography from '@mui/material/Typography'
import BuyBidBox from '../component/order/BuyBidBox.jsx'
import BuyNowBox from '../component/order/BuyNowBox.jsx'

function BuyPage () {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { nickname } = useUserInfoStore()
  const [wantBuyPrice, setWantBuyPrice] = useState()
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    if (state === null) {
      navigate(`/products/${productId}`)
    }
  }, [])
  useEffect(() => {
    if (nickname === '') {
      alert('로그인 후 접근 가능합니다.')
      navigate('/login')
    }
  }, [])

  const querySellBid = useQuery({
    queryKey: ['sellHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/sell`)
  })
  const queryBuyBid = useQuery({
    queryKey: ['buyHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/buy`)
  })
  return (
    <Layout sx={{ display: 'flex', justifyContent: 'center' }}>
      {
        querySellBid.isSuccess && queryBuyBid.isSuccess && (
          <Box component={'div'} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: 500
          }}
          >
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {nickname}
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ flex: 1 }}>즉시 구매가 : {
                queryBuyBid.data.data.data.length === 0 ? '매물이 없습니다.' : addCommasAtMoney(queryBuyBid.data.data.data[0].buyPrice)
              }
              </Box>
              <Box sx={{ flex: 1 }}>즉시 판매가 : {
                querySellBid.data.data.data.length === 0 ? '매물이 없습니다.' : addCommasAtMoney(querySellBid.data.data.data[0].sellPrice)
              }
              </Box>
            </Box>
            <Tabs
              value={tabIndex}
              onChange={(event, newValue) => setTabIndex(newValue)}
            >
              <Tab label="구매 입찰"/>
              <Tab label="즉시 구매"/>
            </Tabs>

            <BuyBidBox
              tabIndex={tabIndex}
              index={0}
              productId={productId}
              wantBuyPrice={wantBuyPrice}
              onChangeWantBuyPrice={(event) => setWantBuyPrice(event.target.value)}
            />

            <BuyNowBox
              tabIndex={tabIndex}
              index={1}
              disabled={querySellBid.data.data.data.length === 0}
              productId={productId}
              buyNowPrice={querySellBid.data.data.data[0].sellPrice}
            />

          </Box>
        )
      }
    </Layout>
  )
}

function addCommasAtMoney (money) {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'
}

export default BuyPage