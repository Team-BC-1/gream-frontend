import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../component/layout/Layout.jsx'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import TradeLineChart from '../component/TradeLineChart.jsx'
import TradeHistoryView from '../component/TradeHistoryView.jsx'

function ProductPage () {
  const { productId } = useParams()
  const navigate = useNavigate()

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

  if (queryProduct.isSuccess) {
    console.log('product', queryProduct.data.data.data)
  }

  if (queryTradeHistory.isSuccess) {
    console.log('trade', queryTradeHistory.data.data.data.sort((e1, e2) => (e2.tradeDate - e1.tradeDate)))
  }

  if (querySellBid.isSuccess) {
    console.log('sell', querySellBid.data.data.data)
  }

  if (queryBuyBid.isSuccess) {
    console.log('buy', queryBuyBid.data.data.data)
  }

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
                  <ButtonGroup fullWidth={true}>
                    <Button>체결 거래</Button>
                    <Button>판매 입찰</Button>
                    <Button>구매 입찰</Button>
                  </ButtonGroup>
                  <Table size={'small'}>
                    <TableHead>
                      <TableRow>
                        <TableCell>거래가</TableCell>
                        <TableCell align={'right'}>거래일자</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        queryTradeHistory.isSuccess &&
                        <TradeHistoryView tradeHistoryList={queryTradeHistory.data.data.data}/>
                      }
                    </TableBody>
                  </Table>
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
