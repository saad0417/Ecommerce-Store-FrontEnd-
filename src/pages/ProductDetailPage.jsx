import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ProductDetails  } from "../components/index";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../store/loaderSlice";


function ProductsPage() {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  // useParams get current browser URL.
  const { id } = useParams();  // Get the product ID from the URL parameters
    
  // Api fetching does't happpen in the componet so we are doing it here.
  useEffect(() => {
    dispatch(showLoader());
    axios.get(`https://dummyjson.com/products/${id}`)
        .then((res) => {
        setProduct(res.data); 
        console.log(res.data);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

  return (
    <div>
      <Container>
        {product && <ProductDetails product={product} />}
      </Container>
    </div>
  );
}

export default ProductsPage;