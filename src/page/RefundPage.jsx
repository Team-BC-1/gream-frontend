import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import useUserInfoStore from '../store/userInfo.js'
import { Card, CardActions, CardContent, ListItem } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Layout from '../component/layout/Layout.jsx'
import { useEffect } from 'react'

function RefundPage () {
  const { accessToken, refreshToken, role } = useUserInfoStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== '관리자') {
      alert('관리자만 접근 가능합니다.')
      navigate('/')
    }
  }, [])

  const query = useQuery({
    queryKey: ['refund'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/admin/refunds`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
        'Refresh-Token': refreshToken
      }
    })
  })

  const mutationRefund = useMutation({
    mutationFn: (refundId) => axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/admin/refunds/${refundId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
        'Refresh-Token': refreshToken
      }
    }),
    onSuccess: () => {
      alert('환급 처리가 완료되었습니다.')
      query.refetch()
    },
    onError: error => {
      alert(error.response.data.message)
    }
  })

  return (
    <Layout>
      <Box component="h1">환급 요청 리스트</Box>
      {
        query.isSuccess && query.data.data.data.map(refund => (
          <ListItem key={refund.refundId}>
            <Card sx={{ fontSize: 15, marginX: 1, width: 200 }}>
              <CardContent>유저아이디 : {refund.userId}</CardContent>
              <CardContent>환급 포인트 : {refund.refundPoint}</CardContent>
              <CardContent>은행 : {refund.refundBank}</CardContent>
              <CardContent>계좌 : {refund.refundAccountNumber}</CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => mutationRefund.mutate(refund.refundId)}>
                  환급 처리
                </Button>
              </CardActions>
            </Card>
          </ListItem>
        ))
      }
    </Layout>
  )
}

export default RefundPage