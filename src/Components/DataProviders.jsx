import React from 'react'
import ProductState from '../Context/Products/ProductState'

const DataProviders = (props) => {
  return (
    <ProductState>
      {props.children}
    </ProductState>
  )
}

export default DataProviders