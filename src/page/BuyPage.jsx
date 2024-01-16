import Layout from '../component/layout/Layout.jsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ButtonGroup, Card, CardContent, Divider } from '@mui/material'
import { useEffect } from 'react'
import useUserInfoStore from '../store/userInfo.js'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function BuyPage () {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { nickname } = useUserInfoStore()

  useEffect(() => {
    if (state === null) {
      navigate(`/products/${productId}`)
    }
  }, [])
  useEffect(() => {
    if (nickname === '') {
      alert('로그인 후 접근 가능합니다.')
      navigate('/login')
    }
  }, [])

  const querySellBid = useQuery({
    queryKey: ['sellHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/sell`)
  })

  if (querySellBid.isSuccess) {
    console.log(querySellBid.data.data.data)
  }

  return (
    <Layout>
      {
        querySellBid.isSuccess && (
          <Box component={'div'} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {nickname}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )
      }
    </Layout>
  )
}

export default BuyPage