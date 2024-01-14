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
import { jwtDecode } from 'jwt-decode'
import Layout from '../component/layout/Layout.jsx'

export default function LoginPage () {
  const navigate = useNavigate()
  const { setAccessToken, setRefreshToken, setNickname } = useUserInfoStore()

  const mutation = useMutation({
    mutationFn: (userinfo) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/login`,
      userinfo,
      {
        'Content-Type': 'application/json',
      }),
    onSuccess: (data) => {
      console.log(data.headers)
      const accessToken = data.headers['access-token']
      const refreshToken = data.headers['refresh-token']
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      const jwt = jwtDecode(accessToken)
      setNickname(jwt.sub)
      navigate('/')
    }
  })

  const onClick = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    mutation.mutate({
      loginId: data.get('id'),
      password: data.get('password'),
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
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
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