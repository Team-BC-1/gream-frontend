import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function BuyBidBox ({ wantBuyPrice, onChangeWantBuyPrice, productId, tabIndex, index }) {

  const { accessToken, refreshToken } = useUserInfoStore()

  const buyBidMutation = useMutation(({
    mutationFn: (price) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/buy/${productId}`,
      {
        price: price
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => alert('성공!'),
    onError: error => alert(error.response.data.message)
  }))

  return (
    <Box hidden={tabIndex !== index} sx={{ width: '100%' }}>
      <TextField
        id="buy-want-price"
        label="구매 희망가"
        variant="standard"
        fullWidth
        value={wantBuyPrice}
        onChange={onChangeWantBuyPrice}
        InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
      />
      <Button
        variant="contained"
        fullWidth={true}
        disabled={buyBidMutation.isPending}
        onClick={() => buyBidMutation.mutate(wantBuyPrice)}
        sx={{ backgroundColor: '#EF6253' }}
      >
        구매 입찰
      </Button>
    </Box>
  )
}

export default BuyBidBox