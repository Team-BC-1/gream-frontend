import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import useUserInfoStore from '../../../store/userInfo.js'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const CustomAppBar = () => {
  const navigate = useNavigate()
  const {
    nickname,
    accessToken,
    refreshToken,
    setNickname,
    setLoginId,
    setAccessToken,
    setRefreshToken
  } = useUserInfoStore()
  const mutation = useMutation({
    mutationFn: () => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }),
    onSuccess: () => {
      setNickname('')
      setLoginId('')
      setAccessToken('')
      setRefreshToken('')
    }
  })

  const loginOrProfileHandler = () => navigate(nickname === '' ? '/login' : '/profile')
  const signupOrLogoutHandler = () => {
    if (nickname === '') {
      navigate('/signup')
      return
    }
    
    const isLogout = confirm('로그아웃 하시겠습니까?')
    if (isLogout) {
      mutation.mutate()
      navigate('/')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => navigate('/')}
            variant="h6"
            component="a"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            Gream
          </Typography>
          <Button style={{ textTransform: 'none' }} color="inherit" onClick={loginOrProfileHandler}>
            {nickname === '' ? 'LOGIN' : nickname}
          </Button>
          <Button color="inherit" onClick={signupOrLogoutHandler}>
            {nickname === '' ? 'Sign up' : 'Logout'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default CustomAppBar