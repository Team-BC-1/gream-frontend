import Layout from '../component/layout/Layout.jsx'
import Box from '@mui/material/Box'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUserInfoStore from '../store/userInfo.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'

function KakaoLoginPage () {

  const [searchParams] = useSearchParams()
  const { login } = useUserInfoStore()
  const navigate = useNavigate()
  const code = searchParams.get('code')

  const kakaoLoginMutation = useMutation({
    mutationFn: () => axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/users/oauth/kakao?code=${code}`
    ),
    onSuccess: (data) => {
      const { loginId, nickname, likeProductIds } = data.data.data
      login(data.headers['access-token'], data.headers['refresh-token'], nickname, loginId, likeProductIds)
      navigate('/')
    },
    onError: error => {
      alert(error.response.data.message)
    }
  })

  useEffect(() => {
    kakaoLoginMutation.mutate()
  }, [])

  return (
    <Layout>
      <Box>
        로그인 중...
      </Box>
    </Layout>
  )
}

export default KakaoLoginPage