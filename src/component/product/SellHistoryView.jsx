import { TableCell, TableRow } from '@mui/material'

function SellHistoryView ({ sellHistoryList }) {

  return (
    sellHistoryList.map((trade) => (
      <TableRow key={trade.id}>
        <TableCell>
          {addCommasAtMoney(trade.sellPrice)}
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

export default SellHistoryView