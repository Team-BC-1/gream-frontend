import Box from '@mui/material/Box'
import { Card, CardActions, CardContent, List, ListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

function ProductLikeList () {
  const navigate = useNavigate()
  const { accessToken, refreshToken } = useUserInfoStore()

  const queryProductLikes = useQuery({
    queryKey: ['productLikes'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/likes`,
      {
        headers: {
          'Access-Token': accessToken,
          'Refresh-Token': refreshToken
        }
      }
    )
  })

  return (
    <>
      <Box component={'h2'}>관심 상품</Box>
      <List
        key={queryProductLikes.data?.data?.data?.length}
        sx={{
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'scroll',
        }}>
        {
          queryProductLikes.isSuccess && (
            queryProductLikes.data.data.data.map(product =>
              (
                <ListItem key={product.id}>
                  <Card sx={{ fontSize: 15, marginX: 1, width: 200 }}>
                    <CardContent>productBrand : {product.productBrand}</CardContent>
                    <CardContent>productName : {product.productName}</CardContent>
                    <CardContent>productDescription : {product.productDescription}</CardContent>
                    <CardContent>productPrice : {product.productPrice}</CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/products/${product.productId}`)}>
                        관심상품 보러가기
                      </Button>
                    </CardActions>
                  </Card>
                </ListItem>
              )
            )
          )
        }
      </List>
    </>
  )
}

export default ProductLikeList