import Layout from '../component/layout/Layout.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import ProductView from '../component/main/ProductView.jsx'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'

function MainPage () {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')
  console.log('searchParams', searchParams.get('name'))

  const query = useQuery({
    queryKey: ['products', name],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products${name ? `?name=${name}` : ''}`)
  })

  useEffect(() => {
    if (name === null) {
      setSearchValue('')
    }
  }, [])

  const submitHandler = (event) => {
    event.preventDefault()
    navigate(`/?name=${searchValue}`)
  }

  return (
    <>
      <Layout>
        <Box component="form" onSubmit={submitHandler}>
          <Autocomplete
            freeSolo
            options={[]}
            sx={{ width: 300, marginLeft: 'auto', marginBottom: 10 }}
            renderInput={(params) =>
              <TextField
                {...params}
                label="상품검색"/>}
            onChange={(event, value) => setSearchValue(value)}
          />
        </Box>
        <Grid container spacing={2}>
          {
            query.isSuccess && <ProductView products={query.data.data.data}/>
          }
        </Grid>
      </Layout>
    </>
  )
}

export default MainPage