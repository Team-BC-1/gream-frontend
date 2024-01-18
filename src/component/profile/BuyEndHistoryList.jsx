import Box from '@mui/material/Box'
import { Card, CardContent, List, ListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function BuyEndHistoryList () {
  const { accessToken, refreshToken } = useUserInfoStore()

  const queryUserBuyEndHistory = useQuery({
    queryKey: ['userBuyEndHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/buy/history/end`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      })
  })

  return (
    <>
      <Box component={'h2'}>구매 완료</Box>
      <List sx={{ marginBottom: 10, display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
        {
          queryUserBuyEndHistory.isSuccess && (
            queryUserBuyEndHistory.data.data.data.map(history =>
              (
                <ListItem key={history.orderId}>
                  <Card sx={{ fontSize: 15, marginX: 1 }}>
                    <CardContent>productBrand : {history.productBrand}</CardContent>
                    <CardContent>productName : {history.productName}</CardContent>
                    <CardContent>expectedPrice : {history.expectedPrice}</CardContent>
                    <CardContent>finalPrice : {history.finalPrice}</CardContent>
                  </Card>
                </ListItem>
              )
            )
          )
        }
      </List>
    </>
  )
}

export default BuyEndHistoryList
