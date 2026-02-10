"use client";

import React from "react";
import styles from "./ProductCard.module.css";
import Button from "@/components/Atoms/Button/Button";
import type { ProductDto } from "@/libs/api/product";

type ProductCardProps = {
  product: ProductDto;
  onAddToCart?: (product: ProductDto) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const { name, description, price, weight, image_url } = product;

  const handleAdd = () => {
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className={styles.card}>
      {image_url && (
        <div className={styles.imageWrapper}>
          {/* можешь заменить на next/image */}
          <img src={image_url} alt={name} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.weight}>{weight} г</span>
        </div>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.footerRow}>
          <span className={styles.price}>{price} ₽</span>
          <Button
            title="В корзину"
            variant="grey"
            onClick={handleAdd}
            className={styles.addButton}
          />
        </div>
      </div>
    </div>
  );
}
