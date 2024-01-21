import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../component/layout/Layout.jsx'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Tab, Tabs } from '@mui/material'
import TradeLineChart from '../component/TradeLineChart.jsx'
import { useState } from 'react'
import TradeHistoryList from '../component/product/TradeHistoryList.jsx'
import SellHistoryList from '../component/product/SellHistoryList.jsx'
import BuyHistoryList from '../component/product/BuyHistoryList.jsx'
import useUserInfoStore from '../store/userInfo.js'
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'

function ProductPage () {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [tabIndex, setTabIndex] = useState(0)
  const { accessToken, refreshToken, likes, addLike, deleteLike } = useUserInfoStore()

  const queryProduct = useQuery({
    queryKey: ['product'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`)
  })
  const queryTradeHistory = useQuery({
    queryKey: ['tradeHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/trade`)
  })
  const querySellBid = useQuery({
    queryKey: ['sellHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/sell`)
  })
  const queryBuyBid = useQuery({
    queryKey: ['buyHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/buy`)
  })

  const productLikeMutation = useMutation({
    mutationFn: () => axios.post(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/like`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => {
      addLike(parseInt(productId))
      alert('관심상품에 추가되었습니다.')
    }
  })
  const productDislikeMutation = useMutation({
    mutationFn: () => axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/dislike`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => {
      deleteLike(parseInt(productId))
      alert('관심상품에서 삭제되었습니다.')
    }
  })

  const isLiked = likes.includes(parseInt(productId))

  return (
    <Layout>
      {
        queryProduct.isSuccess && queryBuyBid.isSuccess && querySellBid.isSuccess && queryTradeHistory.isSuccess && (
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 3 }}>
              <Box
                component="img"
                src={queryProduct.data.data.data.imageUrl}
                sx={{ maxWidth: '100%' }}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <Box component={'h1'}>
                {queryProduct.data.data.data.name}
              </Box>
              <Box component={'h3'}>
                {queryProduct.data.data.data.brand}
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={() => navigate(`/buy/${productId}`, {
                      state: { product: queryProduct.data.data.data }
                    })}
                    sx={{ backgroundColor: '#EF6253' }}
                  >
                    구매
                    - {querySellBid.data.data.data.length === 0 ? '매물 없음' : querySellBid.data.data.data[0].sellPrice + '원'}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={() => navigate(`/sell/${productId}`, {
                      state: { product: queryProduct.data.data.data }
                    })}
                    sx={{ backgroundColor: '#41B979' }}
                  >
                    판매
                    - {queryBuyBid.data.data.data.length === 0 ? '매물 없음' : queryBuyBid.data.data.data[0].buyPrice + '원'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth={true}
                    sx={{ color: '#000000', borderColor: '#EBEBEB' }}
                    onClick={() => isLiked ? productDislikeMutation.mutate() : productLikeMutation.mutate()}
                  >
                    {
                      isLiked ? <TurnedInIcon/> : <TurnedInNotIcon/>
                    }
                    관심상품
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {
                    queryTradeHistory.isSuccess &&
                    <TradeLineChart
                      tradeList={queryTradeHistory.data.data.data.reverse().map(trade => trade.finalPrice)}/>
                  }
                </Grid>
                <Grid item xs={12}>

                  <Tabs
                    value={tabIndex}
                    onChange={(event, newValue) => setTabIndex(newValue)}
                  >
                    <Tab label="체결 거래"/>
                    <Tab label="판매 입찰"/>
                    <Tab label="구매 입찰"/>
                  </Tabs>

                  <TradeHistoryList
                    tabIndex={tabIndex}
                    index={0}
                    tradeHistoryList={queryTradeHistory.data.data.data.slice(0, 5)}
                  />

                  <SellHistoryList
                    tabIndex={tabIndex}
                    index={1}
                    sellHistoryList={querySellBid.data.data.data}
                  />
                  <BuyHistoryList
                    tabIndex={tabIndex}
                    index={2}
                    buyHistoryList={queryBuyBid.data.data.data}
                  />

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      }
    </Layout>
  )
}

export default ProductPage
