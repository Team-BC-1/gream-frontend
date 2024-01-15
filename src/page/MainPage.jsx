import Layout from '../component/layout/Layout.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ProductCard from '../component/ProductCard.jsx'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'

function MainPage () {
  const navigate = useNavigate()

  const query = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products`)
  })

  return (
    <>
      <Layout>
        <Grid container spacing={2}>
          {
            query.isSuccess && query.data.data.data.map((product) =>
              <Grid item xs={2} onClick={() => navigate(`/products/${product.id}`)} key={product.id}>
                <ProductCard product={product}/>
              </Grid>
            )
          }
        </Grid>
      </Layout>
    </>
  )
}

export default MainPage