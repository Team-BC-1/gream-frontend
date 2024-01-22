import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import Button from '@mui/material/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'
import { useNavigate } from 'react-router-dom'

function SellNowBox ({ sellNowPrice, productId, tabIndex, index, isDisabled, imageFile }) {

  const { accessToken, refreshToken } = useUserInfoStore()
  const navigate = useNavigate()
  const getData = (price) => {
    const formData = new FormData()
    formData.append('price', price)
    formData.append('file', imageFile, imageFile.name)
    return formData
  }

  const sellNowMutation = useMutation(({
    mutationFn: (price) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/sell/${productId}/now`,
      getData(price),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => {
      alert('판매 성공!')
      navigate('/profile')
    },
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
        disabled={sellNowMutation.isPending || isDisabled}
        onClick={() => sellNowMutation.mutate(sellNowPrice)}
        sx={{ backgroundColor: '#41B979' }}
      >
        즉시 판매
      </Button>
    </Box>
  )
}

export default SellNowBox