import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import SellHistoryView from './SellHistoryView.jsx'

function SellHistoryList ({ tabIndex, index, sellHistoryList }) {

  return (
    <Box
      hidden={tabIndex !== index}
    >
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell>판매 희망가</TableCell>
            <TableCell align={'right'}>수량</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <SellHistoryView sellHistoryList={sellHistoryList}/>
        </TableBody>
      </Table>
    </Box>
  )
}

export default SellHistoryList
