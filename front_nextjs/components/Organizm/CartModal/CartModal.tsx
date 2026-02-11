"use client";

import Modal from "@/components/Atoms/Modal/Modal";
import styles from "./CartModal.module.css";
import modalStyles from "../../Atoms/Modal/Modal.module.css";
import cn from "classnames";
import { useState } from "react";
import Button from "@/components/Atoms/Button/Button";
import { useCart } from "@/hooks/useCart"; // <-- добавить

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  type Mode = "delivery" | "restaurant";
  const [mode, setMode] = useState<Mode>("delivery");

  const { items, totalPrice, changeQuantity, removeItem, clearCart } =
    useCart();

  const isEmpty = items.length === 0;
  const positionsCount = items.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modalContainer}
      overlayClassName={cn(
        modalStyles.overlayTopRight,
        styles.cartModalOffsetPadding,
      )}
    >
      <div className={styles.modeToggle}>
        <Button
          title="Доставка"
          variant={mode === "delivery" ? "orange" : "grey"}
          className={styles.modeButton}
          onClick={() => setMode("delivery")}
        />
        <Button
          title="В ресторане"
          variant={mode === "restaurant" ? "orange" : "grey"}
          className={styles.modeButton}
          onClick={() => setMode("restaurant")}
        />
      </div>

      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <div className={styles.headerTitle}>Корзина</div>
          {!isEmpty && (
            <div className={styles.headerCount}>{positionsCount} позиций</div>
          )}
        </div>

        {!isEmpty && (
          <Button
            title="Очистить"
            variant="grey"
            className={styles.clearButton}
            onClick={clearCart}
          />
        )}
      </div>

      <div className={styles.body}>
        {isEmpty ? (
          <div className={styles.empty}>Корзина пуста</div>
        ) : (
          <ul className={styles.itemsList}>
            {items.map(({ product, quantity }) => (
              <li key={product.id} className={styles.itemRow}>
                <div className={styles.itemLeft}>
                  <div className={styles.itemImageWrapper}>
                    {/* если используешь next/image – можешь заменить на <Image /> */}
                    <img
                      src={product.image_url!}
                      alt={product.name}
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <div className={styles.itemTitle}>{product.name}</div>
                    <div className={styles.itemMeta}>
                      <span className={styles.itemUnitPrice}>
                        {Number(product.price)} ₽
                      </span>
                      {product.weight && (
                        <span className={styles.itemWeight}>
                          {product.weight} г
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.itemRight}>
                  <div className={styles.quantityControls}>
                    <Button
                      title="-"
                      variant="grey"
                      className={styles.qtyButton}
                      disable={quantity <= 1}
                      onClick={() => changeQuantity(product.id, quantity - 1)}
                    />
                    <span className={styles.quantityValue}>{quantity}</span>
                    <Button
                      title="+"
                      variant="orange"
                      className={styles.qtyButton}
                      onClick={() => changeQuantity(product.id, quantity + 1)}
                    />
                  </div>

                  {/* <div className={styles.itemTotalPrice}>
                    {Number(product.price) * quantity} ₽
                  </div> */}

                  {/* <Button
                    title="✕"
                    variant="white"
                    className={styles.removeButton}
                    onClick={() => removeItem(product.id)}
                  /> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>Итого: {totalPrice} ₽</div>
        <Button
          title="Оформить заказ"
          variant="orange"
          className={styles.checkoutButton}
          disable={isEmpty}
          onClick={() => {
            // тут потом добавишь оформление заказа
            clearCart();
            onClose();
          }}
        />
      </div>
    </Modal>
  );
}
