import Box from '@mui/material/Box'
import { Card, CardContent, List, ListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function SellEndHistoryList () {
  const { accessToken, refreshToken } = useUserInfoStore()

  const queryUserSellEndHistory = useQuery({
    queryKey: ['userSellEndHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/sell/history/end`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      })
  })

  return (
    <>
      <Box component={'h2'}>판매 완료</Box>
      <List sx={{ marginBottom: 10, display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
        {
          queryUserSellEndHistory.isSuccess && (
            queryUserSellEndHistory.data.data.data.map(history =>
              (
                <ListItem key={history.orderId}>
                  <Card sx={{ fontSize: 15, marginX: 1 }}>
                    <CardContent>brand : {history.brand}</CardContent>
                    <CardContent>name : {history.name}</CardContent>
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

export default SellEndHistoryList
