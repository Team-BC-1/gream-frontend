import Layout from '../component/layout/Layout.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ProductCard from '../component/ProductCard.jsx'
import { List, ListItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function MainPage () {
  const navigate = useNavigate()

  const query = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products`)
  })

  return (
    <>
      <Layout>
        <List sx={{ display: 'flex', flexDirection: 'row' }}>
          {
            query.isSuccess && query.data.data.data.map((product) =>
              <ListItem onClick={() => navigate(`/products/${product.id}`)} key={product.id}>
                <ProductCard product={product}/>
              </ListItem>
            )
          }
        </List>
      </Layout>
    </>
  )
}

export default MainPage