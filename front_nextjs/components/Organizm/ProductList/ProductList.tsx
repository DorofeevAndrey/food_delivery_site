"use client";

import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import ProductCard from "@/components/Molecules/ProductCard/ProductCard";
import { getProducts, type ProductDto } from "@/libs/api/product";

export default function ProductList() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить товары");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className={styles.state}>Загружаем товары…</div>;
  }

  if (error) {
    return <div className={styles.state}>{error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(p) => {
            // позже сюда прилетит addToCart(p)
            console.log("add to cart", p);
          }}
        />
      ))}
    </div>
  );
}
