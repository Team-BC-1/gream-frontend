import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import TradeHistoryView from './TradeHistoryView.jsx'

function TradeHistoryList ({ tabIndex, index, tradeHistoryList }) {

  return (
    <Box
      hidden={tabIndex !== index}
    >
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell>거래가</TableCell>
            <TableCell align={'right'}>거래일자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TradeHistoryView tradeHistoryList={tradeHistoryList}/>
        </TableBody>
      </Table>
    </Box>
  )
}

export default TradeHistoryList
