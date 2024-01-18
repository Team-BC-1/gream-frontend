import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
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

function ProductPage () {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [tabIndex, setTabIndex] = useState(0)

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
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth={true}
                    sx={{ color: '#000000', borderColor: '#EBEBEB' }}>
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
