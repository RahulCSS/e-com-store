import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts} from "../../store/ProductSlice";

const Sellers = () => {
  const dispatch = useDispatch();
  const products = useSelector(state=> state.products.fetchProduct);
  const [groupedProducts, setGroupedProducts] = useState({});
  const items = Object.keys(groupedProducts).map((sellerId) => ({
    key: sellerId,
    label: `Seller ${sellerId}`,
    children: (
      <>
        <h2>Products by Seller {sellerId}</h2>
        {groupedProducts[sellerId].length > 0 ? (
          groupedProducts[sellerId].map((product) => (
            <div key={product._id} style={{ marginBottom: '10px' }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))
        ) : (
          <p>No products for this seller.</p>
        )}
      </>
    ),
  }));
  
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    if (products.length) {
      const groupBySeller = products.reduce((acc, product) => {
        const sellerId = product.sellerId;
        if (!acc[sellerId]) {
          acc[sellerId] = [];
        }
        acc[sellerId].push(product);
        return acc;
      }, {});

      setGroupedProducts(groupBySeller);
    }
  }, [products]);
  return (
    <Tabs defaultActiveKey="0" items={items} onChange={onChange} >
    
    </Tabs>
  )
}

export default Sellers