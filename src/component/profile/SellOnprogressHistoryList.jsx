import Box from '@mui/material/Box'
import { Card, CardActions, CardContent, List, ListItem } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'
import Button from '@mui/material/Button'

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

  const mutationCancelSell = useMutation(({
    mutationFn: (sellId) => axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/sell/bid/${sellId}`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => {
      alert('판매 입찰 취소 성공!')
      queryUserSellOnprogressHistory.refetch()
    },
    onError: error => alert(error.response.data.message)
  }))

  return (
    <>
      <Box component={'h2'}>진행중인 판매 입찰</Box>
      <List sx={{ marginBottom: 10, display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
        {
          queryUserSellOnprogressHistory.isSuccess && (
            queryUserSellOnprogressHistory.data.data.data.map(history =>
              (
                <ListItem key={history.sellId}>
                  <Card sx={{ fontSize: 15, marginX: 1, width: 200 }}>
                    <CardContent>productBrand : {history.productBrand}</CardContent>
                    <CardContent>productName : {history.productName}</CardContent>
                    <CardContent>sellPrice : {history.sellPrice}</CardContent>
                    <CardContent>bidDeadlineAt : {history.bidDeadlineAt}</CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        disabled={mutationCancelSell.isPending}
                        onClick={() => mutationCancelSell.mutate(history.sellId)}
                        sx={{ backgroundColor: '#EF6253' }}
                      >
                        입찰 취소
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

export default SellOnprogressHistoryList
