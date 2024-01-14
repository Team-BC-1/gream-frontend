import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function ProductCard ({ product }) {
  const { brand, productName, imageUrl, description, price } = product

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 300 }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {productName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{price}</Button>
        <Button size="small">{description}</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard