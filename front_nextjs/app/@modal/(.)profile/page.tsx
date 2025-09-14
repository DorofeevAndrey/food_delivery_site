"use client";
import ProfileModal from "@/components/ProfileModal/ProfileModal";
import { useUser } from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";

export default function ProfilePageModal() {
  const { user, setUser } = useUser();

  const pathname = usePathname();

  const router = useRouter();
  return (
    <>
      {user && (
        <ProfileModal
          isOpen={pathname === "/profile"}
          onClose={() => {
            router.push("/");
          }}
        />
      )}
    </>
  );
}
