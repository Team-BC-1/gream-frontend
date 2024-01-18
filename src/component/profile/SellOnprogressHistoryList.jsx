import Box from '@mui/material/Box'
import { Card, CardContent, List, ListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function SellOnprogressHistoryList () {
  const { accessToken, refreshToken } = useUserInfoStore()

  const queryUserSellOnprogressHistory = useQuery({
    queryKey: ['userSellOnprogressHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/sell/history/onprogress`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      })
  })

  return (
    <>
      <Box component={'h2'}>진행중인 판매 입찰</Box>
      <List sx={{ marginBottom: 10, display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
        {
          queryUserSellOnprogressHistory.isSuccess && (
            queryUserSellOnprogressHistory.data.data.data.map(history =>
              (
                <ListItem key={history.orderId}>
                  <Card sx={{ fontSize: 15, marginX: 1 }}>
                    <CardContent>productBrand : {history.productBrand}</CardContent>
                    <CardContent>productName : {history.productName}</CardContent>
                    <CardContent>sellPrice : {history.sellPrice}</CardContent>
                    <CardContent>bidDeadlineAt : {history.bidDeadlineAt}</CardContent>
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

export default SellOnprogressHistoryList
