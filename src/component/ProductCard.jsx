import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function ProductCard ({ product }) {
  const { brand, name, imageUrl, price } = product

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 300, height: 300 }}
    >
      <CardMedia
        component="img"
        alt="gifticon product image"
        sx={{ width: 150, height: 150, margin: 'auto', marginTop: 2 }}
        image={imageUrl}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {brand}
        </Typography>
        <Typography variant="string" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: '#EF6253' }}>구매가: {addCommasAtMoney(price)}</Button>
      </CardActions>
    </Card>
  )
}

function addCommasAtMoney (money) {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'
}

export default ProductCard