import Box from '@mui/material/Box'
import { Modal } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
}

function GifticonImageModal ({ open, setOpen, imageUrl }) {

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component={'img'}
        src={imageUrl}
      />
    </Modal>
  )
}

export default GifticonImageModal