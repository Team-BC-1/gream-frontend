import Layout from '../component/layout/Layout.jsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Card, CardContent, InputAdornment, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import useUserInfoStore from '../store/userInfo.js'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function BuyPage () {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { nickname } = useUserInfoStore()
  const [wantBuyPrice, setWantBuyPrice] = useState()
  const [tabIndex, setTabIndex] = useState(0)
  const { accessToken, refreshToken } = useUserInfoStore()

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

  if (querySellBid.isSuccess) {
    console.log('판매 입찰 내역 : ', querySellBid.data.data.data)
  }
  if (queryBuyBid.isSuccess) {
    console.log('구매 입찰 내역 : ', queryBuyBid.data.data.data)
  }

  const buyBidMutation = useMutation(({
    mutationFn: (price) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/buy/${productId}`,
      {
        price: price
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => alert('성공!'),
    onError: error => alert(error.response.data.message)
  }))

  const buyNowMutation = useMutation(({
    mutationFn: (price) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/buy/${productId}/now`,
      {
        price: price
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => alert('성공!'),
    onError: error => alert(error.response.data.message)
  }))

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
              <Box sx={{ flex: 1 }}>즉시 구매가 : {addCommasAtMoney(querySellBid.data.data.data[0].sellPrice)}</Box>
              <Box sx={{ flex: 1 }}>즉시 판매가 :{addCommasAtMoney(queryBuyBid.data.data.data[0].buyPrice)}</Box>
            </Box>
            <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
              <Tab label="구매 입찰"/>
              <Tab label="즉시 구매"/>
            </Tabs>

            <Box value={tabIndex} index={0} hidden={tabIndex !== 0} sx={{ width: '100%' }}>
              <TextField
                id="buy-want-price"
                label="구매 희망가"
                variant="standard"
                fullWidth
                value={wantBuyPrice}
                onChange={(event) => setWantBuyPrice(event.target.value)}
                InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
              />
              <Button
                variant="contained"
                fullWidth={true}
                disabled={buyBidMutation.isPending}
                onClick={() => {
                  console.log(wantBuyPrice)
                  buyBidMutation.mutate(wantBuyPrice)
                }}
                sx={{ backgroundColor: '#EF6253' }}
              >
                구매 입찰
              </Button>
            </Box>

            <Box value={tabIndex} index={1} hidden={tabIndex !== 1} sx={{ width: '100%' }}>
              <TextField
                id="buy-want-price"
                label="즉시 구매가"
                variant="standard"
                fullWidth
                value={querySellBid.data.data.data[0].sellPrice}
                disabled
                InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
              />
              <Button
                variant="contained"
                fullWidth={true}
                disabled={buyNowMutation.isPending}
                onClick={() => buyNowMutation.mutate(querySellBid.data.data.data[0].sellPrice)}
                sx={{ backgroundColor: '#EF6253' }}
              >
                즉시 구매
              </Button>
            </Box>
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