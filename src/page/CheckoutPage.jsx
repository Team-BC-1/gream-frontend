import { PaymentCheckout } from '../component/payments/PaymentCheckout.jsx'
import { useSearchParams } from 'react-router-dom'
import Layout from '../component/layout/Layout.jsx'

export function CheckoutPage () {
  const [searchParams] = useSearchParams()
  const point = searchParams.get('point')

  return (
    <Layout>
      <PaymentCheckout
        price={point}
      />
    </Layout>
  )
}