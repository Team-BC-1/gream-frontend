import { Container } from '@mui/material'
import Header from './header/Header.jsx'
import GifticonImageModal from '../profile/GifticonImageModal.jsx'
import modalStore from '../../store/modalStore.js'

const Layout = ({ children }) => {
  const {
    gifticonImageModalState: {
      isOpen, imageUrl
    },
    setGifticonImageModalState
  } = modalStore()

  return (
    <>
      <Header/>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <GifticonImageModal
          open={isOpen}
          imageUrl={imageUrl}
          setOpen={() => setGifticonImageModalState({
            isOpen: false,
            imageUrl: ''
          })}
        />
        <main>
          {children}
        </main>
      </Container>
    </>
  )
}

export default Layout