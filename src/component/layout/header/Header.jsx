import CustomAppBar from './CustomAppBar.jsx'
import Box from '@mui/material/Box'

function Header () {
  return (
    <Box component={'header'} sx={{ marginBottom: 5 }}>
      <CustomAppBar/>
    </Box>
  )
}

export default Header