import Box from '@mui/material/Box'
import { Card, CardContent, List, ListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../store/userInfo.js'

function BuyOnprogressHistoryList () {
  const { accessToken, refreshToken } = useUserInfoStore()

  const queryUserBuyOnprogressHistory = useQuery({
    queryKey: ['userBuyOnprogressHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/buy/history/onprogress`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      })
  })

  if (queryUserBuyOnprogressHistory.isSuccess) {
    console.log('queryUserBuyOnprogressHistory', queryUserBuyOnprogressHistory.data.data.data)
  }

  return (
    <>
      <Box component={'h2'}>진행중인 판매 입찰</Box>
      <List sx={{ marginBottom: 10, display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
        {
          queryUserBuyOnprogressHistory.isSuccess && (
            queryUserBuyOnprogressHistory.data.data.data.map(history =>
              (
                <ListItem key={history.orderId}>
                  <Card sx={{ fontSize: 15, marginX: 1 }}>
                    <CardContent>productBrand : {history.productBrand}</CardContent>
                    <CardContent>productName : {history.productName}</CardContent>
                    <CardContent>discountPrice : {history.discountPrice}</CardContent>
                    <CardContent>price : {history.price}</CardContent>
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

export default BuyOnprogressHistoryList
