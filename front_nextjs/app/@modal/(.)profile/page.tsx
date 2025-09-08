"use client";
import LoginModal from "@/components/LoginModal/LoginModal";
import { Token } from "@/lib/api/profile";
import { useRouter } from "next/navigation";

export default function ProfileModal() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2>Профиль (модалка)</h2>
        <p>Это модалка поверх главной страницы.</p>
        <LoginModal
          isOpen={true}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
          getProfile={function (token: Token): void {
            throw new Error("Function not implemented.");
          }}
        />
        <button onClick={() => router.back()} className="mt-4 btn-red">
          Закрыть
        </button>
      </div>
    </div>
  );
}
