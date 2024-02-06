import { useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import useUserInfoStore from '../store/userInfo.js'
import Layout from '../component/layout/Layout.jsx'
import Box from '@mui/material/Box'

export function PaymentProcessPage () {
  const [searchParams] = useSearchParams()
  const paymentType = searchParams.get('paymentType')
  const orderId = searchParams.get('orderId')
  const paymentKey = searchParams.get('paymentKey')
  const amount = searchParams.get('amount')
  const { accessToken, refreshToken } = useUserInfoStore()

  const mutationTossPayments = useMutation({
    mutationFn: () => axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/payments/toss/success`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        },
        params: {
          paymentType,
          orderId,
          paymentKey,
          amount
        }
      }
    ),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: error => {
      console.log(error)
    }
  })

  const queryUserPont = useQuery({
    queryKey: ['userPoint'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/points`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }
    )
  })

  useEffect(() => {
    async function fetchUserPoint () {
      await mutationTossPayments.mutate()
      await queryUserPont.refetch()
    }

    fetchUserPoint()
  }, [])

  return (
    <Layout>
      <Box component="h1">
        {
          mutationTossPayments.isPending && '결제 중입니다.'
        }
        {
          mutationTossPayments.isSuccess && '결제가 완료되었습니다.'
        }
        {
          mutationTossPayments.isError && '결제에 실패했습니다.'
        }
      </Box>
      <Box>
        {
          mutationTossPayments.isSuccess && queryUserPont.isSuccess && (
            <>
              <Box>
                충전 포인트 : {mutationTossPayments.data.data.data.totalAmount}
              </Box>
              <Box>
                포인트 : {queryUserPont.data.data.data.point}
              </Box>
            </>
          )
        }
      </Box>
    </Layout>
  )
}
