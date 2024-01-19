import Box from '@mui/material/Box'
import { Card, CardContent, List, ListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUserInfoStore from '../../store/userInfo.js'

function ProductLikeList () {
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
      <List sx={{
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
                    <CardContent>brand : {product.brand}</CardContent>
                    <CardContent>name : {product.name}</CardContent>
                    <CardContent>description : {product.description}</CardContent>
                    <CardContent>price : {product.price}</CardContent>
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