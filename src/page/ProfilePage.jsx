import Layout from '../component/layout/Layout.jsx'
import { useNavigate } from 'react-router-dom'
import useUserInfoStore from '../store/userInfo.js'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Divider } from '@mui/material'

function ProfilePage () {

  const navigate = useNavigate()
  const { loginId, nickname, accessToken, refreshToken } = useUserInfoStore()

  useEffect(() => {
    if (loginId === '') {
      alert('로그인 후 접근 가능합니다.')
      navigate('/login')
    }
  }, [loginId])

  return (
    <Layout>
      <Box component={'h1'}>마이 페이지</Box>
      <Card>
        <CardContent>
          {
            nickname
          }
        </CardContent>
      </Card>
      <Divider/>

    </Layout>
  )
}

export default ProfilePage
