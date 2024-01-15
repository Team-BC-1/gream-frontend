import { Container } from '@mui/material'
import Header from './header/Header.jsx'

const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}

export default Layout