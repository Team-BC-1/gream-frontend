import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Grid, Link } from '@mui/material'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (userinfo) => axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/signup`,
      userinfo,
      { 'Content-Type': 'application/json' }
    ),
    onSuccess: () => navigate('/login')
  })

  const onClick = (event) => {
    event.preventDefault()
    console.log('url : ', `${import.meta.env.VITE_SERVER_URL}/api/users/signup`)
    const data = new FormData(event.currentTarget)
    const signupData = {
      loginId: data.get('id'),
      nickname: data.get('nickname'),
      password: data.get('password')
    }
    console.log(signupData)
    mutation.mutate(signupData)
  }

  return (
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="nickname"
            name="nickname"
            autoComplete="nickname"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
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
  )
}

export default SignUpPage