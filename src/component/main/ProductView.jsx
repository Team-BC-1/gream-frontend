import Grid from '@mui/material/Grid'
import ProductCard from '../ProductCard.jsx'
import { useNavigate } from 'react-router-dom'

function ProductView ({ products }) {

  const navigate = useNavigate()

  return (
    <>
      {
        products.map((product) => (
          <Grid item md={2} xs={6} onClick={() => navigate(`/products/${product.id}`)} key={product.id}>
            <ProductCard product={product}/>
          </Grid>
        ))
      }
    </>
  )
}

export default ProductView