"use client";

import OrdersModal from "@/components/Organizm/OrdersModal/OrdersModal";
import { usePathname, useRouter } from "next/navigation";

export default function OrdersPageModal() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <OrdersModal
      isOpen={pathname === "/orders"}
      onClose={() => router.push("/")}
    />
  );
}
