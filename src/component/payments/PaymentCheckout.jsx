import { nanoid } from 'nanoid'
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'
import Button from '@mui/material/Button'

const selector = '#payment-widget'

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
// @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
const clientKey = import.meta.env.VITE_TOSS_CLIENT_API_KEY
const customerKey = nanoid()

export function PaymentCheckout ({ price }) {
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey)
  // const paymentWidget = usePaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
  const paymentMethodsWidgetRef = useRef(null)
  const { accessToken, refreshToken } = useUserInfoStore()

  // const mutationTossCheck = useMutation({})

  useEffect(() => {
    if (paymentWidget == null) {
      return
    }

    // ------  결제 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: price }, { variantKey: 'DEFAULT' })

    // ------  이용약관 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' })

    paymentMethodsWidgetRef.current = paymentMethodsWidget
  }, [paymentWidget])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current

    if (paymentMethodsWidget == null) {
      return
    }

    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price)
  }, [price])

  return (
    <div className="wrapper" style={{ width: 900 }}>
      <div className="box_section">
        <div id="payment-widget"/>
        <div id="agreement"/>
        <div style={{ paddingLeft: '24px' }}>
          <div className="checkable typography--p">
          </div>
        </div>
        <div className="result wrapper">
          <Button
            variant="contained"
            className="button"
            style={{ marginTop: '30px' }}
            onClick={async () => {
              // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.

              const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payments/toss/request`, {
                orderName: 'CHARGE_POINT',
                amount: price
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Token': accessToken,
                  'Refresh-Token': refreshToken
                }
              })

              console.log('request response : ', response.data)

              const paymentInfo = {
                orderId: response.data.data.paymentOrderId,
                orderName: '포인트 충전',
                customerName: '김토스',
                customerEmail: 'customer123@gmail.com',
                customerMobilePhone: '01012341234',
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
              }

              try {
                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                await paymentWidget?.requestPayment(paymentInfo)
              } catch (error) {
                // 에러 처리하기
                console.error(error)
              }
            }}
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  )
}

function usePaymentWidget (clientKey, customerKey) {
  return useQuery({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: () => {
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      return loadPaymentWidget(clientKey, customerKey)
    },
  })
}