import React, { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import ProductCard from "./ProductCard";

const limit = 10;
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`
      );
      const data = await res.json();
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProd) => [...prevProd, ...data.products]);
        setPage((oldPage) => oldPage + 1);
      }
    };

    const observer = new IntersectionObserver((items) => {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    });

    if (observer && loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);
  return (
    <div className="flex justify-center items-center">
      <div className="mt-14">
        {/* <h1 className="text-2xl ">Products List</h1> */}

        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
        <div ref={loaderRef}>
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
