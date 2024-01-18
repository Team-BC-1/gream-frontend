import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function SellNowBox ({ sellNowPrice, productId, tabIndex, index }) {

  const { accessToken, refreshToken } = useUserInfoStore()

  const sellNowMutation = useMutation(({
    mutationFn: (price) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/sell/${productId}/now`,
      {
        price: price,
        gifticonUrl: 'https://cataas.com/cat'
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
        id="sell-want-price"
        label="즉시 판매가"
        variant="standard"
        fullWidth
        value={sellNowPrice}
        disabled
        InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
      />
      <Button
        variant="contained"
        fullWidth={true}
        disabled={sellNowMutation.isPending}
        onClick={() => sellNowMutation.mutate(sellNowPrice)}
        sx={{ backgroundColor: '#EF6253' }}
      >
        즉시 판매
      </Button>
    </Box>
  )
}

export default SellNowBox