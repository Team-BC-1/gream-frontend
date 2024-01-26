import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'
import { useNavigate } from 'react-router-dom'

function BuyBidBox ({ wantBuyPrice, onChangeWantBuyPrice, productId, tabIndex, index }) {

  const { accessToken, refreshToken } = useUserInfoStore()
  const navigate = useNavigate()

  const buyBidMutation = useMutation(({
    mutationFn: (price) => {
      if (!Number.isInteger(parseInt(price)) || parseInt(price) <= 0) {
        alert('정확한 가격을 입력해주세요.')
        throw new Error('정확한 가격을 입력해주세요.')
      }
      axios.post(
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
        })
    },
    onSuccess: () => {
      alert('구매 입찰 제출 성공!')
      navigate('/profile')
    },
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
        onClick={() => {
          const isOk = confirm('현재 테스트 환경이라, 실제 기프티콘 이미지가 오지 않습니다. 이를 이해하였고 구매 입찰을 진행하시겠습니까?')
          if (!isOk) {
            return
          }
          buyBidMutation.mutate(wantBuyPrice)
        }}
        sx={{ backgroundColor: '#EF6253' }}
      >
        구매 입찰
      </Button>
    </Box>
  )
}

export default BuyBidBox