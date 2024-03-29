import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { FormHelperText, Grid, Link } from '@mui/material'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Layout from '../component/layout/Layout.jsx'
import { useState } from 'react'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [loginId, setLoginId] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (userinfo) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/signup`,
      userinfo,
      { 'Content-Type': 'application/json' }
    ),
    onSuccess: () => navigate('/login'),
    onError: error => {
      alert(error.response.data.message)
    }
  })

  const onClick = (event) => {
    event.preventDefault()
    const signupData = {
      loginId: loginId,
      nickname: nickname,
      password: password
    }
    mutation.mutate(signupData)
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={onClick} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="id"
              name="id"
              autoComplete="id"
              autoFocus
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
              error={!(/^[a-zA-Z0-9]{4,20}$/.exec(loginId))}
            />
            <FormHelperText id="component-helper-text">
              아이디는 영문자 및 숫자 4-20자만 가능합니다.
            </FormHelperText>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="nickname"
              name="nickname"
              autoComplete="nickname"
              autoFocus
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              error={!(/^[a-zA-Z0-9가-힣]{2,20}$/.exec(nickname))}
            />
            <FormHelperText id="component-helper-text">
              닉네임은 한글, 영문자 및 숫자 2-20자만 가능합니다.
            </FormHelperText>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={!(/^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$%^&+=!]{8,30}$/.exec(password))}
            />
            <FormHelperText id="component-helper-text">
              비밀번호는 영소문자 및 숫자가 필수로 8-30자만 가능하고, 특수기호는 @#$%^&+= 만 포함합니다.
            </FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate('/login')} variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default SignUpPage