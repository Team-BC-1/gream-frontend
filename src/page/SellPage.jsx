import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useUserInfoStore from '../store/userInfo.js'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../component/layout/Layout.jsx'
import Box from '@mui/material/Box'
import { Tab, Tabs } from '@mui/material'
import SellBidBox from '../component/order/SellBidBox.jsx'
import SellNowBox from '../component/order/SellNowBox.jsx'
import Button from '@mui/material/Button'

function SellPage () {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { nickname } = useUserInfoStore()
  const [wantSellPrice, setWantSellPrice] = useState()
  const [tabIndex, setTabIndex] = useState(0)
  const [imageFile, setImageFile] = useState()
  const [imagePreview, setImagePreview] = useState()

  useEffect(() => {
    if (state === null) {
      navigate(`/products/${productId}`)
    }
  }, [])
  useEffect(() => {
    if (nickname === '') {
      alert('로그인 후 접근 가능합니다.')
      navigate('/login')
    }
  }, [])

  const querySellBid = useQuery({
    queryKey: ['sellHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/sell`)
  })
  const queryBuyBid = useQuery({
    queryKey: ['buyHistory'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}/buy`)
  })

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise((resolve) => {
      reader.onload = () => {
        setImagePreview(reader.result)
        resolve()
      }
    })
  }

  return (
    <Layout sx={{ display: 'flex', justifyContent: 'center' }}>
      {
        querySellBid.isSuccess && queryBuyBid.isSuccess && (
          <Box component={'div'} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: 500
          }}
          >
            <Box
              sx={{
                flex: 1,
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 2,
                width: 500
              }}
            >
              <Button
                variant="contained"
                fullWidth={true}
                sx={{ backgroundColor: '#EF6253' }}
              >
                즉시 구매가 : {
                querySellBid.data.data.data[0]?.sellPrice === undefined ? '매물이 없습니다.' : addCommasAtMoney(querySellBid.data.data.data[0].sellPrice)
              }
              </Button>
              <Button
                variant="contained"
                fullWidth={true}
                sx={{ backgroundColor: '#41B979' }}
              >
                즉시 판매가 : {
                queryBuyBid.data.data.data[0]?.buyPrice === undefined ? '매물이 없습니다.' : addCommasAtMoney(queryBuyBid.data.data.data[0].buyPrice)
              }
              </Button>
            </Box>

            <Box component={'img'} src={imagePreview}>

            </Box>
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: 2 }}
            >
              기프티콘 이미지 업로드
              <input
                type="file"
                hidden
                onClick={() => {
                  alert('현재는 테스트 환경이고, 기프티콘 검수 API는 사업자 등록이 필요하여 미구현 상태입니다. 따라서 실제 기프티콘 이미지를 넣지 말아 주세요.')
                }}
                onChange={(event) => {
                  event.preventDefault()
                  setImagePreview(encodeFileToBase64(event.target.files[0]))
                  setImageFile(event.target.files[0])
                }}
              />
            </Button>

            <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
              <Tab label="판매 입찰"/>
              <Tab label="즉시 판매"/>
            </Tabs>

            <SellBidBox
              tabIndex={tabIndex}
              index={0}
              productId={productId}
              wantSellPrice={wantSellPrice}
              imageFile={imageFile}
              onChangeWantSellPrice={(event) => setWantSellPrice(event.target.value)}
            />

            <SellNowBox
              tabIndex={tabIndex}
              index={1}
              isDisabled={queryBuyBid.data.data.data.length === 0}
              productId={productId}
              imageFile={imageFile}
              sellNowPrice={queryBuyBid.data.data.data.length === 0 ? '-' : queryBuyBid.data.data.data[0].buyPrice}
            />
          </Box>
        )
      }
    </Layout>
  )
}

function addCommasAtMoney (money) {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'
}

export default SellPage