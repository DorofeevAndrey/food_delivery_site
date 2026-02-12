import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import {
  getAdminOrders,
  updateOrderStatus,
  adminOrderStatuses,
  type AdminOrderStatus,
} from "@/libs/api/adminOrders";
import type { OrderOut } from "@/libs/api/order";
import type { ProductDto } from "@/libs/api/product";
import {
  getAllProductsAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
} from "@/libs/api/adminProducts";

import Button from "@/components/Atoms/Button/Button";
import Input from "@/components/Atoms/Input/Input";
import Checkbox from "@/components/Atoms/Checkbox/Checkbox";
import Dropdown from "@/components/Atoms/DropDown/DropDown";
import styles from "./AdminPanel.module.css";

type AdminView = "orders" | "products";

export default function AdminPanel() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [view, setView] = useState<AdminView>("orders");

  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<AdminOrderStatus | "all">(
    "all",
  );

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productIsActive, setProductIsActive] = useState(true);

  useEffect(() => {
    if (isUserLoading) return;

    if (!user || !user.is_admin) {
      router.push("/");
      return;
    }

    if (view !== "orders") return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getAdminOrders(
          statusFilter === "all" ? undefined : statusFilter,
        );
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isUserLoading, router, statusFilter, view]);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user || !user.is_admin) return;
    if (view !== "products") return;

    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const data = await getAllProductsAdmin();
        setProducts(data);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [user, isUserLoading, view]);

  const resetProductForm = () => {
    setEditingProductId(null);
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductWeight("");
    setProductIsActive(true);
  };

  const startEditProduct = (p: ProductDto) => {
    setEditingProductId(p.id);
    setProductName(p.name);
    setProductDescription(p.description || "");
    setProductPrice(p.price);
    setProductWeight(p.weight);
    setProductIsActive(p.is_active);
  };

  const handleSubmitProduct = async () => {
    if (!productName || !productPrice || !productWeight) {
      return;
    }

    const payload = {
      name: productName,
      description: productDescription || null,
      price: productPrice,
      weight: productWeight,
      is_active: productIsActive,
    };

    if (editingProductId === null) {
      const created = await createProductAdmin(payload);
      setProducts((prev) => [created, ...prev]);
    } else {
      const updated = await updateProductAdmin(editingProductId, payload);
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
    }

    resetProductForm();
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProductAdmin(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingProductId === id) {
      resetProductForm();
    }
  };

  if (isUserLoading) {
    return <div className={styles.center}>Загружаем…</div>;
  }

  if (!user || !user.is_admin) {
    return null;
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {view === "orders" ? "Админка: заказы" : "Админка: товары"}
        </h1>

        <div className={styles.headerRight}>
          <div className={styles.tabs}>
            <Button
              variant="white"
              className={`${styles.tabButton} ${
                view === "orders" ? styles.tabButtonActive : ""
              }`}
              onClick={() => setView("orders")}
              title="Заказы"
            />
            <Button
              variant="white"
              className={`${styles.tabButton} ${
                view === "products" ? styles.tabButtonActive : ""
              }`}
              onClick={() => setView("products")}
              title="Товары"
            />
          </div>

          {view === "orders" && (
            <div className={styles.filters}>
              <span className={styles.filtersLabel}>Статус:</span>

              <Button
                variant="white"
                className={`${styles.filterButton} ${
                  statusFilter === "all" ? styles.filterButtonActive : ""
                }`}
                onClick={() => setStatusFilter("all")}
                title="Все"
              />

              {adminOrderStatuses.map((status) => (
                <Button
                  key={status}
                  variant="white"
                  className={`${styles.filterButton} ${
                    statusFilter === status ? styles.filterButtonActive : ""
                  }`}
                  onClick={() => setStatusFilter(status)}
                  title={status}
                />
              ))}
            </div>
          )}
        </div>
      </header>

      {view === "orders" && (
        <>
          {loading && <div className={styles.center}>Загружаем заказы…</div>}

          {!loading && orders.length === 0 && (
            <div className={styles.center}>Заказов с таким статусом нет</div>
          )}

          <section className={styles.list}>
            {orders.map((o) => (
              <article key={o.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <div className={styles.cardTitle}>
                      Заказ #{o.id} — {o.status}
                    </div>
                    <div className={styles.cardMeta}>
                      {o.total_price} ₽ ·{" "}
                      {o.mode === "delivery" ? "Доставка" : "Ресторан"}
                    </div>
                  </div>

                  <div className={styles.statusControl}>
                    <label className={styles.statusLabel}>
                      Изменить статус
                    </label>
                    <Dropdown
                      placeholder="Статус"
                      value={o.status}
                      options={adminOrderStatuses.map((status) => ({
                        value: status,
                        label: status,
                      }))}
                      onChange={async (newStatus) => {
                        const updated = await updateOrderStatus(
                          o.id,
                          newStatus as AdminOrderStatus,
                        );
                        setOrders((prev) =>
                          prev.map((x) => (x.id === o.id ? updated : x)),
                        );
                      }}
                    />
                  </div>
                </div>

                <ul className={styles.items}>
                  {o.items.map((item) => (
                    <li key={item.id} className={styles.itemRow}>
                      <span className={styles.itemName}>
                        {item.product_name}
                      </span>
                      <span className={styles.itemQty}>×{item.quantity}</span>
                      <span className={styles.itemPrice}>
                        {item.product_price} ₽
                      </span>
                    </li>
                  ))}
                </ul>

                {o.address && (
                  <div className={styles.address}>Адрес: {o.address}</div>
                )}
                {o.comment && (
                  <div className={styles.comment}>
                    Комментарий: {o.comment}
                  </div>
                )}
              </article>
            ))}
          </section>
        </>
      )}

      {view === "products" && (
        <>
          <section className={styles.productForm}>
            <h2 className={styles.productFormTitle}>
              {editingProductId === null
                ? "Добавить товар"
                : "Редактировать товар"}
            </h2>

            <div className={styles.productFormRow}>
              <Input
                id="product-name"
                placeholder="Название"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
              />
              <Input
                id="product-price"
                placeholder="Цена, ₽"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                type="text"
              />
              <Input
                id="product-weight"
                placeholder="Вес, г"
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
                type="text"
              />
            </div>

            <div className={styles.productFormRow}>
              <Input
                id="product-description"
                placeholder="Описание"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                type="text"
              />
            </div>

            <div className={styles.productActiveRow}>
              <span className={styles.statusLabel}>Активен</span>
              <Checkbox
                checked={productIsActive}
                onChange={(checked) => setProductIsActive(checked)}
              />
            </div>

            <div className={styles.productFormActions}>
              <Button
                title={editingProductId === null ? "Создать" : "Сохранить"}
                onClick={handleSubmitProduct}
                variant="orange"
                disable={!productName || !productPrice || !productWeight}
              />
              {editingProductId !== null && (
                <Button
                  title="Отмена"
                  onClick={resetProductForm}
                  variant="white"
                />
              )}
            </div>
          </section>

          {productsLoading && (
            <div className={styles.center}>Загружаем товары…</div>
          )}

          {!productsLoading && products.length === 0 && (
            <div className={styles.center}>Товаров пока нет</div>
          )}

          <section className={styles.list}>
            {products.map((p) => (
              <article key={p.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <div className={styles.cardTitle}>{p.name}</div>
                    <div className={styles.cardMeta}>
                      {p.price} ₽ · {p.weight} г
                    </div>
                  </div>

                  <div className={styles.productActions}>
                    <div className={styles.productActiveRow}>
                      <span className={styles.statusLabel}>Активен</span>
                      <Checkbox
                        checked={p.is_active}
                        onChange={async (checked) => {
                          const updated = await updateProductAdmin(p.id, {
                            is_active: checked,
                          });
                          setProducts((prev) =>
                            prev.map((x) =>
                              x.id === p.id ? updated : x,
                            ),
                          );
                        }}
                      />
                    </div>
                    <Button
                      variant="white"
                      title="Редактировать"
                      onClick={() => startEditProduct(p)}
                    />
                    <Button
                      variant="white"
                      title="Удалить"
                      onClick={() => handleDeleteProduct(p.id)}
                    />
                  </div>
                </div>

                {p.description && (
                  <p className={styles.productDescription}>{p.description}</p>
                )}
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

