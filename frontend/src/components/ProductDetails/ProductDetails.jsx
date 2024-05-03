import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDisplay from '../ProductDisplay/ProductDisplay';

const ProductDetails = () => {
  const { id } = useParams()// Get the product ID from the URL params
  const [product, setProduct] = useState({})

  useEffect(()=>{
    axios.get(`http://localhost:4000/api/food/list/${id}`)
    .then(result=>setProduct(result.data))
    .catch(err=>console.log(err))
 },[])
 if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ProductDisplay product={product}/>
    </div>
  )
}

export default ProductDetails
