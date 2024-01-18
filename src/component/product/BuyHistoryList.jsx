import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import BuyHistoryView from './BuyHistoryView.jsx'

function BuyHistoryList ({ tabIndex, index, buyHistoryList }) {

  if (buyHistoryList) {
    console.log('buyHistoryList', buyHistoryList)
  }

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
          <BuyHistoryView buyHistoryList={buyHistoryList}/>
        </TableBody>
      </Table>
    </Box>
  )
}

export default BuyHistoryList
