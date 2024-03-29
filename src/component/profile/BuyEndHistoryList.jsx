import Box from '@mui/material/Box'
import { Card, CardActions, CardContent, List, ListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'
import modalStore from '../../store/modalStore.js'
import Button from '@mui/material/Button'

function BuyEndHistoryList () {
  const { accessToken, refreshToken } = useUserInfoStore()
  const { setGifticonImageModalState } = modalStore()

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
                  <Card sx={{ fontSize: 15, marginX: 1, width: 200 }}>
                    <CardContent>productBrand : {history.productBrand}</CardContent>
                    <CardContent>productName : {history.productName}</CardContent>
                    <CardContent>expectedPrice : {history.expectedPrice}</CardContent>
                    <CardContent>finalPrice : {history.finalPrice}</CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => setGifticonImageModalState({
                          isOpen: true,
                          imageUrl: history.gifticonUrl
                        })}>
                        기프티콘 보기
                      </Button>
                    </CardActions>
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
