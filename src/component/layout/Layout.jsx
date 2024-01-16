import { Container } from '@mui/material'
import Header from './header/Header.jsx'

const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <main>
          {children}
        </main>
      </Container>
    </>
  )
}

export default Layout