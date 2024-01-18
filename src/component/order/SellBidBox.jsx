import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function SellBidBox ({ wantSellPrice, onChangeWantSellPrice, productId, tabIndex, index }) {

  const { accessToken, refreshToken } = useUserInfoStore()

  const sellBidMutation = useMutation(({
    mutationFn: (price) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/sell/${productId}`,
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
        label="판매 희망가"
        variant="standard"
        fullWidth
        value={wantSellPrice}
        onChange={onChangeWantSellPrice}
        InputProps={{ endAdornment: <InputAdornment position="end">원</InputAdornment> }}
      />
      <Button
        variant="contained"
        fullWidth={true}
        disabled={sellBidMutation.isPending}
        onClick={() => sellBidMutation.mutate(wantSellPrice)}
        sx={{ backgroundColor: '#EF6253' }}
      >
        판매 입찰
      </Button>
    </Box>
  )
}

export default SellBidBox