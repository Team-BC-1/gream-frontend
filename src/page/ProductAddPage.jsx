import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Layout from '../component/layout/Layout.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../store/userInfo.js'

function ProductAddPage () {

  const navigate = useNavigate()
  const { accessToken, refreshToken, role } = useUserInfoStore()
  const [brand, setBrand] = useState('')
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState()
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (role !== '관리자') {
      alert('관리자만 접근 가능합니다.')
      navigate('/')
    }
  }, [])

  const mutation = useMutation({
    mutationFn: (couponData) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/products`,
      couponData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }
    ),
    onSuccess: () => {
      alert('상품이 등록되었습니다.')
      navigate('/')
    },
    onError: error => {
      alert(error.response.data.message)
    }
  })

  const onClick = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('brand', brand)
    formData.append('name', productName)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('file', imageFile, imageFile.name)
    mutation.mutate(formData)
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
            상품 등록
          </Typography>
          <Box component="form" onSubmit={onClick} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="productName"
              label="상품 이름"
              name="productName"
              autoComplete="productName"
              autoFocus
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="brand"
              label="브랜드"
              name="brand"
              autoComplete="brand"
              autoFocus
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="가격"
              id="price"
              autoComplete="price"
              value={price}
              onChange={(event) => setPrice(parseInt(event.target.value))}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="설명"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <Button
              variant="contained"
              component="label"
              sx={{ marginY: 2 }}
            >
              기프티콘 이미지 업로드
              <input
                type="file"
                hidden
                onClick={() => {
                  alert('현재는 테스트 환경이고, 기프티콘 검수 API는 사업자 등록이 필요하여 미구현 상태입니다. 따라서 실제 기프티콘 이미지를 넣지 말아 주세요.')
                }}
                onChange={(event) => {
                  event.preventDefault()
                  setImageFile(event.target.files[0])
                }}
              />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              상품 등록하기
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default ProductAddPage