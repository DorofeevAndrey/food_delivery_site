"use client";

import Modal from "@/components/Atoms/Modal/Modal";
import styles from "./CartModal.module.css";
import modalStyles from "../../Atoms/Modal/Modal.module.css";
import cn from "classnames";
import { useState } from "react";
import Button from "@/components/Atoms/Button/Button";
import { useCart } from "@/hooks/useCart";

import { createOrder, type OrderMode } from "@/libs/api/order";
import Input from "@/components/Atoms/Input/Input";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  type Mode = OrderMode;
  const [mode, setMode] = useState<Mode>("delivery");

  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const { items, totalPrice, changeQuantity, removeItem, clearCart } =
    useCart();

  const isEmpty = items.length === 0;
  const positionsCount = items.length;

  const handleCheckout = async () => {
    if (isEmpty) return;

    if (mode === "delivery" && !address.trim()) {
      alert("Укажите адрес доставки");
      return;
    }

    try {
      const payload = {
        mode,
        items: items.map(({ product, quantity }) => ({
          product_id: product.id,
          quantity,
        })),
        address: mode === "delivery" ? address.trim() : null,
        comment: comment.trim() || null,
      };

      const order = await createOrder(payload);
      // здесь можешь показать уведомление/redirect на историю заказов
      clearCart();
      onClose();
      console.log("Создан заказ", order);
    } catch (e) {
      console.error(e);
      alert("Не удалось оформить заказ");
    }
  };

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
      {mode === "delivery" && (
        <div className={styles.addressBlock}>
          <Input
            className={styles.addressInput}
            placeholder="Адрес доставки"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Input>
        </div>
      )}

      {mode === "restaurant" && (
        <div className={styles.addressBlock}>
          <Input
            className={styles.addressInput}
            placeholder="Выберите адрес ресторана"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Input>
        </div>
      )}

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

      <div className={styles.commentBlock}>
        <Input
          className={styles.commentInput}
          placeholder="Комментарий к заказу"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Input>
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>Итого: {totalPrice} ₽</div>
        <Button
          title="Оформить заказ"
          variant="orange"
          className={styles.checkoutButton}
          disable={isEmpty}
          onClick={handleCheckout}
        />
      </div>
    </Modal>
  );
}
