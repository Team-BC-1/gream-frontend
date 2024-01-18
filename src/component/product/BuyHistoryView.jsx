import { TableCell, TableRow } from '@mui/material'

function BuyHistoryView ({ buyHistoryList }) {

  return (
    buyHistoryList.map((trade) => (
      <TableRow key={trade.id}>
        <TableCell>
          {addCommasAtMoney(trade.buyPrice)}
        </TableCell>
        <TableCell align={'right'}>
          {trade.quantity}
        </TableCell>
      </TableRow>
    ))
  )
}

function addCommasAtMoney (money) {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'
}

export default BuyHistoryView