import { DEFAULT_Y_AXIS_KEY, LineChart } from '@mui/x-charts'

function TradeLineChart ({ tradeList }) {
  return (
    <LineChart
      series={[
        {
          data: tradeList,
          showMark: false,
          color: '#F48174'
        }
      ]}
      height={300}
      bottomAxis={null}
      leftAxis={null}
      rightAxis={DEFAULT_Y_AXIS_KEY}
    />
  )
}

export default TradeLineChart