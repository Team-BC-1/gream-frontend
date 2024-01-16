import Layout from '../component/layout/Layout.jsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
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
  const [value, setValue] = useState(0)

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

  if (querySellBid.isSuccess) {
    console.log(querySellBid.data.data.data)
  }

  return (
    <Layout sx={{ display: 'flex', justifyContent: 'center' }}>
      {
        querySellBid.isSuccess && (
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
              <Box sx={{ flex: 1 }}>즉시 구매가 : 10,000원</Box>
              <Box sx={{ flex: 1 }}>즉시 판매가 : 10,000원</Box>
            </Box>
            <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
              <Tab label="구매 입찰"/>
              <Tab label="즉시 구매"/>
            </Tabs>

            <Box value={value} index={0} hidden={value !== 0} sx={{ width: '100%' }}>
              <TextField
                id="buy-want-price"
                label="구매 희망가"
                variant="standard"
                fullWidth
                value={wantBuyPrice}
                onChange
                InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
              />
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => {}}
                sx={{ backgroundColor: '#EF6253' }}
              >
                구매 입찰
              </Button>
            </Box>

            <Box value={value} index={1} hidden={value !== 1} sx={{ width: '100%' }}>
              <TextField
                id="buy-want-price"
                label="즉시 구매가"
                variant="standard"
                fullWidth
                value={100000}
                onChange
                disabled
                InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
              />
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => {}}
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

export default BuyPage