import { TableCell, TableRow } from '@mui/material'
import dayjs from 'dayjs'

function TradeHistoryView ({ tradeHistoryList }) {

  return (
    tradeHistoryList.map((trade) => (
      <TableRow key={trade.id}>
        <TableCell>
          {addCommasAtMoney(trade.finalPrice)}
        </TableCell>
        <TableCell align={'right'}>
          {dayjs(trade.tradeDate).format('YYYY/MM/DD')}
        </TableCell>
      </TableRow>
    ))
  )
}

function addCommasAtMoney (money) {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'
}

export default TradeHistoryView