import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function BuyNowBox ({ buyNowPrice, productId, tabIndex, index }) {

  const { accessToken, refreshToken } = useUserInfoStore()

  const buyNowMutation = useMutation(({
    mutationFn: (price) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/buy/${productId}/now`,
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
        label="즉시 구매가"
        variant="standard"
        fullWidth
        value={buyNowPrice}
        disabled
        InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
      />
      <Button
        variant="contained"
        fullWidth={true}
        disabled={buyNowMutation.isPending}
        onClick={() => buyNowMutation.mutate(buyNowPrice)}
        sx={{ backgroundColor: '#EF6253' }}
      >
        즉시 구매
      </Button>
    </Box>
  )
}

export default BuyNowBox