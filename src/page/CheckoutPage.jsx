import { PaymentCheckout } from '../component/payments/PaymentCheckout.jsx'
import { useSearchParams } from 'react-router-dom'

export function CheckoutPage () {
  const [searchParams] = useSearchParams()
  const point = searchParams.get('point')

  return (
    <PaymentCheckout
      price={point}
    />
  )
}