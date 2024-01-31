import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import useUserInfoStore from '../store/userInfo.js'
import Layout from '../component/layout/Layout.jsx'
import { useState } from 'react'

export default function LoginPage () {
  const navigate = useNavigate()
  const { login } = useUserInfoStore()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (userinfo) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/login`,
      userinfo,
      {
        'Content-Type': 'application/json',
      }),
    onSuccess: (data) => {
      const { loginId, nickname, likeProductIds } = data.data.data
      login(data.headers['access-token'], data.headers['refresh-token'], nickname, loginId, likeProductIds)
      navigate('/')
    },
    onError: error => {
      alert(error.response.data.message)
    }
  })

  const onClick = (event) => {
    event.preventDefault()
    mutation.mutate({
      loginId: loginId,
      password: password,
    })
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
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={onClick} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="id"
                  name="id"
                  autoComplete="id"
                  value={loginId}
                  onChange={(event) => setLoginId(event.target.value)}
                  error={!(/^[a-zA-Z0-9]{4,20}$/.exec(loginId))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={!(/^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$%^&+=!]{8,30}$/.exec(password))}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, width: 300, height: 44 }}>
                Login
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link
                href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f9caea9346bfa7cf3875aeda822a3f0e&redirect_uri=http://localhost:5173/login/kakao">
                <Box component="img" src="/kakao_login_medium_wide.png"/>
              </Link>
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate('/signup')} variant="body2">
                  {'Sign up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}