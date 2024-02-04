import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { FormHelperText } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Layout from '../component/layout/Layout.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../store/userInfo.js'

function CouponPage () {

  const navigate = useNavigate()
  const { accessToken, refreshToken, role } = useUserInfoStore()
  const [userId, setUserId] = useState('')
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState('')
  const [couponName, setCouponName] = useState('')

  useEffect(() => {
    if (role !== '관리자') {
      alert('관리자만 접근 가능합니다.')
      navigate('/')
    }
  }, [])

  const mutation = useMutation({
    mutationFn: (couponData) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/coupon`,
      couponData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }
    ),
    onSuccess: () => {
      alert('쿠폰이 발급되었습니다.')
      navigate('/')
    },
    onError: error => {
      alert(error.response.data.message)
    }
  })

  const onClick = (event) => {
    event.preventDefault()
    const couponData = {
      userLoginId: userId,
      name: couponName,
      discountType: discountType,
      discount: discount
    }
    mutation.mutate(couponData)
  }

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            쿠폰 발급
          </Typography>
          <Box component="form" onSubmit={onClick} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="발급 유저 아이디"
              name="userId"
              autoComplete="userId"
              autoFocus
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="couponName"
              label="쿠폰 이름"
              name="couponName"
              autoComplete="couponName"
              autoFocus
              value={couponName}
              onChange={(event) => setCouponName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="discountType"
              label="쿠폰 할인 타입"
              id="discountType"
              autoComplete="current-password"
              value={discountType}
              onChange={(event) => setDiscountType(event.target.value)}
            />
            <FormHelperText id="component-helper-text">
              RATE, FIX 중 하나만 가능합니다.
            </FormHelperText>
            <TextField
              margin="normal"
              required
              fullWidth
              name="discount"
              label="쿠폰 할인량"
              id="discount"
              autoComplete="current-password"
              value={discount}
              onChange={(event) => setDiscount(parseInt(event.target.value))}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              쿠폰 발급하기
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default CouponPage